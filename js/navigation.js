/* ========================================
   ORIGINAL IPHONE UI - NAVIGATION & ROUTING
   ======================================== */

// Navigation state
window.NavigationState = {
    history: [],
    currentPage: 'home',
    canGoBack: false
};

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

/**
 * Initialize navigation system
 */
function initializeNavigation() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handlePopState);
    
    // Handle initial URL hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash && initialHash !== '') {
        setTimeout(() => {
            launchApp(initialHash);
        }, 2500); // Wait for loading screen to finish
    }
    
    // Add swipe gesture support for mobile
    addSwipeGestures();
    
    console.log('🧭 Navigation system initialized');
}

/**
 * Handle browser back/forward navigation
 */
function handlePopState(event) {
    const hash = window.location.hash.slice(1);
    
    if (!hash || hash === '') {
        // Go to home screen
        if (window.iPhoneUI.currentApp) {
            goHomeWithoutHashUpdate();
        }
    } else {
        // Navigate to app
        if (window.iPhoneUI.currentApp !== hash) {
            launchAppWithoutHashUpdate(hash);
        }
    }
}

/**
 * Launch app without updating URL hash (used by popstate)
 */
function launchAppWithoutHashUpdate(appName) {
    if (window.iPhoneUI.isTransitioning) {
        return;
    }
    
    console.log(`🚀 Navigating to app: ${appName}`);
    
    window.iPhoneUI.isTransitioning = true;
    window.iPhoneUI.currentApp = appName;
    
    // Load app if not already loaded
    if (!window.iPhoneUI.loadedApps.has(appName)) {
        loadAppContent(appName);
    }
    
    // Show app screen
    showAppScreen(appName);
}

/**
 * Go home without updating URL hash (used by popstate)
 */
function goHomeWithoutHashUpdate() {
    if (window.iPhoneUI.isTransitioning) {
        return;
    }
    
    const homeScreen = document.getElementById('home-screen');
    const appScreen = document.getElementById('app-screen');
    
    if (!homeScreen || !appScreen) {
        console.error('Screen containers not found');
        return;
    }
    
    window.iPhoneUI.isTransitioning = true;
    
    // Add transition animation
    appScreen.className = 'app-screen slide-out-right';
    
    setTimeout(() => {
        // Hide app screen
        appScreen.style.display = 'none';
        
        // Show home screen
        homeScreen.style.display = 'flex';
        homeScreen.className = 'home-screen slide-in-left';
        
        // Reset state
        window.iPhoneUI.currentApp = null;
        window.iPhoneUI.isTransitioning = false;
        
        // Update navigation state
        window.NavigationState.currentPage = 'home';
        window.NavigationState.canGoBack = false;
    }, 300);
}

/**
 * Add swipe gesture support
 */
function addSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    const screen = document.querySelector('.screen');
    if (!screen) return;
    
    screen.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    }, { passive: true });
    
    screen.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const touch = e.touches[0];
        endX = touch.clientX;
        endY = touch.clientY;
    }, { passive: true });
    
    screen.addEventListener('touchend', function(e) {
        if (!startX || !startY || !endX || !endY) {
            resetSwipeValues();
            return;
        }
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);
        
        // Minimum swipe distance
        const minSwipeDistance = 100;
        
        // Check if horizontal swipe is more significant than vertical
        if (absDiffX > absDiffY && absDiffX > minSwipeDistance) {
            if (diffX > 0) {
                // Swiped left - could implement page navigation
                console.log('👈 Swiped left');
            } else {
                // Swiped right - go back/home
                console.log('👉 Swiped right - going home');
                if (window.iPhoneUI.currentApp) {
                    goHome();
                }
            }
        }
        
        resetSwipeValues();
    }, { passive: true });
    
    function resetSwipeValues() {
        startX = startY = endX = endY = 0;
    }
}

/**
 * Add navigation breadcrumbs (for future use)
 */
function addToBreadcrumb(pageName) {
    window.NavigationState.history.push(window.NavigationState.currentPage);
    window.NavigationState.currentPage = pageName;
    window.NavigationState.canGoBack = window.NavigationState.history.length > 0;
}

