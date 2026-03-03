# CropGuard Vision - Frontend

AI-powered crop disease detection and treatment advisory system frontend built with React, Vite, and Tailwind CSS.

## Features

- 🌱 Image-based crop disease detection
- 🗣️ Voice input support
- 🔊 Text-to-speech treatment advice
- 🌐 Multi-language support (English, Hindi, Tamil, Telugu, French, Spanish)
- 📱 Progressive Web App (PWA) support
- 📊 Diagnosis history tracking

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering

## Prerequisites

- Node.js 20+ and npm
- Backend API running on `http://localhost:8000`

## Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your API URL if different
# VITE_API_BASE_URL=http://localhost:8000
```

## Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── upload/          # Image upload related components
│   ├── results/         # Disease results display components
│   └── voice/           # Voice input/output components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API and audio services
├── context/             # React context for global state
├── constants/           # Configuration constants
├── test/                # Test utilities
├── App.jsx              # Main app component with routing
└── main.jsx             # App entry point
```

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: `http://localhost:8000`)

## API Integration

The frontend communicates with the FastAPI backend through the following endpoints:

- `POST /api/predict` - Disease prediction from image
- `POST /api/voice-query` - Voice-based query
- `GET /api/crops` - Get supported crops
- `GET /api/languages` - Get supported languages
- `GET /api/history/{session_id}` - Get diagnosis history
- `GET /api/health` - Health check

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with camera access support
- Voice input requires microphone permissions

## License

MIT
