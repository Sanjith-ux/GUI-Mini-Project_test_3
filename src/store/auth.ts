import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { AuthUser, DummyJsonLoginResponse } from "@/types/auth";

const STORAGE_KEY = "nova-auth";
const API_URL = "https://dummyjson.com/auth/login";

type StoredAuth = {
  token: string;
  user: AuthUser;
};

const loadFromStorage = (): StoredAuth | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
};

export const useAuthStore = defineStore("auth", () => {
  const stored = loadFromStorage();
  const token = ref<string | null>(stored?.token ?? null);
  const user = ref<AuthUser | null>(stored?.user ?? null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => Boolean(token.value));

  const login = async (username: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let message = `Login failed (${response.status})`;
        try {
          const data = (await response.json()) as { message?: string };
          if (data?.message) message = data.message;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      const data: DummyJsonLoginResponse = await response.json();
      const { token: jwtToken, refreshToken: _refreshToken, ...rest } = data;
      const authUser: AuthUser = rest;

      token.value = jwtToken;
      user.value = authUser;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ token: jwtToken, user: authUser } satisfies StoredAuth)
      );
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      token.value = null;
      user.value = null;
      localStorage.removeItem(STORAGE_KEY);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    error.value = null;
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  };
});

