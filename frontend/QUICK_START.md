# CropGuard Vision - Quick Start Guide

## Prerequisites

✅ Node.js 20+ installed
✅ Backend API running on http://localhost:8000

## Installation (5 minutes)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment
```bash
# Already created: .env file
# Verify it contains:
VITE_API_BASE_URL=http://localhost:8000
```

### Step 3: Start Development Server
```bash
npm run dev
```

🎉 **Application is now running at http://localhost:5173**

## First Test

1. Open http://localhost:5173 in your browser
2. Click "Start Diagnosis" button
3. Upload a crop leaf image (or drag & drop)
4. Select crop type and season
5. Click "Analyze Crop"
6. View results with treatment advice

## Troubleshooting

### Issue: "Network error"
**Solution**: Ensure backend is running on http://localhost:8000
```bash
# In backend directory
uvicorn app.main:app --reload --port 8000
```

### Issue: "Cannot connect to API"
**Solution**: Check CORS settings in backend allow http://localhost:5173

### Issue: Dependencies not installing
**Solution**: Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Microphone not working
**Solution**: Grant microphone permissions in browser settings

## Project Structure Overview

```
src/
├── pages/          → Main pages (Home, Diagnose, History, About)
├── components/     → Reusable UI components
├── hooks/          → Custom React hooks (usePrediction, useVoice, useHistory)
├── services/       → API and audio services
├── context/        → Global state management
└── constants/      → Configuration and constants
```

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm test            # Run tests
npm run lint        # Run linter
```

## Testing Features

### Image Upload
1. Go to /diagnose
2. Click or drag-drop to upload image
3. Verify preview appears
4. Verify "Analyze Crop" button enables

### Language Switching
1. Click language dropdown in header
2. Select different language
3. Verify UI updates (future: API responses will be in selected language)

### Voice Input
1. Go to /diagnose
2. Click microphone button
3. Grant microphone permission
4. Speak symptoms
5. Verify recording indicator appears
6. Stop recording and view transcription

### History
1. Complete at least one diagnosis
2. Go to /history
3. Verify past predictions appear

## Build for Production

```bash
npm run build
# Output in dist/ directory
```

## Docker Deployment

```bash
docker build -t cropguard-frontend .
docker run -p 3000:80 cropguard-frontend
# Access at http://localhost:3000
```

## Need Help?

- Check `IMPLEMENTATION_SUMMARY.md` for complete details
- Review `README.md` for full documentation
- Check documentation in `docs/` directory
