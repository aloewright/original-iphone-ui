/* ========================================
   ORIGINAL IPHONE UI - APP CONTENT
   ======================================== */

// Override the generateAppContent function from main.js
window.generateAppContent = function(appName) {
    const appTemplates = {
        messages: generateMessagesApp,
        phone: generatePhoneApp,
        calendar: generateCalendarApp,
        photos: generatePhotosApp,
        camera: generateCameraApp,
        settings: generateSettingsApp,
        safari: generateSafariApp,
        notes: generateNotesApp,
        music: generateMusicApp,
        youtube: generateYouTubeApp,
        stocks: generateStocksApp,
        maps: generateMapsApp,
        weather: generateWeatherApp,
        reminders: generateRemindersApp,
        clock: generateClockApp,
        'game-center': generateGameCenterApp,
        newsstand: generateNewsstandApp,
        itunes: generateiTunesApp,
        'app-store': generateAppStoreApp,
        mail: generateMailApp
    };

    const generator = appTemplates[appName];
    if (generator) {
        return generator();
    } else {
        return generateDefaultApp(appName);
    }
};

// App Handlers for specific functionality
window.AppHandlers = {};

/**
 * Messages App
 */
function generateMessagesApp() {
    return `
        <div class="app-container messages-app">
            <div class="app-header">
                <div class="app-title">Messages</div>
            </div>
            <div class="app-content">
                <div class="messages-list">
                    <div class="message-bubble received">
                        <div>Hey! How are you doing?</div>
                    </div>
                    <div class="message-time">2:30 PM</div>
                    <div class="message-bubble sent">
                        <div>I'm good! Just checking out this iPhone UI recreation 📱</div>
                    </div>
                    <div class="message-bubble sent">
                        <div>It looks pretty authentic!</div>
                    </div>
                    <div class="message-time">2:32 PM</div>
                    <div class="message-bubble received">
                        <div>Wow, that's really cool! The attention to detail is impressive 👍</div>
                    </div>
                    <div class="message-bubble received">
                        <div>Does the home button work?</div>
                    </div>
                    <div class="message-time">2:35 PM</div>
                    <div class="message-bubble sent">
                        <div>Yes! Press it to go back to the home screen 🏠</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Phone App
 */
function generatePhoneApp() {
    return `
        <div class="app-container phone-app">
            <div class="app-header">
                <div class="app-title">Phone</div>
            </div>
            <div class="app-content">
                <div class="phone-tabs">
                    <div class="phone-tab">Favorites</div>
                    <div class="phone-tab">Recents</div>
                    <div class="phone-tab">Contacts</div>
                    <div class="phone-tab active">Keypad</div>
                    <div class="phone-tab">Voicemail</div>
                </div>
                <div class="dial-display" id="dial-display"></div>
                <div class="dialer-pad">
                    <button class="dial-button" data-number="1">1</button>
                    <button class="dial-button" data-number="2">2<br><small>ABC</small></button>
                    <button class="dial-button" data-number="3">3<br><small>DEF</small></button>
                    <button class="dial-button" data-number="4">4<br><small>GHI</small></button>
                    <button class="dial-button" data-number="5">5<br><small>JKL</small></button>
                    <button class="dial-button" data-number="6">6<br><small>MNO</small></button>
                    <button class="dial-button" data-number="7">7<br><small>PQRS</small></button>
                    <button class="dial-button" data-number="8">8<br><small>TUV</small></button>
                    <button class="dial-button" data-number="9">9<br><small>WXYZ</small></button>
                    <button class="dial-button" data-number="*">*</button>
                    <button class="dial-button" data-number="0">0<br><small>+</small></button>
                    <button class="dial-button" data-number="#">#</button>
                </div>
            </div>
        </div>
    `;
}

window.AppHandlers.phone = {
    init: function() {
        let dialedNumber = '';
        const display = document.getElementById('dial-display');
        const buttons = document.querySelectorAll('.dial-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const number = this.dataset.number;
                dialedNumber += number;
                display.textContent = dialedNumber;
                
                // Add haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
        });
    }
};

/**
 * Calendar App
 */
function generateCalendarApp() {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    let calendarHTML = `
        <div class="app-container calendar-app">
            <div class="app-header">
                <div class="app-title">Calendar</div>
            </div>
            <div class="app-content">
                <div class="calendar-header">${currentMonth}</div>
                <div class="calendar-grid">
    `;
    
    // Generate calendar days (simplified)
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    
    // Previous month days
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="calendar-day other-month">${25 + i}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() ? 'today' : '';
        calendarHTML += `<div class="calendar-day ${isToday}">${day}</div>`;
    }
    
    calendarHTML += `
                </div>
            </div>
        </div>
    `;
    
    return calendarHTML;
}

/**
 * Photos App
 */
function generatePhotosApp() {
    return `
        <div class="app-container photos-app">
            <div class="app-header">
                <div class="app-title">Photos</div>
            </div>
            <div class="app-content">
                <div class="photos-grid">
                    ${Array.from({length: 20}, (_, i) => `
                        <div class="photo-thumbnail" style="background: linear-gradient(${45 + i * 18}deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)});"></div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Camera App
 */
function generateCameraApp() {
    return `
        <div class="app-container camera-app">
            <div class="app-header">
                <div class="app-title">Camera</div>
            </div>
            <div class="app-content" style="background: #000; display: flex; align-items: center; justify-content: center;">
                <div style="color: white; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📷</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">Camera Viewfinder</div>
                    <div style="font-size: 14px; color: #ccc;">Tap to take a photo</div>
                    <button style="width: 70px; height: 70px; border-radius: 50%; background: white; border: 4px solid #333; margin-top: 30px; cursor: pointer;"></button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Settings App
 */
function generateSettingsApp() {
    return `
        <div class="app-container settings-app">
            <div class="app-header">
                <div class="app-title">Settings</div>
            </div>
            <div class="app-content">
                <div class="settings-section">
                    <div class="settings-group">
                        <div class="settings-item">
                            <div style="display: flex; align-items: center;">
                                <div class="settings-icon" style="background: #007aff;">📶</div>
                                <span>Wi-Fi</span>
                            </div>
                            <div class="settings-chevron">></div>
                        </div>
                        <div class="settings-item">
                            <div style="display: flex; align-items: center;">
                                <div class="settings-icon" style="background: #007aff;">📡</div>
                                <span>Bluetooth</span>
                            </div>
                            <div class="settings-chevron">></div>
                        </div>
                        <div class="settings-item">
                            <div style="display: flex; align-items: center;">
                                <div class="settings-icon" style="background: #007aff;">📱</div>
                                <span>Cellular</span>
                            </div>
                            <div class="settings-chevron">></div>
                        </div>
                    </div>
                </div>
                <div class="settings-section">
                    <div class="settings-group">
                        <div class="settings-item">
                            <div style="display: flex; align-items: center;">
                                <div class="settings-icon" style="background: #666;">⚙️</div>
                                <span>General</span>
                            </div>
                            <div class="settings-chevron">></div>
                        </div>
                        <div class="settings-item">
                            <div style="display: flex; align-items: center;">
                                <div class="settings-icon" style="background: #ff3b30;">🔊</div>
                                <span>Sounds</span>
                            </div>
                            <div class="settings-chevron">></div>
                        </div>
                        <div class="settings-item">
                            <div style="display: flex; align-items: center;">
                                <div class="settings-icon" style="background: #ff9500;">🔆</div>
                                <span>Display & Brightness</span>
                            </div>
                            <div class="settings-chevron">></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Safari App
 */
function generateSafariApp() {
    return `
        <div class="app-container safari-app">
            <div class="app-header">
                <div class="app-title">Safari</div>
            </div>
            <div class="app-content">
                <div class="safari-toolbar">
                    <button class="safari-button">←</button>
                    <button class="safari-button">→</button>
                    <input type="text" class="safari-url-bar" value="https://www.apple.com" readonly>
                    <button class="safari-button">↻</button>
                </div>
                <div class="safari-content">
                    <h1 style="color: #007aff; font-size: 24px; margin-bottom: 20px;">Welcome to Safari</h1>
                    <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
                        This is a recreation of the original iPhone Safari browser interface.
                    </p>
                    <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
                        The Safari app was one of the revolutionary features of the first iPhone, 
                        bringing desktop-class web browsing to mobile devices.
                    </p>
                    <h2 style="color: #007aff; font-size: 18px; margin: 20px 0 10px;">Bookmarks</h2>
                    <div style="background: #f0f0f0; padding: 10px; border-radius: 4px;">
                        <div style="padding: 8px; border-bottom: 1px solid #ddd;">📱 Apple</div>
                        <div style="padding: 8px; border-bottom: 1px solid #ddd;">🌐 Google</div>
                        <div style="padding: 8px;">📰 CNN</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Notes App
 */
function generateNotesApp() {
    return `
        <div class="app-container notes-app">
            <div class="app-header">
                <div class="app-title">Notes</div>
            </div>
            <div class="app-content">
                <div class="notes-list">
                    <div class="note-item">
                        <div class="note-title">iPhone UI Recreation</div>
                        <div class="note-preview">Working on recreating the original iPhone interface with HTML, CSS, and JavaScript. The water droplet wallpaper looks great!</div>
                        <div class="note-date">Today 2:15 PM</div>
                    </div>
                    <div class="note-item">
                        <div class="note-title">Grocery List</div>
                        <div class="note-preview">- Milk\n- Bread\n- Eggs\n- Apples\n- Coffee</div>
                        <div class="note-date">Yesterday 4:32 PM</div>
                    </div>
                    <div class="note-item">
                        <div class="note-title">Meeting Notes</div>
                        <div class="note-preview">Discussed the new project timeline and deliverables. Follow up with team by Friday.</div>
                        <div class="note-date">Monday 10:15 AM</div>
                    </div>
                    <div class="note-item">
                        <div class="note-title">Ideas</div>
                        <div class="note-preview">Random thoughts and creative ideas for future projects...</div>
                        <div class="note-date">Sunday 7:22 PM</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Music App
 */
function generateMusicApp() {
    return `
        <div class="app-container music-app">
            <div class="app-header">
                <div class="app-title">iPod</div>
            </div>
            <div class="app-content">
                <div class="music-tabs">
                    <div class="music-tab">Playlists</div>
                    <div class="music-tab">Artists</div>
                    <div class="music-tab">Songs</div>
                    <div class="music-tab active">Now Playing</div>
                </div>
                <div class="now-playing">
                    <div class="album-art"></div>
                    <div class="track-info">
                        <div class="track-title">iPhone Ringtone</div>
                        <div class="artist-name">Apple Inc.</div>
                    </div>
                    <div class="music-controls">
                        <button class="control-button">⏮</button>
                        <button class="control-button play">▶️</button>
                        <button class="control-button">⏭</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate simple apps with basic content
 */
function generateYouTubeApp() {
    return generateSimpleApp('YouTube', '📺', 'Featured videos and trending content would appear here.');
}

function generateStocksApp() {
    return generateSimpleApp('Stocks', '📈', 'Stock market data and your portfolio would be displayed here.');
}

function generateMapsApp() {
    return generateSimpleApp('Maps', '🗺️', 'Interactive maps with search and directions functionality.');
}

function generateWeatherApp() {
    return generateSimpleApp('Weather', '🌤️', 'Current weather conditions: 73°F\nSunny with light clouds');
}

function generateRemindersApp() {
    return generateSimpleApp('Reminders', '✅', 'Your to-do items and reminders would be listed here.');
}

function generateClockApp() {
    return generateSimpleApp('Clock', '🕐', 'World clock, alarms, stopwatch, and timer functionality.');
}

function generateGameCenterApp() {
    return generateSimpleApp('Game Center', '🎮', 'Social gaming features, achievements, and leaderboards.');
}

function generateNewsstandApp() {
    return generateSimpleApp('Newsstand', '📰', 'Your magazine and newspaper subscriptions.');
}

function generateiTunesApp() {
    return generateSimpleApp('iTunes', '🎵', 'Browse and purchase music, movies, and TV shows.');
}

function generateAppStoreApp() {
    return generateSimpleApp('App Store', '📱', 'Discover and download apps for your iPhone.');
}

function generateMailApp() {
    return generateSimpleApp('Mail', '✉️', 'Your email inbox and messaging would appear here.');
}

/**
 * Generate a simple app template
 */
function generateSimpleApp(title, icon, description) {
    return `
        <div class="app-container">
            <div class="app-header">
                <div class="app-title">${title}</div>
            </div>
            <div class="app-content" style="display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; padding: 40px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px;">${icon}</div>
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">${title}</div>
                <div style="font-size: 14px; color: #666; line-height: 1.6; max-width: 250px;">${description}</div>
            </div>
        </div>
    `;
}

/**
 * Default app template
 */
function generateDefaultApp(appName) {
    const displayName = appName.charAt(0).toUpperCase() + appName.slice(1).replace('-', ' ');
    return `
        <div class="app-container">
            <div class="app-header">
                <div class="app-title">${displayName}</div>
            </div>
            <div class="app-content">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading ${displayName}...</p>
                </div>
            </div>
        </div>
    `;
}

console.log('📱 iPhone Apps JavaScript loaded');
