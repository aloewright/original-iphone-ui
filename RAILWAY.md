# Railway Deployment Guide

This document provides instructions for deploying the Original iPhone UI to Railway.

## Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/original-iphone-ui)

## Manual Deployment Steps

1. **Fork or clone this repository**
2. **Connect to Railway:**
   - Go to [Railway.app](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository

3. **Configure the deployment:**
   - Railway will automatically detect this as a Python project
   - It will use the `Procfile` to start the application
   - No additional environment variables are required

4. **Deploy:**
   - Railway will automatically build and deploy the application
   - The app will be available at the provided Railway URL

## Files Added for Railway

- **`Procfile`**: Tells Railway how to start the web server (`web: python3 src/main.py`)
- **`railway.json`**: Railway-specific configuration
- **Updated `src/main.py`**: 
  - Uses `PORT` environment variable (Railway requirement)
  - Binds to `0.0.0.0` instead of localhost (Railway requirement)

## Local Testing

To test the Railway-compatible configuration locally:

```bash
# Set the PORT environment variable (Railway will provide this automatically)
PORT=8080 python3 src/main.py

# Or use the default port 8000
python3 src/main.py
```

## Technical Details

- **Runtime**: Python 3.x (Railway auto-detects)
- **Dependencies**: None (uses Python standard library only)
- **Port**: Uses `PORT` environment variable provided by Railway
- **Static Files**: Served from `web/` directory
- **Server**: Python's built-in `http.server.SimpleHTTPRequestHandler`

## Post-Deployment

After deployment, your Original iPhone UI will be available at:
- `https://your-app-name.railway.app`

The application includes:
- 📱 Pixel-perfect iPhone UI recreation
- 🎮 Interactive apps (Phone, Messages, Settings, etc.)
- 📊 Working status bar with live time
- 🔄 Smooth animations and transitions
- 📸 Responsive design optimized for mobile

## Troubleshooting

If you encounter issues:

1. **Check the Railway logs** for any startup errors
2. **Verify all files** were committed to your repository
3. **Ensure the web/ directory** contains all CSS, JS, and HTML files
4. **Test locally** using the same configuration

## Repository Structure

```
original-iphone-ui/
├── Procfile              # Railway startup command
├── railway.json          # Railway configuration
├── requirements.txt      # Python dependencies (empty - uses stdlib only)
├── src/main.py          # Python web server (Railway-compatible)
└── web/                 # Static website files
    ├── index.html       # Main iPhone UI
    ├── css/            # Stylesheets
    └── js/             # JavaScript files
```