/**
 * Go back in navigation history
 */
function navigateBack() {
    if (!window.NavigationState.canGoBack || window.NavigationState.history.length === 0) {
        goHome();
        return;
    }
    
    const previousPage = window.NavigationState.history.pop();
    
    if (previousPage === 'home') {
        goHome();
    } else {
        launchApp(previousPage);
    }
    
    // Update navigation state
    window.NavigationState.currentPage = previousPage;
    window.NavigationState.canGoBack = window.NavigationState.history.length > 0;
}

/**
 * Enhanced app launching with navigation history
 */
function launchAppWithHistory(appName) {
    // Add current page to history
    addToBreadcrumb(appName);
    
    // Launch the app
    launchApp(appName);
}

/**
 * Create page transition effects
 */
function createPageTransition(fromElement, toElement, direction = 'left') {
    return new Promise((resolve) => {
        if (!fromElement || !toElement) {
            resolve();
            return;
        }
        
        const duration = 300;
        
        // Set up initial positions
        if (direction === 'left') {
            toElement.style.transform = 'translateX(100%)';
            toElement.style.display = 'block';
            
            // Animate out
            fromElement.style.transition = `transform ${duration}ms ease-out`;
            fromElement.style.transform = 'translateX(-100%)';
            
            // Animate in
            toElement.style.transition = `transform ${duration}ms ease-out`;
            setTimeout(() => {
                toElement.style.transform = 'translateX(0)';
            }, 10);
            
        } else if (direction === 'right') {
            toElement.style.transform = 'translateX(-100%)';
            toElement.style.display = 'block';
            
            // Animate out
            fromElement.style.transition = `transform ${duration}ms ease-out`;
            fromElement.style.transform = 'translateX(100%)';
            
            // Animate in
            toElement.style.transition = `transform ${duration}ms ease-out`;
            setTimeout(() => {
                toElement.style.transform = 'translateX(0)';
            }, 10);
        }
        
        setTimeout(() => {
            // Clean up
            fromElement.style.display = 'none';
            fromElement.style.transform = '';
            fromElement.style.transition = '';
            
            toElement.style.transform = '';
            toElement.style.transition = '';
            
            resolve();
        }, duration);
    });
}

/**
 * Handle keyboard shortcuts for navigation
 */
document.addEventListener('keydown', function(event) {
    // Don't handle if user is typing in an input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(event.key) {
        case 'Escape':
        case 'Backspace':
            event.preventDefault();
            if (window.iPhoneUI.currentApp) {
                goHome();
            }
            break;
            
        case 'ArrowLeft':
            if (event.metaKey || event.ctrlKey) {
                event.preventDefault();
                navigateBack();
            }
            break;
            
        case 'ArrowRight':
            if (event.metaKey || event.ctrlKey) {
                event.preventDefault();
                // Could implement forward navigation
            }
            break;
            
        case 'h':
        case 'H':
            if (event.metaKey || event.ctrlKey) {
                event.preventDefault();
                goHome();
            }
            break;
    }
});

/**
 * URL state management
 */
function updateURLState(appName) {
    const newHash = appName || '';
    if (window.location.hash.slice(1) !== newHash) {
        window.history.pushState({ app: appName }, '', newHash ? `#${newHash}` : '#');
    }
}

/**
 * Get current navigation state for debugging
 */
function getNavigationState() {
    return {
        current: window.NavigationState.currentPage,
        history: [...window.NavigationState.history],
        canGoBack: window.NavigationState.canGoBack,
        currentApp: window.iPhoneUI.currentApp,
        isTransitioning: window.iPhoneUI.isTransitioning,
        loadedApps: Array.from(window.iPhoneUI.loadedApps)
    };
}

// Expose navigation functions globally for debugging
window.Navigation = {
    back: navigateBack,
    home: goHome,
    state: getNavigationState,
    launchApp: launchAppWithHistory
};

console.log('🧭 iPhone UI Navigation loaded');
</invoke>
