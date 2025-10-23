# Get Set Fit - Workout Tracker

A modern, offline-first Progressive Web App (PWA) for tracking your fitness journey. Built with React, TypeScript, and Vite, this app works seamlessly both online and offline.

## 🚀 Features

### Core Functionality
- **Workout Planning**: Create and manage custom workout plans
- **Exercise Tracking**: Log exercises with sets, reps, and weights
- **Workout History**: View your complete workout history with statistics
- **Offline Support**: Full functionality without internet connection
- **Data Export/Import**: Backup and restore your workout data

### Advanced Features
- **AI Exercise Suggestions**: Get personalized exercise recommendations (optional)
- **Rest Timers**: Built-in timers for rest periods between sets
- **Progress Statistics**: Track your fitness progress over time
- **PWA Support**: Install as a native app on your device
- **Responsive Design**: Works perfectly on desktop and mobile

### Security & Privacy
- **Local Storage**: All data stored locally on your device
- **No Data Collection**: Your fitness data never leaves your device
- **Secure API Keys**: Environment variables for sensitive data
- **Offline-First**: Works without internet connection

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **PWA**: Service Worker, Web App Manifest
- **Storage**: LocalStorage with error handling
- **AI Integration**: Google Gemini API (optional)

## 📦 Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitbro_-workout-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration** (Optional)
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your Gemini API key (optional)
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Gemini AI API Key for exercise suggestions
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration
VITE_APP_NAME=Get Set Fit
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Track your workouts and fitness journey offline
```

### Getting Gemini API Key (Optional)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

**Note**: The app works perfectly without the API key - you'll get fallback exercise suggestions instead.

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Open the app in your browser
2. Look for the install icon in the address bar
3. Click "Install" to add to your desktop

### Mobile (iOS/Android)
1. Open the app in Safari (iOS) or Chrome (Android)
2. Tap the share button
3. Select "Add to Home Screen"

## 🏗️ Building for Production

### Build the app
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy to static hosting
The `dist` folder contains all the files needed for static hosting:
- Upload to Netlify, Vercel, GitHub Pages, or any static hosting service
- Ensure HTTPS is enabled for PWA functionality

## 📊 Data Management

### Export Data
- Go to Settings → Data Management
- Click "Export Data" to download a JSON backup
- Includes all workout plans, logs, and settings

### Import Data
- Go to Settings → Data Management
- Click "Import Data" and select a previously exported JSON file
- All data will be restored

## 🔒 Security & Privacy

- **No Data Collection**: All data stays on your device
- **Local Storage Only**: No external databases or cloud storage
- **Secure API Keys**: Environment variables prevent key exposure
- **HTTPS Required**: PWA features require secure connection

## 🎨 Customization

### Themes
- Light/Dark mode support
- Theme preference saved locally

### Units
- Metric (kg, cm) or Imperial (lbs, ft)
- Unit preference saved locally

### Settings
- Notification preferences
- Auto-start timers
- Default rest times
- All settings persist across sessions

## 🐛 Troubleshooting

### Common Issues

**App not working offline?**
- Ensure you're using HTTPS in production
- Check that service worker is registered (look in browser dev tools)

**Data not saving?**
- Check browser storage permissions
- Ensure localStorage is available
- Try clearing browser cache

**AI suggestions not working?**
- Verify your Gemini API key is correct
- Check network connection
- App will fallback to offline suggestions

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Get Set Fit** - Your personal fitness journey starts here! 💪