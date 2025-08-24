# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start & Common Commands](#quick-start--common-commands)
3. [Architecture Overview](#architecture-overview)
4. [Navigation & Routing System](#navigation--routing-system)
5. [App Loading Mechanism](#app-loading-mechanism)
6. [Development Guidelines](#development-guidelines)
7. [Key Features & Implementation](#key-features--implementation)
8. [Troubleshooting](#troubleshooting)
9. [Quick Reference](#quick-reference)

## Project Overview

This is a pixel-perfect recreation of the original iPhone user interface (circa 2007) built with vanilla HTML, CSS, and JavaScript. The project recreates 22+ app screens with authentic animations, working navigation, and iOS-style interactions. It serves as both a nostalgic tribute and a showcase of modern web technologies achieving authentic mobile UI recreation.

## Quick Start & Common Commands

### Start Development Server
```bash
# Primary method: Python server
python3 src/main.py
# Opens http://localhost:8000
```

### Alternative Static Serving
```bash
# Navigate to web directory and serve
cd web
python3 -m http.server 8000
# or
npx serve .
```

### Development Workflow
- Make changes to files in `web/` directory
- Refresh browser to see changes (no build step required)
- Use browser dev tools to test mobile viewport

### Testing Navigation
- Direct app access: `http://localhost:8000/#messages`
- All apps accessible via hash routing: `#phone`, `#settings`, etc.

### Keyboard Shortcuts
- **ESC** or **Space**: Return to home screen
- **1-9**: Launch apps in order (row by row)
- **Cmd/Ctrl + H**: Go home
- **Cmd/Ctrl + ←**: Go back

## Architecture Overview

### File Structure
```
claude-code-project/
├── src/main.py              # Python web server (simple HTTP server)
└── web/                     # Frontend application
    ├── index.html           # Single-page app structure
    ├── css/
    │   ├── main.css         # Global styles and animations
    │   ├── phone-frame.css  # iPhone hardware frame styling
    │   ├── home-screen.css  # Home screen, wallpaper, app grid
    │   └── apps.css         # Individual app screen styles
    └── js/
        ├── main.js          # Core functionality, state management, event handling
        ├── navigation.js    # URL routing, browser history, swipe gestures
        └── apps.js          # App content generation and app-specific handlers
```

### JavaScript Architecture

**Three-Module System:**
- **main.js**: Core state management, event listeners, app launching, UI initialization
- **navigation.js**: Hash-based routing, browser history integration, touch gestures
- **apps.js**: Dynamic app content generation, individual app functionality

**Design Philosophy:**
- **No frameworks**: Vanilla JavaScript for maximum performance and authenticity
- **Event delegation**: Efficient handling of touch and click events
- **Lazy loading**: Apps only generate content when first accessed
- **CSS-only animations**: 60fps transitions using hardware acceleration

### State Management

**Global State Objects:**
```javascript
window.iPhoneUI = {
    currentApp: null,           // Currently active app name
    isTransitioning: false,     // Prevents interaction during animations
    loadedApps: new Set(),      // Tracks which apps have been loaded
    startTime: Date.now()       // App launch timestamp
}

window.NavigationState = {
    history: [],                // Navigation breadcrumbs
    currentPage: 'home',        // Current page identifier
    canGoBack: false            // Whether back navigation is possible
}
```

### CSS Organization

- **phone-frame.css**: Hardware mockup (buttons, camera, speaker)
- **home-screen.css**: Wallpaper animations, app icons, dock
- **apps.css**: Individual app styling (Messages bubbles, Phone dialer, etc.)
- **main.css**: Global utilities, transitions, responsive design

## Navigation & Routing System

### Hash-Based Routing
- **URL Pattern**: `/#appName` (e.g., `/#messages`, `/#phone`)
- **Direct Navigation**: Any app can be accessed directly via URL
- **Browser Integration**: Back/forward buttons work naturally

### Navigation Flow
1. User interaction (click/tap app icon)
2. `handleAppClick()` adds animation and launches app
3. `launchApp()` updates URL hash and state
4. Content loads via `loadAppContent()` if not cached
5. `showAppScreen()` handles transition animation

### Browser History Integration
```javascript
window.addEventListener('popstate', handlePopState);
// Handles browser back/forward buttons seamlessly
```

### Touch Gestures
- **Swipe Right**: Return to home screen (swipe from left edge)
- **Touch Feedback**: Visual scale animation on tap
- **Passive Event Listeners**: Prevents scroll conflicts

## App Loading Mechanism

### Dynamic Content Generation
Apps are generated on-demand using template functions in `apps.js`:

```javascript
const appTemplates = {
    messages: generateMessagesApp,
    phone: generatePhoneApp,
    calendar: generateCalendarApp,
    // ... 22+ apps
};
```

### App Handler System
Some apps have interactive functionality:

```javascript
window.AppHandlers.phone = {
    init: function() {
        // Initialize dialer functionality
        // Handle number button clicks
        // Update display and provide haptic feedback
    }
};
```

### Lazy Loading Process
1. Check if app is in `window.iPhoneUI.loadedApps` Set
2. If not loaded, call `generateAppContent(appName)`
3. Insert HTML into `#app-screen` container
4. Call app's `init()` handler if exists
5. Mark app as loaded to prevent regeneration

### Example: Phone App Implementation
The Phone app demonstrates the full loading mechanism:
- **Template Generation**: Creates dialer HTML structure
- **Event Handling**: Number pad button interactions
- **State Management**: Tracks dialed numbers
- **Visual Feedback**: Button animations and haptic simulation

## Development Guidelines

### Adding New Apps

1. **Create App Icon** in `index.html`:
```html
<div class="app-icon" data-app="myapp">
    <div class="icon myapp-icon"></div>
    <span class="app-label">My App</span>
</div>
```

2. **Add CSS Styling** in `css/apps.css`:
```css
.myapp-icon {
    background: linear-gradient(135deg, #color1, #color2);
    /* Add icon styling */
}
```

3. **Create App Generator** in `js/apps.js`:
```javascript
function generateMyApp() {
    return `<div class="app-container myapp-app">...</div>`;
}

// Register in appTemplates object
const appTemplates = {
    // ... existing apps
    myapp: generateMyApp
};
```

4. **Add Interactivity** (optional):
```javascript
window.AppHandlers.myapp = {
    init: function() {
        // Initialize app-specific functionality
    }
};
```

### Modifying Existing Apps
- **Templates**: Edit generator functions in `js/apps.js`
- **Styling**: Modify corresponding sections in `css/apps.css`
- **Functionality**: Update handlers in `window.AppHandlers`

### CSS Customization
- **Animations**: Look for `@keyframes` and CSS transitions
- **Colors**: Search for hex codes and CSS custom properties
- **Layout**: Modify flexbox and grid properties

### Performance Best Practices
- Use `passive: true` for touch event listeners
- Prefer CSS animations over JavaScript animations
- Minimize DOM queries (cache element references)
- Use event delegation for dynamic content

## Key Features & Implementation

### Live Status Bar
- **Real-time Clock**: Updates every second via `setInterval`
- **Battery Animation**: CSS keyframe animation simulating drain
- **Signal Bars**: Static CSS representation of cellular signal

### Water Droplet Wallpaper
- **Pure CSS**: No images, created with gradients and transforms
- **Subtle Animation**: Breathing effect using CSS keyframes
- **Performance**: GPU-accelerated transforms

### Physical Button Interactions
- **Home Button**: Primary navigation, returns to home screen
- **Power Button**: Visual feedback (no actual functionality)
- **Volume Controls**: Styled but non-functional (visual only)
- **Mute Switch**: Hardware detail for authenticity

### Touch Feedback System
- **Scale Animation**: Buttons shrink on touch/click
- **Haptic Simulation**: `navigator.vibrate()` when supported
- **Visual Transitions**: CSS-based hover and active states

### Responsive Design
- **Mobile-First**: Optimized for mobile viewport
- **Flexible Layout**: Works on various screen sizes
- **Aspect Ratio**: Maintains iPhone proportions

## Troubleshooting

### Server Issues
**Port 8000 in Use:**
```bash
# Find and kill process using port 8000
lsof -ti:8000 | xargs kill -9
# Or use different port
python3 src/main.py  # Modify PORT variable if needed
```

### App Loading Problems
- **Check Console**: Look for JavaScript errors in browser dev tools
- **Clear Cache**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
- **Verify File Paths**: Ensure all CSS/JS files are loading correctly

### Animation Performance
- **GPU Acceleration**: Ensure `transform` and `opacity` animations
- **Reduce Complexity**: Simplify CSS animations if choppy
- **Mobile Testing**: Test on actual mobile devices for performance

### Touch Gesture Conflicts
- **Passive Listeners**: Ensure touch events use `{ passive: true }`
- **Prevent Default**: Use `e.preventDefault()` appropriately
- **Touch vs Click**: Test both touch and mouse interactions

## Quick Reference

### Key Files
- `src/main.py` - Development server
- `web/index.html` - App structure and HTML
- `web/js/main.js` - Core functionality and state
- `web/js/navigation.js` - Routing and browser history
- `web/js/apps.js` - App content and functionality
- `web/css/main.css` - Global styles and animations

### Global Objects
- `window.iPhoneUI` - Main app state and transition management
- `window.NavigationState` - Navigation history and page tracking
- `window.AppHandlers` - App-specific initialization functions
- `window.generateAppContent` - App content generation function

### Important CSS Classes
- `.launching` - App icon animation when tapped
- `.fade-in` - App screen entrance animation
- `.slide-out-right` - App exit animation
- `.slide-in-left` - Home screen entrance animation

### URL Hash Patterns
All apps accessible via: `http://localhost:8000/#<appname>`
- `/#messages` - Messages app
- `/#phone` - Phone dialer
- `/#settings` - Settings screen
- `/#safari` - Safari browser
- `/#calendar` - Calendar view
- (And 17+ more apps)

### Event Flow
1. **User Interaction** → Touch/click event
2. **Event Handler** → `handleAppClick()` or `handleHomeButtonClick()`
3. **State Update** → Modify `window.iPhoneUI` state
4. **Content Loading** → Generate app HTML if needed
5. **UI Update** → Show/hide screens with CSS transitions
6. **URL Update** → Set `window.location.hash` for routing
