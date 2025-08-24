# Original iPhone UI Recreation

🍎 A pixel-perfect recreation of the original iPhone user interface using HTML, CSS, and JavaScript, complete with working navigation and authentic app experiences.

![iPhone UI Preview](https://img.shields.io/badge/iPhone-Original_UI-007aff?style=for-the-badge&logo=apple)

## ✨ Features

- **📱 Authentic iPhone Frame**: Realistic phone mockup with physical buttons, speaker, camera
- **🌊 Water Droplet Wallpaper**: Classic animated background from the original iPhone
- **⚡ Working Navigation**: Click any app icon to launch the app, use home button to return
- **📊 Live Status Bar**: Real-time clock, signal bars, WiFi indicator, and battery level
- **🎯 22+ App Screens**: Detailed recreations of Messages, Phone, Safari, Settings, and more
- **📱 Touch Interactions**: Hover effects, click animations, and mobile swipe gestures
- **🔗 URL Routing**: Direct links to apps (e.g., `#messages`, `#phone`)
- **⌨️ Keyboard Shortcuts**: ESC/Space to go home, number keys to launch apps
- **📐 Responsive Design**: Works across different screen sizes while maintaining authenticity

## 🚀 Quick Start

### Option 1: Run the Python Server

```bash
# Clone or navigate to the project directory
cd claude-code-project

# Start the server
python3 src/main.py
```

Then open your browser to: **http://localhost:8000**

### Option 2: Static File Serving

```bash
# Navigate to the web directory
cd web

# Use any static file server, for example:
python3 -m http.server 8000
# or
npx serve .
```

## 🚀 Railway Deployment

This project is ready to deploy to Railway with one click:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/aloewright/original-iphone-ui)

For detailed deployment instructions, see [RAILWAY.md](RAILWAY.md).

## 📁 Project Structure

```
claude-code-project/
├── README.md
├── src/
│   └── main.py              # Python web server
├── web/                     # Web application files
│   ├── index.html          # Main HTML structure
│   ├── css/
│   │   ├── main.css        # Global styles and animations
│   │   ├── phone-frame.css # iPhone frame and hardware
│   │   ├── home-screen.css # Home screen and wallpaper
│   │   └── apps.css        # Individual app styles
│   ├── js/
│   │   ├── main.js         # Core functionality and state management
│   │   ├── navigation.js   # URL routing and page transitions
│   │   └── apps.js         # App content generation
│   ├── images/             # App icons and assets
│   └── fonts/              # Typography assets
├── requirements.txt
└── .gitignore
```

## 🎮 How to Use

### Navigation
- **Click any app icon** to launch the app
- **Click the home button** (physical button below screen) to return home
- **Use keyboard shortcuts**:
  - `ESC` or `Space` → Go home
  - `1-9` → Launch apps in order
  - `Cmd/Ctrl + H` → Go home
  - `Cmd/Ctrl + ←` → Go back

### Mobile Usage
- **Tap any app** to launch
- **Swipe right** from left edge to go home
- **Tap physical home button** to return to home screen

### URL Navigation
You can navigate directly to any app:
- `/#messages` → Messages app
- `/#phone` → Phone app
- `/#settings` → Settings app
- And so on...

## 📱 Available Apps

### Core Apps (Fully Interactive)
- **📝 Messages**: Chat interface with sample conversations
- **📞 Phone**: Working dialer with number pad
- **📅 Calendar**: Current month view with today highlighting
- **🖼️ Photos**: Color gradient gallery grid
- **📷 Camera**: Viewfinder mockup with capture button
- **⚙️ Settings**: iOS-style settings groups and lists
- **🌐 Safari**: Browser interface with URL bar and bookmarks
- **📄 Notes**: List of sample notes with timestamps
- **🎵 Music/iPod**: Now playing interface with controls

### Additional Apps (UI Mockups)
- **📺 YouTube**: Video streaming interface
- **📈 Stocks**: Stock market data display
- **🗺️ Maps**: Navigation and location services
- **🌤️ Weather**: Current conditions (73°F)
- **✅ Reminders**: Task management
- **🕐 Clock**: World clock and alarms
- **🎮 Game Center**: Social gaming hub
- **📰 Newsstand**: Magazine subscriptions
- **🎵 iTunes**: Media store
- **📱 App Store**: App discovery and downloads
- **✉️ Mail**: Email management

## 🎨 Technical Highlights

### Authentic iPhone Experience
- **Water droplet wallpaper** with subtle animations
- **iOS-style app icons** with glossy overlay effects
- **Status bar** with live time updates and battery simulation
- **Physical button interactions** with visual feedback
- **Smooth transitions** between screens

### Modern Web Technologies
- **Vanilla JavaScript** (no frameworks) for maximum performance
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Animations** for smooth transitions
- **Touch/Mouse Events** for cross-device compatibility
- **History API** for proper URL routing
- **Responsive Design** with mobile-first approach

### Performance Optimized
- **Lazy loading** of app content
- **Efficient event handling** with delegation
- **CSS-only animations** for smooth 60fps performance
- **Minimal DOM manipulation** for faster rendering

## 🛠️ Development

### Customization
The project is highly modular and easy to customize:

1. **Add new apps**: Create a new function in `js/apps.js`
2. **Modify styling**: Edit the corresponding CSS files
3. **Change wallpaper**: Update the background in `css/home-screen.css`
4. **Add interactions**: Extend the handlers in `js/main.js`

### Browser Support
- ✅ Chrome/Chromium
- ✅ Safari
- ✅ Firefox
- ✅ Edge
- ⚠️ IE11+ (limited support)

## 📝 Notes

- This is a **recreation/tribute** to the original iPhone UI
- Built for **educational and nostalgic purposes**
- **Not affiliated** with Apple Inc.
- Uses **web standards** and modern CSS/JS features
- **Mobile responsive** but optimized for the iPhone aspect ratio

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🎨 Improve the UI/UX
- 📱 Add more app implementations
- 🔧 Optimize performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the **original iPhone** released in 2007
- Built with **Claude AI** assistance
- **Water droplet wallpaper** recreated with CSS gradients
- **App icons** designed using CSS and Unicode emojis

---

**Enjoy exploring this nostalgic recreation of mobile computing history!** 🍎📱
