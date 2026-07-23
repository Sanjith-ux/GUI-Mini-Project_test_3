# ShopOnline.lk

A responsive single-page storefront built with Vue 3, TypeScript, Vite, Pinia, and Tailwind CSS. It uses the [DummyJSON](https://dummyjson.com/) API for its product catalogue and demo authentication.

## Features

- Browse 50 products from the DummyJSON catalogue
- Search products by name and filter them by category
- View individual product details
- Add, decrease, remove, and clear cart items
- Persist the cart, login session, and theme preference in `localStorage`
- Switch between light and dark themes
- Log in with valid DummyJSON demo credentials
- Responsive layout for mobile and desktop screens

## Tech stack

- Vue 3 with the Composition API
- TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS

## Getting started

### Prerequisites

Install a current LTS version of [Node.js](https://nodejs.org/), which includes npm.

### Install and run

```bash
npm install
npm run dev
```

Vite will display the local development URL in your terminal (typically `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create an optimized production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Demo login

The login screen sends credentials to DummyJSON's authentication endpoint. Use any valid account from its documentation; for example:

```text
Username: emilys
Password: emilyspass
```

Authentication is for demonstration only. No checkout or payment integration is implemented.

## Data and storage

- Product data: `https://dummyjson.com/products?limit=50`
- Login endpoint: `https://dummyjson.com/auth/login`
- Browser storage keys:
  - `nova-cart` for cart items
  - `nova-auth` for the demo login session
  - `nova-theme` for the selected color theme

An internet connection is required for products and login to load.

## Project structure

```text
src/
├── components/  # Navigation, search, filters, product cards, and lists
├── router/      # Application routes
├── store/       # Pinia stores for products, cart, and authentication
├── types/       # TypeScript data types
├── views/       # Home, product detail, cart, and login pages
├── App.vue      # Application shell
└── main.ts      # Application entry point
```

## License

This project is intended for educational use.
