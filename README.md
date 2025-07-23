# Welcome to your Lovable project

## TempoRun - Full-Stack E-commerce Platform

A modern running shoe e-commerce platform built with React, TypeScript, Tailwind CSS, and Supabase.

### Features

- **Dynamic Product Catalog**: Full product management with Supabase backend
- **Brand & Category Management**: Hierarchical organization of products
- **Inventory Tracking**: Real-time stock management
- **Search & Filtering**: Advanced product discovery
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: React Query for efficient data fetching
- **SEO Friendly**: Meta tags and structured data

### Database Schema

The application uses a comprehensive e-commerce schema with:
- Products with variants (sizes, colors)
- Brand and category hierarchies
- Inventory management
- Collections and tagging system
- Image management

### Getting Started

1. **Set up Supabase**: Click "Connect to Supabase" in the top right
2. **Run migrations**: The database schema will be automatically applied
3. **Seed data**: Sample products and brands will be populated
4. **Start developing**: The app will automatically connect to your Supabase instance

### API Structure

- `src/lib/api/products.ts` - Product management and queries
- `src/lib/api/brands.ts` - Brand operations
- `src/lib/api/categories.ts` - Category management
- `src/lib/api/collections.ts` - Collection handling
- `src/lib/api/admin.ts` - Admin operations (protected)

### Hooks

- `useProducts()` - Fetch products with filtering and pagination
- `useBrands()` - Brand data management
- `useCategories()` - Category operations
- React Query for caching and performance

## Project info

**URL**: https://lovable.dev/projects/bcd17cc2-c9aa-4316-8d88-0a132b77ccd2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bcd17cc2-c9aa-4316-8d88-0a132b77ccd2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bcd17cc2-c9aa-4316-8d88-0a132b77ccd2) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
