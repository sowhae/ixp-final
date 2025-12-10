// ================================
// APP STATE
// ================================

const state = {
    currentScreen: 'start',
    cameraActive: false,
    gestureHoldStart: null,
    currentGesture: null,
    gestureHoldDuration: 2000, // 2 seconds
    debugMode: false
};

// ================================
// DOM ELEMENTS
// ================================

const elements = {
    startScreen: document.getElementById('startScreen'),
    spotlightScreen: document.getElementById('spotlightScreen'),
    gestureIconsScreen: document.getElementById('gestureIconsScreen'),
    rabbitScreen: document.getElementById('rabbitScreen'),
    elephantScreen: document.getElementById('elephantScreen'),
    butterflyScreen: document.getElementById('butterflyScreen'),
    wolfScreen: document.getElementById('wolfScreen'),
    animationScreen: document.getElementById('animationScreen'),
    hintIcon: document.getElementById('hintIcon'),
    gestureIndicator: document.getElementById('gestureIndicator'),
    debugInfo: document.getElementById('debugInfo'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    video: document.getElementById('video'),
    videoContainer: document.getElementById('videoContainer'),
    canvas: document.getElementById('canvas')
};

// ================================
// MEDIAPIPE HANDS SETUP
// ================================

let hands;
let camera;

function initializeHandDetection() {
    hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    hands.onResults(onHandsResults);

    camera = new Camera(elements.video, {
        onFrame: async () => {
            if (state.cameraActive) {
                await hands.send({ image: elements.video });
            }
        },
        width: 1280,
        height: 720
    });
}

// ================================
// HAND GESTURE DETECTION
// ================================

function onHandsResults(results) {
    // Clear canvas
    const canvasCtx = elements.canvas.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    
    // Set canvas size to match video
    elements.canvas.width = elements.video.videoWidth;
    elements.canvas.height = elements.video.videoHeight;
    
    // Draw hand landmarks as shadows
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
            drawHandShadow(canvasCtx, landmarks);
        }
        
        // Detect gesture from first hand
        const gesture = detectGesture(results.multiHandLandmarks[0]);
        
        if (state.debugMode) {
            updateDebugInfo(gesture, results.multiHandLandmarks[0]);
        }
        
        // Only detect gestures on spotlight screen
        if (state.currentScreen === 'spotlight') {
            if (gesture && gesture !== 'none') {
                handleGestureHold(gesture);
            } else {
                resetGestureHold();
            }
        }
    } else {
        resetGestureHold();
    }
    
    canvasCtx.restore();
}

function drawHandShadow(ctx, landmarks) {
    // Draw connections between landmarks
    const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
        [0, 5], [5, 6], [6, 7], [7, 8], // Index
        [0, 9], [9, 10], [10, 11], [11, 12], // Middle
        [0, 13], [13, 14], [14, 15], [15, 16], // Ring
        [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
        [5, 9], [9, 13], [13, 17] // Palm
    ];
    
    // Draw filled hand shape
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.lineWidth = 10;
    
    // Draw connections
    for (const [start, end] of connections) {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];
        
        ctx.beginPath();
        ctx.moveTo(startPoint.x * ctx.canvas.width, startPoint.y * ctx.canvas.height);
        ctx.lineTo(endPoint.x * ctx.canvas.width, endPoint.y * ctx.canvas.height);
        ctx.stroke();
    }
    
    // Draw landmark points
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(
            landmark.x * ctx.canvas.width,
            landmark.y * ctx.canvas.height,
            8,
            0,
            2 * Math.PI
        );
        ctx.fill();
    }
}

// ================================
// GESTURE DETECTION LOGIC
// ================================

function detectGesture(landmarks) {
    // Get key finger positions
    const thumb = landmarks[4];
    const index = landmarks[8];
    const middle = landmarks[12];
    const ring = landmarks[16];
    const pinky = landmarks[20];
    const wrist = landmarks[0];

    // Calculate finger states (extended or not)
    const thumbExtended = thumb.y < landmarks[3].y;
    const indexExtended = index.y < landmarks[6].y;
    const middleExtended = middle.y < landmarks[10].y;
    const ringExtended = ring.y < landmarks[14].y;
    const pinkyExtended = pinky.y < landmarks[18].y;

    // Rabbit: Index and middle fingers up (peace sign)
    if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
        const fingerDistance = Math.abs(index.x - middle.x);
        if (fingerDistance > 0.05) {
            return 'rabbit';
        }
    }

    // Elephant: Fist with thumb extended (elephant trunk)
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbExtended) {
        return 'elephant';
    }

    // Butterfly: All fingers spread wide
    if (thumbExtended && indexExtended && middleExtended && ringExtended && pinkyExtended) {
        const spread = Math.abs(pinky.x - index.x);
        if (spread > 0.15) {
            return 'butterfly';
        }
    }

    // Wolf/Dog: Hand profile with bent fingers
    const handTilt = Math.abs(thumb.y - pinky.y);
    if (!indexExtended && !middleExtended && handTilt > 0.15) {
        return 'wolf';
    }

    return 'none';
}

