# 🎬 NovaPremium - Ultimate AI Streaming Platform

A world-class premium streaming platform built with React, Next.js, Tailwind CSS, and Framer Motion. Stream movies and TV shows with a cinematic, glassmorphism design that rivals Netflix, Disney+, Apple TV, and Prime Video.

## ✨ Features

### 🎨 Design
- **Premium Dark Theme** with soft luxury colors
- **Glassmorphism** effects with smooth animations
- **Cinematic Layout** inspired by premium streaming platforms
- **Fully Responsive** - Desktop, Tablet, Mobile optimized
- **Beautiful Typography** with modern font system
- **Soft Shadows & Rounded Corners** for elegant appearance

### 🎬 Content
- **Trending Movies & TV Shows**
- **Popular Content** with live data from TMDB
- **Top Rated Movies & Shows**
- **Upcoming Releases**
- **Continue Watching** functionality
- **Personalized Recommendations**
- **Recently Added** content

### 🎯 Core Features
- **Premium Navigation** - Sticky header with search
- **Hero Banner** - Automatic slideshow with trailers
- **Advanced Search** - Live search, suggestions, voice search
- **Details Page** - Complete movie/show information
- **Watch Page** - HTML5 video player with full controls
- **User Profiles** - Authentication, watchlist, favorites
- **Watch History** - Continue watching, history tracking
- **Streaming Providers** - Display where content is available

### 🔧 Technical Stack
- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **API**: TMDB (The Movie Database)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **TypeScript** for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- TMDB API Key (free at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository
```bash
git clone https://github.com/MeerTech0/novapremium.git
cd novapremium
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
```bash
cp .env.local.example .env.local
```

4. Add your TMDB API Key to `.env.local`
```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

5. Start development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── HeroBanner.tsx
│   ├── MovieCard.tsx
│   ├── ContentSection.tsx
│   └── ...
├── pages/                 # API routes & pages
│   └── api/               # Backend endpoints
├── lib/                   # Utilities
│   ├── tmdb.ts           # TMDB API client
│   └── constants.ts      # App constants
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── styles/               # Global styles
```

## 🎨 Color Palette

- **Primary**: Dark Navy (#0a0e27)
- **Secondary**: Premium Gold (#ad977d)
- **Accent**: Soft Silver (#e7e1d7)
- **Glass**: RGBA backgrounds with backdrop blur

## 🔌 API Integration

All data is powered by TMDB API:
- Trending movies & shows
- Popular content
- Top rated titles
- Upcoming releases
- Search functionality
- Watch providers
- Credits & recommendations

## 📱 Responsive Design

- **Desktop**: Full feature set
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

## ⚡ Performance

- Image optimization with Next.js Image
- Lazy loading for sections
- API caching strategies
- Optimized bundle size
- SEO optimized

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for the ultimate streaming experience**
