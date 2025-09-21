# Product Inventory Dashboard

A React application for managing product inventory with filtering, and CRUD operations.

## Features

- 📊 **Inventory Statistics** - Stats including total products, stock counts, and average pricing
- 🔍 **Advanced Filtering** - Filter products by category, stock status, price range, and search terms
- ➕ **Product Management** - Add, edit, and delete products with a user-friendly form interface
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🌙 **Dark Mode Support** - Toggle between light and dark themes

## Getting Started

To run this project locally, simply execute:

```bash
npm install && npm run dev
```

That's it! The application will start and be available at `http://localhost:5173`

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests in watch mode
- `npm run lint` - Run ESLint automatically

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (Button, Modal, etc.)
│   ├── business/    # Business-specific components (ProductTable, etc.)
│   └── loaders/     # Loading state components
├── hooks/           # Custom React hooks
├── contexts/        # React contexts for state management
├── utils/           # Utility functions
├── models/          # TypeScript type definitions
├── api/             # API client and mock data
└── test/            # Test files
```

## Features Overview

### Product Management
- Add new products with name, category, price, stock, and image
- Edit existing products with inline forms
- Delete products with confirmation dialogs
- Real-time form validation

### Filtering & Search
- Text search across product names
- Filter by product category
- Filter by stock status (All, In Stock, Low Stock, Out of Stock)
- Price range filtering with min/max inputs
- Combine multiple filters for precise results

### Inventory Statistics
- Total product count
- In-stock vs out-of-stock counts
- Low stock alerts
- Average product price calculations

### User Experience
- Responsive design that works on all devices
- Dark/light theme toggle
- Loading states and skeleton loaders
- Toast notifications for user feedback

## Testing

The project includes comprehensive tests for:
- Custom hooks (useInventoryStats, useProductFilters)
- UI components (Button, Toggle)

Run tests with:
```bash
npm test
```
