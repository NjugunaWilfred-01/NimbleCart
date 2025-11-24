# NimbleCart - Product Management App

A Vue.js 3 application for managing products with authentication, built for AlienSoft Technologies internship assessment.

## Features

- User Authentication (login/logout with token management)
- Product Management (CRUD operations)
- Product Search and Filtering
- Responsive Design
- Modern UI with Tailwind CSS
- State Management with Pinia
- Route Protection

## Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: DummyJSON (https://dummyjson.com)

## Project Structure

```
src/
├── stores/           # Pinia stores
│   ├── auth.ts      # Authentication store
│   └── products.ts  # Products store
├── views/           # Page components
│   ├── LoginView.vue
│   ├── ProductsView.vue
│   ├── ProductDetailView.vue
│   └── ProductFormView.vue
├── router/
│   └── index.ts     # Route configuration
└── main.ts         # App entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/NjugunaWilfred-01/NimbleCart.git
cd NimbleCart
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Authentication

Use these test credentials to login:
- **Username**: `emilys`
- **Password**: `emilyspass`

Authentication tokens are stored in localStorage for session persistence.

### Product Management

- **View Products**: Browse all products in a responsive grid layout
- **Search**: Use the search bar to find products by title
- **View Details**: Click on any product card to see full details
- **Add Product**: Use the "Add New Product" button to create new products
- **Edit Product**: Click "Edit" on product detail page to modify existing products
- **Delete Product**: Click "Delete" with confirmation modal

## API Integration

The app integrates with DummyJSON API:
- `POST /auth/login` - User authentication
- `GET /products` - Fetch all products
- `GET /products/{id}` - Fetch single product
- `POST /products/add` - Create new product
- `PUT /products/{id}` - Update existing product
- `DELETE /products/{id}` - Delete product

## Build for Production

```sh
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

This project can be deployed to GitHub Pages, Vercel, Netlify, or any static hosting service.

### GitHub Pages Deployment

1. Build the project:
```sh
npm run build
```

2. Deploy using GitHub Actions or manually upload the `dist/` folder contents.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Uses ESLint for code linting
- Prettier for code formatting
- Vue 3 Composition API
- TypeScript for type safety

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
