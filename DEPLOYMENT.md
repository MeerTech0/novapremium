# NovaPremium - Deployment & Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- TMDB API Key (free at https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MeerTech0/novapremium.git
   cd novapremium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your TMDB API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🌐 Deployment Options

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variable `NEXT_PUBLIC_TMDB_API_KEY`
4. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t novapremium .
docker run -p 3000:3000 -e NEXT_PUBLIC_TMDB_API_KEY=your_key novapremium
```

### Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set NEXT_PUBLIC_TMDB_API_KEY=your_key
git push heroku main
```

---

## 📚 Project Structure

```
src/
├── app/                      # Next.js 14 app directory
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── movie/[id]/          # Movie detail page
│   ├── tv/[id]/             # TV show detail page
│   ├── trending/            # Trending page
│   ├── movies/              # Movies listing
│   ├── shows/               # TV shows listing
│   ├── search/              # Search page
│   ├── my-list/             # Watchlist & favorites
│   └── auth/                # Authentication pages
│       ├── login/
│       └── signup/
├── components/              # Reusable React components
│   ├── Navbar.tsx
│   ├── HeroBanner.tsx
│   ├── MovieCard.tsx
│   └── ContentSection.tsx
├── hooks/                   # Custom React hooks
│   └── useTMDB.ts          # TMDB API hooks
├── lib/                     # Utilities & helpers
│   ├── tmdb.ts             # TMDB API client
│   └── constants.ts        # App constants
├── store/                   # State management
│   └── useStore.ts         # Zustand store
├── types/                   # TypeScript types
│   └── index.ts
└── styles/                  # Additional styles
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  'nova': {
    '500': '#ad977d',  // Primary gold
    // ... other colors
  },
  'dark': {
    '900': '#0a0e27',  // Dark background
    // ... other shades
  },
}
```

### Fonts
Modify `src/app/globals.css` to change fonts:

```css
font-family: 'Inter', system-ui, sans-serif;  /* Body font */
font-family: 'Poppins', system-ui, sans-serif; /* Display font */
```

### API Configuration
Update `.env.local`:

```
NEXT_PUBLIC_TMDB_API_KEY=your_key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

---

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_TMDB_API_KEY` | TMDB API key | ✅ Yes |
| `NEXT_PUBLIC_TMDB_BASE_URL` | TMDB API base URL | ✅ Yes |
| `NEXT_PUBLIC_TMDB_IMAGE_URL` | TMDB image base URL | ✅ Yes |
| `NEXT_PUBLIC_ENV` | Environment (development/production) | ⚪ No |

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for testing
npm run build
```

---

## 📊 Performance Optimization

- ✅ Image optimization with Next.js Image component
- ✅ Automatic code splitting
- ✅ CSS-in-JS with Tailwind
- ✅ Lazy loading for sections
- ✅ API response caching
- ✅ SEO optimized with metadata

---

## 🐛 Troubleshooting

### API Key Issues
- Verify TMDB API key is valid
- Check rate limits haven't been exceeded
- Ensure `.env.local` file is in root directory

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request
# Then merge to main
```

---

## 📞 Support & Contributing

For issues, feature requests, or contributions:
1. Open an issue on GitHub
2. Submit a pull request
3. Follow the contribution guidelines

---

## 📄 License

MIT License - Free for personal and commercial use

---

## 🎯 Roadmap

- [ ] User authentication with NextAuth.js
- [ ] Backend API with Node.js/Express
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Advanced search filters
- [ ] Recommendation algorithm
- [ ] User ratings and reviews
- [ ] Social sharing features
- [ ] Video player streaming
- [ ] Mobile app (React Native)
- [ ] Admin dashboard

---

**Built with ❤️ for the ultimate streaming experience**
