# 🎬 Movie Explorer

A fully responsive and theme-aware Movie Search application built with **React**, **Vite**, and **TypeScript**. It leverages the **OMDb API** to fetch movie data and offers features like:

- Search with debounce
- Flip cards to reveal short details
- "Read More" modal for full details
- Light and Dark mode
- Infinite scroll
- Skeleton loading
- Strong architecture with DI (Inversify)
- Unit testing with Jest & React Testing Library

---

## 🧪 Tech Stack

- ⚛️ **React 18**
- ⚡ **Vite**
- 🟨 **TypeScript**
- 🧩 **Redux Toolkit**
- 🔁 **React Router v6**
- 🧪 **Jest**, **React Testing Library**
- 🔧 **ESLint + Prettier**
- 🧠 **Inversify** for dependency injection
- 📦 **Axios** for API calls
- 🎨 **Custom CSS** for responsive and theme-aware UI

---

## 🚀 Getting Started


### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Create `.env` file

```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_BASE_URL=https://www.omdbapi.com/
```

> 🔒 Make sure to never commit your `.env` file.

### 3. Run the development server

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── assets/                # Static files and images
├── components/            # Reusable UI components
├── features/              # Redux feature slices
├── hooks/                 # Custom hooks
├── services/              # Axios API services (with Inversify)
├── store/                 # Redux store setup
├── styles/                # CSS including theme variables
├── tests/                 # Unit test files
├── App.tsx
├── main.tsx
```

---

## 🧪 Testing

Run all unit tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

View coverage:

```bash
npm run test:coverage
```

---

## 🧹 Linting and Formatting

Check and fix lint issues:

```bash
npm run lint
```

Code formatting handled by **Prettier** integrated into ESLint.

---

## 🌓 Theming

Supports **light** and **dark** themes using CSS variables:

```css
/* theme.css */
:root {
  --bg-color: #f5f5f5;
  --text-color: #333;
  /* ... */
}
[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #fff;
  /* ... */
}
```

You can toggle theme via a context/provider or manually by changing the `data-theme` attribute on `body`.

---

## 📦 Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🧠 Architecture

- **API Layer**: Modular and strongly typed using `axios` and `Inversify`.
- **Redux**: Toolkit-powered state management for movie search and details.
- **Components**: Clean, reusable, and responsive, designed with accessibility in mind.

---

## 📝 License

This project is licensed under the MIT License.

---

## 💬 Acknowledgements

- [OMDb API](https://www.omdbapi.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)