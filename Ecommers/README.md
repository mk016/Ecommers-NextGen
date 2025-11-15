# 🛍️ E-Commerce NextGen Project

A modern, full-stack e-commerce application built with Next.js 15, featuring an admin dashboard for managing products, categories, subcategories, and banners. The application includes user authentication, product management, and a responsive UI built with HeroUI components.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Scripts](#scripts)
- [Project Status](#project-status)

## ✨ Features

### User Features
- 🔐 User Authentication (Login/Signup)
- 👤 User Profile Management
- 🛒 Product Browsing
- 🏠 Homepage with Banner Section
- 📱 Responsive Design
- 🌓 Dark/Light Theme Support

### Admin Features
- 📊 Admin Dashboard
- 🎨 Banner Management
- 📦 Category Management
- 📁 Subcategory Management
- 🛍️ Product Management (CRUD operations)
- 📤 Image Upload via Cloudinary
- 🔒 Admin Authentication

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.1** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type safety
- **HeroUI v2** - Component library
- **Tailwind CSS 4.1.11** - Styling
- **Framer Motion 11.18.2** - Animations
- **Axios 1.13.2** - HTTP client
- **React Hook Form 7.66.0** - Form management
- **Zod 4.1.12** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 8.19.3** - Database
- **Mongoose 8.19.3** - ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **Bcryptjs 3.0.3** - Password hashing
- **Cloudinary 2.8.0** - Image storage

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Turbopack** - Fast bundler

## 📁 Project Structure

```
Ecommers/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── layout.tsx           # Auth layout
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── signup/
│   │       └── page.tsx         # Signup page
│   │
│   ├── admin/                    # Admin panel
│   │   ├── layout.tsx           # Admin layout
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── login/
│   │   │   └── page.tsx         # Admin login
│   │   ├── components/
│   │   │   ├── Navbar.tsx       # Admin navbar
│   │   │   └── Sidebar.tsx      # Admin sidebar
│   │   ├── banner/
│   │   │   └── page.tsx         # Banner management
│   │   ├── categories/
│   │   │   └── page.tsx         # Category management
│   │   ├── subcategories/
│   │   │   └── page.tsx         # Subcategory management
│   │   └── products/
│   │       ├── page.tsx         # Products main page
│   │       ├── list/
│   │       │   └── page.tsx     # Products list
│   │       └── new/
│   │           ├── page.tsx     # Add new product
│   │           └── [id]/
│   │               └── page.tsx # Edit product
│   │
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts     # User login API
│   │   │   ├── signup/
│   │   │   │   └── route.ts     # User signup API
│   │   │   └── profile/
│   │   │       └── route.ts     # User profile API
│   │   │
│   │   ├── admin/
│   │   │   ├── banner/
│   │   │   │   ├── route.ts     # Get banners
│   │   │   │   └── add/
│   │   │   │       └── route.ts # Add banner
│   │   │   ├── category/
│   │   │   │   ├── route.ts     # Get categories
│   │   │   │   └── add/
│   │   │   │       └── route.ts # Add category
│   │   │   ├── subcategories/
│   │   │   │   ├── route.ts     # Get subcategories
│   │   │   │   └── add/
│   │   │   │       └── route.ts # Add subcategory
│   │   │   ├── products/
│   │   │   │   ├── route.ts     # Get products
│   │   │   │   └── add/
│   │   │   │       └── route.ts # Add product
│   │   │   ├── orders/
│   │   │   │   └── route.ts     # Orders API
│   │   │   └── uploads/
│   │   │       └── route.ts     # File upload API
│   │   │
│   │   └── middleware.ts        # API middleware
│   │
│   ├── HomePage/
│   │   └── page.tsx             # Homepage component
│   │
│   ├── products/
│   │   └── page.tsx             # Products listing page
│   │
│   ├── profile/
│   │   └── page.tsx             # User profile page
│   │
│   ├── about/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── blog/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── docs/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── pricing/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── data/                     # Static data
│   │   ├── auth.ts
│   │   └── index.ts
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Root page
│   ├── providers.tsx             # Theme providers
│   └── error.tsx                 # Error boundary
│
├── components/                    # Reusable components
│   ├── ui/                       # UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── file-upload.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── BannerSection.tsx         # Banner component
│   ├── navbar.tsx                # Main navbar
│   ├── counter.tsx
│   ├── icons.tsx
│   ├── primitives.ts
│   └── theme-switch.tsx
│
├── lib/                          # Utility libraries
│   ├── mongodb.ts                # MongoDB connection
│   ├── jwt.ts                    # JWT utilities
│   ├── cloudinary.ts             # Cloudinary config
│   ├── constant.ts               # Constants
│   └── utils.ts                  # Helper functions
│
├── models/                       # Mongoose models
│   ├── User.model.ts             # User schema
│   ├── products.model.ts         # Product schema
│   ├── categoires.model.ts       # Category schema
│   ├── subcategoires.model.ts    # Subcategory schema
│   └── banner.model.ts           # Banner schema
│
├── store/                        # State management
│   └── store.ts                  # Zustand store
│
├── config/                       # Configuration
│   ├── fonts.ts                  # Font configuration
│   └── site.ts                   # Site configuration
│
├── types/                        # TypeScript types
│   └── index.ts
│
├── styles/                       # Global styles
│   └── globals.css
│
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
│
├── .env                          # Environment variables (not in git)
├── components.json                # Component configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ecommers-NextGen/Ecommers
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=mongodb://localhost:27017
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
   
   JWT_SECRET=your-secret-jwt-key-here
   
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token generation | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## 📡 API Endpoints

### Authentication

#### POST `/api/auth/signup`
Create a new user account
- **Body**: `{ username, email, password }`
- **Response**: `{ message, user }`

#### POST `/api/auth/login`
User login
- **Body**: `{ email, password }`
- **Response**: `{ message, token, user }`

#### GET `/api/auth/profile`
Get user profile (requires authentication)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ user }`

### Admin - Categories

#### GET `/api/admin/category`
Get all categories
- **Response**: `Array<Category>`

#### POST `/api/admin/category/add`
Add a new category
- **Body**: `{ title, slug, images? }`
- **Response**: `{ message, category }`

### Admin - Subcategories

#### GET `/api/admin/subcategories`
Get all subcategories
- **Response**: `Array<SubCategory>`

#### POST `/api/admin/subcategories/add`
Add a new subcategory
- **Body**: `{ category, title, slug, image? }`
- **Response**: `{ message, subcategory }`

### Admin - Products

#### GET `/api/admin/products`
Get all products with populated category and subcategory
- **Response**: `Array<Product>`

#### POST `/api/admin/products/add`
Add a new product
- **Body**: `{ title, price, Displayprice, discription, Tgags, isHighlights, images, slug, stock, category, subCategory }`
- **Response**: `{ message, product }`

### Admin - Banners

#### GET `/api/admin/banner`
Get all banners
- **Response**: `Array<Banner>`

#### POST `/api/admin/banner/add`
Add a new banner
- **Body**: `{ image, link? }`
- **Response**: `{ message, banner }`

### Admin - Uploads

#### POST `/api/admin/uploads`
Upload file to Cloudinary
- **Body**: FormData with file
- **Response**: `{ url }`

### Admin - Orders

#### GET `/api/admin/orders`
Get all orders
- **Response**: `Array<Order>`

## 🗄️ Database Models

### User Model
```typescript
{
  username: string (required)
  email: string (required, unique, lowercase)
  password: string (required, min 8 chars)
  timestamps: true
}
```

### Category Model
```typescript
{
  title: string (required)
  images: string[] (required)
  slug: string (unique, lowercase)
  stock: number (default: 0)
  timestamps: true
}
```

### SubCategory Model
```typescript
{
  category: ObjectId (ref: Category, required)
  title: string (required)
  slug: string (unique, required)
  image: string
  timestamps: true
}
```

### Product Model
```typescript
{
  title: string (required)
  price: number (required)
  Displayprice: number (required)
  discription: string (required)
  Tgags: string (required)
  isHighlights: string
  images: string[] (required)
  slug: string (unique, lowercase)
  stock: number (default: 0)
  category: ObjectId (ref: Category, required)
  subCategory: ObjectId (ref: SubCategory, required)
  timestamps: true
}
```

### Banner Model
```typescript
{
  image: string (required)
  link: string
  timestamps: true
}
```

## 📜 Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📊 Project Status

### ✅ Completed Features
- [x] User authentication (Login/Signup)
- [x] JWT token-based authentication
- [x] MongoDB database integration
- [x] Admin dashboard layout
- [x] Category management (CRUD)
- [x] Subcategory management (CRUD)
- [x] Product management (CRUD)
- [x] Banner management
- [x] Cloudinary image upload integration
- [x] Responsive UI with HeroUI components
- [x] Dark/Light theme support
- [x] TypeScript implementation

### 🚧 In Progress / Planned
- [ ] Product listing page for users
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Payment integration
- [ ] User profile editing
- [ ] Product search and filters
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Admin authentication middleware
- [ ] Image optimization
- [ ] SEO optimization

## 🎨 UI Components

The project uses **HeroUI v2** component library with the following components:
- Buttons, Cards, Inputs
- Forms, Modals, Tables
- Navigation, Dropdowns
- Toast notifications
- File upload components

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Environment variables for sensitive data
- MongoDB connection with error handling

## 📝 Notes

- The project uses Next.js 15 App Router
- MongoDB connection is cached globally to prevent multiple connections
- All API routes are serverless functions
- Images are stored on Cloudinary
- The project follows TypeScript best practices

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Development

### Database Connection
The MongoDB connection is handled in `lib/mongodb.ts` with global caching to prevent connection issues during development.

### Authentication Flow
1. User signs up → Password is hashed → User saved to DB
2. User logs in → Password verified → JWT token generated → Token sent to client
3. Protected routes check JWT token in headers

### Admin Panel
The admin panel is accessible at `/admin` with separate authentication. Admin can manage:
- Banners for homepage
- Product categories
- Subcategories
- Products with images, pricing, and inventory

---

**Made with ❤️ using Next.js and HeroUI**
