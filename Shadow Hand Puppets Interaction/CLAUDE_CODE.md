# Shadow Hand Puppets - Claude Code Setup

## 📦 Project Structure
```
shadow-hand-puppets/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Hand detection logic
├── package.json        # Project configuration
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
└── CLAUDE_CODE.md     # This file
```

## 🚀 Quick Start with Claude Code

### 1. Initialize the Project
```bash
# Navigate to your projects folder
cd ~/projects

# Clone or copy this folder
cp -r shadow-hand-puppets ./my-shadow-puppets
cd my-shadow-puppets
```

### 2. Run the Project
```bash
# Option 1: Using http-server
npm start

# Option 2: Using live-server (auto-reload)
npm run dev

# Option 3: Using Python
python3 -m http.server 8080

# Then open: http://localhost:8080
```

### 3. Using Claude Code
```bash
# In your terminal, navigate to the project
cd shadow-hand-puppets

# Use Claude Code to make changes
claude "add a feature to save favorite gestures"
claude "change the shadow color to blue"
claude "add sound effects when gestures are detected"
```

## 💡 Claude Code Commands Examples

### Modify Existing Features
```bash
# Change gesture hold time
claude "make the gesture hold time 1 second instead of 2"

# Adjust shadow appearance
claude "make the shadow hands darker and more defined"

# Add new gestures
claude "add a bird gesture using thumb and index finger"
```

### Add New Features
```bash
# Add gesture counter
claude "add a counter that shows how many gestures I've performed"

# Add animations
claude "add particle effects when a gesture is recognized"

# Add sounds
claude "add sound effects for each animal"
```

### Debug and Fix
```bash
# Fix detection issues
claude "the rabbit gesture is too sensitive, make it more strict"

# Improve performance
claude "optimize the hand detection for better performance"
```

## 🎯 Key Files to Modify

### `script.js` - For:
- Gesture detection logic
- Camera settings
- Animation triggers
- Event handlers

### `style.css` - For:
- Shadow effects
- Screen transitions
- Visual styling
- Responsive design

### `index.html` - For:
- Screen structure
- Adding new screens
- Changing layout

## 🔧 Common Modifications

### Change Shadow Color
In `style.css`, find:
```css
#video {
    filter: grayscale(100%) contrast(200%) brightness(80%);
}
```

### Adjust Gesture Sensitivity
In `script.js`, find:
```javascript
const gestureHoldDuration: 2000, // Change this value
```

### Add New Animal
1. Add new screen in `index.html`
2. Add detection logic in `script.js` → `detectGesture()`
3. Add screen mapping in `triggerGestureAction()`

## 📱 Testing

### Local Testing
```bash
# Start server
npm start

# Open in browser
# Allow camera access
# Test gestures
```

### Mobile Testing
```bash
# Find your local IP
ipconfig getifaddr en0  # Mac
hostname -I             # Linux

# Access from phone
http://YOUR_IP:8080
```

## 🐛 Troubleshooting

### Camera Not Working
```bash
claude "add better error handling for camera permissions"
```

### Gestures Not Detecting
```bash
claude "add visual feedback showing which fingers are detected"
```

### Performance Issues
```bash
claude "reduce the hand detection frame rate to improve performance"
```

## 🎨 Customization Ideas

### Visual Themes
- "make a spooky Halloween theme"
- "add a colorful carnival theme"
- "create a minimalist black and white version"

### New Features
- "add a photo capture button to save hand puppet poses"
- "create a tutorial mode that teaches each gesture"
- "add a multiplayer mode for two people"

### Enhanced Interactions
- "make the animals animate when detected"
- "add voice narration for each animal"
- "create a story mode with sequential gestures"

## 📚 Resources

- **MediaPipe Hands**: https://google.github.io/mediapipe/solutions/hands
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Web Camera Access**: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

## 🤝 Working with Claude Code

Claude Code is great for:
- Quick iterations on features
- Debugging specific issues
- Adding new functionality
- Refactoring code
- Creating variations

Example workflow:
```bash
# 1. Test current version
npm start

# 2. Identify improvement
# "The elephant gesture needs to be easier"

# 3. Ask Claude Code
claude "make the elephant gesture less strict - it should trigger even if fingers aren't fully closed"

# 4. Test again
# Refresh browser and try

# 5. Iterate
claude "that's better but now it triggers too easily, find a middle ground"
```

Happy coding! 🎭✨
