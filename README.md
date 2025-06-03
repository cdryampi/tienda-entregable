# Flowers & Saints Shop

This project is a small clothing store built with **Vue 3**, using **Vite** and **TailwindCSS**. It started as a Vanilla JS prototype (`sample/` folder) and was migrated to Vue components and composables.

## Features

- Product catalogue loaded from `/public/products.json`
- Multi currency selector with data from `/src/data/currency.json`
- Detailed product view with image gallery, sizes, stock indicator and Afterpay helper
- Customer comments stored in **Supabase** (see `.env` for credentials)
- Top bar and navigation components with icons and social links
- Hero banner with background video and animated text

## Project structure

```
src/
├── assets/        # static images and icons
├── components/    # Vue components (navbar, product views, etc.)
├── composables/   # reusable logic such as `useProducts`, `useCurrency`, `useComments`
├── data/          # JSON data and configuration used by the app
├── lib/           # external libraries (Supabase client)
└── style.css      # global Tailwind styles
```

More details can be found in [docs/architecture.md](docs/architecture.md).

## Local development

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env` file with your Supabase credentials (already included in this repo):

   ```env
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_KEY=<your-supabase-key>
   ```

3. Start the dev server

   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` by default.

## Production build

Generate static assets with:

```bash
npm run build
```

You can also build and run the production container using Docker:

```bash
docker-compose up --build
```

This uses the same environment variables defined in `.env`.

## Sample data

The original Vanilla JS version is kept in the `sample/` folder for reference. Product images, videos and JSON data live under `public/`.

## License

This repository is provided for educational purposes.
