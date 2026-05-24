# Manifik Restaurant - Premium Landing Page

A modern, responsive landing page for Manifik Restaurant featuring an interactive menu, online ordering, and table reservations. Built with Next.js, TypeScript, and a premium dark theme.

![Manifik Restaurant](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80)

## 🌟 Features

- **Interactive Menu Browser** - Browse dishes by category with pagination
- **Online Ordering System** - Place delivery orders with Formik validation
- **Table Reservations** - Book tables with date/time selection
- **Gallery** - Filterable image gallery with lightbox
- **Responsive Design** - Fully responsive on all devices
- **Premium Dark Theme** - Charcoal, forest green, and white color palette
- **Smooth Animations** - Framer Motion animations on scroll
- **SEO Optimized** - Server-side rendering with Next.js

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **React Query** - Data fetching and caching
- **Formik + Yup** - Form handling and validation
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Fastify** - Fast Node.js API framework
- **MongoDB + Mongoose** - Database and ODM
- **Node.js** - Runtime environment

## 📁 Project Structure

```
manifik/
├── backend/
│   ├── models/
│   │   ├── MenuItem.ts      # Menu item schema
│   │   ├── Order.ts         # Order schema
│   │   ├── Reservation.ts   # Reservation schema
│   │   └── Review.ts        # Review schema
│   └── server.ts            # Fastify API server
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   ├── About.tsx        # About section
│   │   ├── Menu.tsx         # Interactive menu
│   │   ├── MenuCard.tsx     # Menu item card
│   │   ├── MenuPagination.tsx
│   │   ├── Delivery.tsx     # Delivery ordering
│   │   ├── Gallery.tsx      # Image gallery
│   │   ├── Contact.tsx      # Contact & reservations
│   │   └── Footer.tsx       # Footer
│   ├── lib/
│   │   ├── api.ts           # API client functions
│   │   └── query-provider.tsx
│   └── types/
│       └── index.ts         # TypeScript types
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd manifik
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/manifik
   NEXT_PUBLIC_API_URL=http://localhost:3001
   PORT=3001
   ```

4. **Seed the database** (optional - adds sample menu items)
   ```bash
   # Start the backend server first
   npm run server
   
   # In another terminal, seed the database
   curl -X POST http://localhost:3001/api/seed
   ```

5. **Run the development servers**

   Option 1 - Run both frontend and backend together:
   ```bash
   npm run dev:all
   ```

   Option 2 - Run separately:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run server
   ```

6. **Open your browser**
   
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📡 API Endpoints

### Menu
- `GET /api/menu` - Get menu items (supports `category`, `page`, `limit` query params)
- `GET /api/menu/categories` - Get all categories
- `GET /api/menu/:id` - Get single menu item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Reservations
- `POST /api/reservations` - Create new reservation

### Reviews
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit a review

### Development
- `POST /api/seed` - Seed database with sample data

## 🎨 Design System

### Colors
- **Charcoal** (Primary): `#1a1a1a` - Backgrounds, text
- **Forest Green** (Accent): `#16a34a` - CTAs, highlights
- **White**: `#ffffff` - Text, contrast

### Typography
- **Headings**: Geist Sans, bold
- **Body**: Geist Sans, regular

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Scripts

```bash
npm run dev          # Start Next.js dev server
npm run server       # Start Fastify API server
npm run dev:all      # Start both servers
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for Manifik Restaurant