// ================================
// GESTURE HOLD MANAGEMENT
// ================================

function handleGestureHold(gesture) {
    if (state.currentGesture !== gesture) {
        state.currentGesture = gesture;
        state.gestureHoldStart = Date.now();
        showGestureIndicator();
    } else {
        const holdTime = Date.now() - state.gestureHoldStart;
        if (holdTime >= state.gestureHoldDuration) {
            triggerGestureAction(gesture);
            resetGestureHold();
        }
    }
}

function resetGestureHold() {
    state.currentGesture = null;
    state.gestureHoldStart = null;
    hideGestureIndicator();
}

function showGestureIndicator() {
    elements.gestureIndicator.classList.add('active');
}

function hideGestureIndicator() {
    elements.gestureIndicator.classList.remove('active');
}

// ================================
// GESTURE ACTION TRIGGERS
// ================================

function triggerGestureAction(gesture) {
    const screenMap = {
        'rabbit': 'rabbit',
        'elephant': 'elephant',
        'butterfly': 'butterfly',
        'wolf': 'wolf'
    };

    const targetScreen = screenMap[gesture];
    if (targetScreen) {
        switchScreen(targetScreen);
    }
}

// ================================
// SCREEN MANAGEMENT
// ================================

function switchScreen(screenName) {
    // Hide all screens
    Object.values(elements).forEach(el => {
        if (el && el.classList && el.classList.contains('screen')) {
            el.classList.remove('active');
        }
    });

    // Show target screen
    const screenMap = {
        'start': elements.startScreen,
        'spotlight': elements.spotlightScreen,
        'gestureIcons': elements.gestureIconsScreen,
        'rabbit': elements.rabbitScreen,
        'elephant': elements.elephantScreen,
        'butterfly': elements.butterflyScreen,
        'wolf': elements.wolfScreen,
        'animation': elements.animationScreen
    };

    const targetElement = screenMap[screenName];
    if (targetElement) {
        targetElement.classList.add('active');
        state.currentScreen = screenName;

        // Show/hide video based on screen
        if (screenName === 'spotlight') {
            elements.videoContainer.classList.add('visible');
        } else if (screenName === 'gestureIcons') {
            elements.videoContainer.classList.remove('visible');
        } else if (['rabbit', 'elephant', 'butterfly', 'wolf'].includes(screenName)) {
            elements.videoContainer.classList.remove('visible');
            // Auto-return to spotlight after 3 seconds
            setTimeout(() => {
                switchScreen('spotlight');
            }, 3000);
        }
    }
}

// ================================
// DEBUG INFO
// ================================

function updateDebugInfo(gesture, landmarks) {
    const thumb = landmarks[4];
    const index = landmarks[8];
    elements.debugInfo.innerHTML = `
        Current Gesture: ${gesture}<br>
        Thumb Y: ${thumb.y.toFixed(3)}<br>
        Index Y: ${index.y.toFixed(3)}<br>
        Screen: ${state.currentScreen}<br>
        Camera: ${state.cameraActive ? 'Active' : 'Inactive'}
    `;
}

// ================================
// EVENT LISTENERS
// ================================

// Hint icon - show gesture guide
elements.hintIcon.addEventListener('click', () => {
    switchScreen('gestureIcons');
});

// Close gesture icons screen
document.querySelectorAll('#gestureIconsScreen .close-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        switchScreen('spotlight');
    });
});

// Back icons on animal screens
document.querySelectorAll('.animal-screen .back-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        switchScreen('spotlight');
    });
});

// Keyboard shortcuts for debugging
document.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        state.debugMode = !state.debugMode;
        elements.debugInfo.classList.toggle('show', state.debugMode);
    }
});

// ================================
// INITIALIZE APP
// ================================

async function init() {
    // Start with black screen, then transition to spotlight
    setTimeout(() => {
        switchScreen('spotlight');
        elements.loadingOverlay.classList.add('hidden');
    }, 1500);

    // Initialize camera and hand detection
    try {
        await initializeHandDetection();
        await camera.start();
        state.cameraActive = true;
        
        // Show video container when on spotlight
        setTimeout(() => {
            if (state.currentScreen === 'spotlight') {
                elements.videoContainer.classList.add('visible');
            }
        }, 2000);
    } catch (error) {
        console.error('Camera initialization failed:', error);
        elements.loadingOverlay.innerHTML = '<div>Camera access required.<br>Please enable camera and refresh.</div>';
    }
}

// Start the app
init();
