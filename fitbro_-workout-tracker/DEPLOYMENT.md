# Deployment Guide

This guide covers how to deploy Get Set Fit to various hosting platforms.

## 🚀 Quick Deploy

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy! The app will be available at your Netlify URL

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy! The app will be available at your Vercel URL

### GitHub Pages
1. Run `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings
4. The app will be available at `https://username.github.io/repository-name`

## 🔧 Manual Deployment

### Build the App
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The dist folder contains all files needed for deployment
```

### Upload to Static Hosting
Upload the contents of the `dist` folder to any static hosting service:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect repository or upload `dist` folder
- **Firebase Hosting**: Use `firebase deploy`
- **AWS S3**: Upload files to S3 bucket with static website hosting
- **Cloudflare Pages**: Connect repository or upload files

## 🔒 HTTPS Requirement

**Important**: PWA features require HTTPS. Ensure your hosting platform provides:
- SSL/TLS certificate
- HTTPS redirect
- Secure headers

## 📱 PWA Testing

After deployment, test PWA functionality:
1. Open the app in Chrome/Edge
2. Check for install prompt in address bar
3. Test offline functionality
4. Verify service worker registration in DevTools

## 🌐 Environment Variables

For production deployment, set these environment variables:
- `VITE_GEMINI_API_KEY`: Your Gemini API key (optional)
- `VITE_APP_NAME`: App name (default: "Get Set Fit")
- `VITE_APP_VERSION`: App version (default: "1.0.0")

## 📊 Performance Optimization

The app is already optimized for production:
- Code splitting enabled
- Static assets cached
- Service worker for offline functionality
- Responsive design
- Minimal bundle size

## 🔍 Troubleshooting

### Common Issues

**PWA not installing?**
- Ensure HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker is registered

**Offline not working?**
- Check service worker registration
- Verify cache strategy
- Test in incognito mode

**Build failing?**
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Verify all dependencies are installed

## 📈 Analytics (Optional)

To add analytics, modify the service worker or add tracking scripts:
- Google Analytics
- Plausible Analytics
- Fathom Analytics

## 🔄 Updates

To update the deployed app:
1. Make changes to the code
2. Run `npm run build`
3. Deploy the new `dist` folder
4. The service worker will handle cache updates automatically

---

**Need help?** Check the main README.md or create an issue in the repository.
