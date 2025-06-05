// == Ultimate DevTools Protection System v2.0 ==
(function() {
    'use strict';

    // Enhanced Configuration
    const config = {
        protectionActive: true,
        nuclearMode: true,
        autoRefresh: true,
        forceOffline: true,
        maxRefreshes: 5,
        refreshDelay: 200,
        warningMessages: {
            devtoolsOpened: "⚠️ SECURITY ALERT: Developer tools detected!",
            offlineMode: "⚠️ OFFLINE MODE: Security measures activated",
            refreshNotice: "Page will refresh in {count} seconds...",
            tamperDetected: "⚠️ CODE TAMPERING DETECTED!"
        },
        redirectUrl: "about:blank",
        checkInterval: 100,
        sizeThreshold: 160,
        debuggerDelay: 500,
        maxDebuggerAttempts: 3,
        antiTamper: true,
        antiHook: true,
        antiProxy: true,
        cookieName: "__udps_secure"
    };

    // Advanced State Tracking
    const state = {
        devtoolsOpen: false,
        refreshCount: 0,
        isOffline: false,
        detectionActive: true,
        debuggerAttempts: 0,
        lastDetection: 0,
        initialized: false
    };

    // 1. Advanced DevTools Detection
    function detectDevTools() {
        try {
            // Method 1: Window Size Difference
            const widthThreshold = config.sizeThreshold + Math.random() * 30;
            const heightThreshold = config.sizeThreshold + Math.random() * 30;
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            const sizeDetected = widthDiff > widthThreshold || heightDiff > heightThreshold;

            // Method 2: Debugger Detection with timing
            let debuggerDetected = false;
            const start = performance.now();
            try {
                (function() {
                    const r = Math.random().toString(36).substring(7);
                    debugger;
                    return r;
                })();
            } catch (e) {
                debuggerDetected = e && e.stack && e.stack.includes("debugger");
            }
            const duration = performance.now() - start;
            const consoleTimeDetected = duration > 100 + Math.random() * 50;

            // Method 3: Function toString tampering
            const funcToString = Function.prototype.toString;
            const tamperDetected = config.antiTamper && 
                (funcToString.toString().indexOf('native') === -1 ||
                 funcToString.bind.toString().indexOf('native') === -1);

            // Method 4: Console hook detection
            let consoleHookDetected = false;
            if (config.antiHook) {
                try {
                    const consoleMethods = ['log', 'warn', 'error', 'info', 'debug'];
                    consoleHookDetected = consoleMethods.some(method => {
                        return console[method].toString().indexOf('native') === -1;
                    });
                } catch (e) {
                    consoleHookDetected = true;
                }
            }

            // Method 5: Proxy detection
            let proxyDetected = false;
            if (config.antiProxy) {
                try {
                    proxyDetected = window.Proxy && 
                        new Proxy({}, {}).toString() !== '[object Object]';
                } catch (e) {
                    proxyDetected = true;
                }
            }

            // Method 6: Performance API anomalies
            let perfAnomaly = false;
            try {
                const perfEntries = performance.getEntriesByType('resource');
                perfAnomaly = perfEntries.some(entry => 
                    entry.initiatorType === 'devtools' || 
                    entry.name.includes('chrome-devtools')
                );
            } catch (e) {}

            return sizeDetected || debuggerDetected || consoleTimeDetected || 
                   tamperDetected || consoleHookDetected || proxyDetected || perfAnomaly;
        } catch (e) {
            return true;
        }
    }

    // 2. Enhanced Auto-Refresh
    function triggerAutoRefresh() {
        if (!config.autoRefresh || state.refreshCount >= config.maxRefreshes) {
            if (config.forceOffline) activateOfflineMode();
            return;
        }

        state.refreshCount++;
        const countdown = Math.ceil(config.refreshDelay / 1000);
        const message = config.warningMessages.refreshNotice.replace('{count}', countdown);
        showWarning(message, config.refreshDelay);

        setTimeout(() => {
            try {
                // Clear storage and cookies
                localStorage.clear();
                sessionStorage.clear();
                document.cookie = `${config.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                
                // Add security token to prevent caching
                const token = Math.random().toString(36).substring(2, 15) + 
                              Math.random().toString(36).substring(2, 15);
                document.cookie = `${config.cookieName}=${token}; path=/; Secure; SameSite=Strict`;
                
                // Force reload with cache busting
                window.location.href = window.location.href.split('?')[0] + 
                    `?udps_refresh=${token}&t=${Date.now()}`;
            } catch (e) {
                window.location.reload(true);
            }
        }, config.refreshDelay);
    }

    // 3. Nuclear Offline Mode
    function activateOfflineMode() {
        if (!config.forceOffline || state.isOffline) return;

        state.isOffline = true;
        state.detectionActive = false;

        showWarning(config.warningMessages.offlineMode, 0);

        // Disable service workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => {
                for (let reg of regs) reg.unregister();
            });
        }

        // Disable network APIs
        window.fetch = function() {
            return Promise.reject(new Error("Network access disabled by security policy"));
        };
        window.XMLHttpRequest = function() {
            this.open = function() { throw new Error("XHR disabled by security policy"); };
            return this;
        };
        window.WebSocket = function() {
            throw new Error("WebSocket access disabled by security policy");
        };
        window.EventSource = function() {
            throw new Error("EventSource access disabled by security policy");
        };

        // Replace all images with placeholders
        document.querySelectorAll('img').forEach(img => {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0iI2VlZSI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSI+T0ZGTElORSBNT0RFPC90ZXh0Pjwvc3ZnPg==';
            img.style.filter = 'grayscale(100%)';
            img.style.opacity = '0.7';
        });

        // Disable all links
        document.querySelectorAll('a').forEach(a => {
            a.href = 'javascript:void(0)';
            a.onclick = e => {
                e.preventDefault();
                showWarning("Navigation disabled in offline mode");
            };
            a.style.color = '#999';
            a.style.textDecoration = 'line-through';
        });

        // Disable all forms
        document.querySelectorAll('form').forEach(form => {
            form.onsubmit = e => {
                e.preventDefault();
                showWarning("Form submission disabled in offline mode");
            };
            form.style.opacity = '0.5';
        });

        // Disable video/audio elements
        document.querySelectorAll('video, audio').forEach(media => {
            media.pause();
            media.controls = false;
            media.removeAttribute('src');
            media.load();
        });

        // Make page look "disabled"
        document.body.style.filter = 'grayscale(80%)';
        document.body.style.opacity = '0.9';
    }

    // 4. Advanced Warning System
    function showWarning(message, duration = 3000) {
        // Remove existing warnings
        document.querySelectorAll('.udps-warning-box').forEach(el => el.remove());

        const warningBox = document.createElement('div');
        warningBox.className = 'udps-warning-box';
        warningBox.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ff4444;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 20px rgba(255,0,0,0.3);
            z-index: 2147483647;
            max-width: 90%;
            text-align: center;
            font-family: 'Arial', sans-serif;
            animation: udpsFadeIn 0.3s forwards;
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        warningBox.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="white"/>
            </svg>
            <div>
                <strong style="font-size: 16px; display: block; margin-bottom: 5px;">SECURITY ALERT</strong>
                <p style="margin: 0; font-size: 14px;">${message}</p>
            </div>
        `;
        document.body.appendChild(warningBox);

        if (duration > 0) {
            setTimeout(() => {
                warningBox.style.animation = "udpsFadeOut 0.3s forwards";
                setTimeout(() => warningBox.remove(), 300);
            }, duration);
        }
    }

    // 5. Anti-Tampering Measures
    function setupAntiTamper() {
        if (!config.antiTamper) return;

        // Protect critical functions
        const protectFunction = (fn) => {
            try {
                Object.defineProperty(fn, 'toString', {
                    value: function() { return 'function() { [native code] }'; },
                    writable: false,
                    configurable: false
                });
            } catch (e) {}
        };

        protectFunction(Function.prototype.toString);
        protectFunction(Function.prototype.bind);
        protectFunction(Object.defineProperty);
        protectFunction(Object.freeze);

        // Monitor critical objects
        const criticalObjects = [window, document, console, Object, Function];
        criticalObjects.forEach(obj => {
            setInterval(() => {
                try {
                    if (obj.toString().indexOf('native') === -1) {
                        showWarning(config.warningMessages.tamperDetected);
                        triggerAutoRefresh();
                    }
                } catch (e) {
                    showWarning(config.warningMessages.tamperDetected);
                    triggerAutoRefresh();
                }
            }, 5000);
        });
    }

    // 6. Style Injection
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes udpsFadeIn {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes udpsFadeOut {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
            .udps-warning-box {
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    // 7. Continuous Monitoring
    function startMonitoring() {
        // Interval-based detection
        const monitoringInterval = setInterval(() => {
            if (!state.detectionActive) {
                clearInterval(monitoringInterval);
                return;
            }

            if (detectDevTools() && !state.devtoolsOpen) {
                state.devtoolsOpen = true;
                state.lastDetection = Date.now();
                showWarning(config.warningMessages.devtoolsOpened, 1500);
                triggerAutoRefresh();
            } else if (!detectDevTools() && 
                      Date.now() - state.lastDetection > 2000) {
                state.devtoolsOpen = false;
            }
        }, config.checkInterval);

        // Frame-based detection
        (function monitorFrame() {
            if (!state.detectionActive) return;
            
            if (detectDevTools()) {
                if (!state.devtoolsOpen) {
                    state.devtoolsOpen = true;
                    state.lastDetection = Date.now();
                    showWarning(config.warningMessages.devtoolsOpened, 1500);
                    triggerAutoRefresh();
                }
            } else if (Date.now() - state.lastDetection > 2000) {
                state.devtoolsOpen = false;
            }
            
            requestAnimationFrame(monitorFrame);
        })();

        // Debugger protection loop
        (function debuggerProtection() {
            if (!state.detectionActive) return;
            
            try {
                if (state.debuggerAttempts < config.maxDebuggerAttempts) {
                    (function() {
                        debugger;
                    })();
                    state.debuggerAttempts++;
                }
            } catch (e) {}
            
            setTimeout(debuggerProtection, config.debuggerDelay);
        })();
    }

    // 8. Event Listeners
    function setupEventListeners() {
        // Initial detection after load
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (detectDevTools()) {
                    state.devtoolsOpen = true;
                    triggerAutoRefresh();
                }
                state.initialized = true;
            }, 1500);
        });

        // Hash change detection
        window.addEventListener('hashchange', () => {
            if (state.detectionActive && detectDevTools()) {
                triggerAutoRefresh();
            }
        });

        // Visibility change detection
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                setTimeout(() => {
                    if (detectDevTools()) {
                        triggerAutoRefresh();
                    }
                }, 500);
            }
        });

        // Mouse right-click prevention
        document.addEventListener('contextmenu', (e) => {
            if (detectDevTools()) {
                e.preventDefault();
                showWarning("Context menu disabled for security");
            }
        });

        // Keyboard shortcuts prevention
        document.addEventListener('keydown', (e) => {
            if (detectDevTools() && 
                (e.ctrlKey || e.metaKey) && 
                (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'U' || e.key === 'S')) {
                e.preventDefault();
                showWarning("Keyboard shortcut disabled for security");
            }
        });
    }

    // 9. Initialization
    function init() {
        if (!config.protectionActive) return;
        
        injectStyles();
        setupAntiTamper();
        setupEventListeners();
        startMonitoring();
        
        // Final lockdown
        Object.freeze(config);
        Object.defineProperty(state, 'detectionActive', {
            writable: true,
            configurable: false
        });
        Object.defineProperty(state, 'isOffline', {
            writable: true,
            configurable: false
        });
    }

    // Start the protection
    init();
})();