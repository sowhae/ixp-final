# Shadow Hand Puppets Interactive Experience

## 📁 Files
- **index.html** - Main HTML structure
- **style.css** - All styling and animations
- **script.js** - Hand detection and interaction logic
- **assets/videos/** - Folder for animal animation videos

## 🎬 NEW: Video Animations!

After holding a gesture, the interaction now plays animated videos of each animal!

### 📹 Adding Your Videos

Place your animal animation videos in the `assets/videos/` folder with these exact names:
- `rabbit.mp4` - Rabbit animation
- `elephant.mp4` - Elephant animation
- `butterfly.mp4` - Butterfly animation
- `dog.mp4` - Dog animation

Videos should be in MP4 format for best compatibility.

## 🎭 Real-time Shadow Hands!

Your hands appear as **shadow puppets** in real-time on the spotlight screen! The camera feed is processed to create a high-contrast shadow effect, making your hands look like they're casting shadows on the wall.

## ✨ How It Works

1. **Start Screen** → Black screen fades in (1.5s)
2. **Spotlight Screen** → Your hands appear as shadows!
   - Camera feed is visible with shadow effect
   - Move your hands to see them in real-time
   - Make gestures and hold for 2 seconds
3. **Gesture Recognition** → When you hold a gesture:
   - Rabbit (peace sign) 🐰
   - Elephant (fist + thumb) 🐘
   - Butterfly (all fingers spread) 🦋
   - Dog (bent fingers) 🐕
4. **Animal Animation** → Shows Figma frame, then plays video!
   - Static frame appears (1s)
   - Video animation fades in and plays (7s)
   - Videos loop while displayed
5. **Auto-return** → Back to spotlight to try again!

## 🎨 Visual Effects

- **Shadow Effect**: Camera feed uses grayscale, high contrast, and multiply blend mode
- **Hand Drawing**: MediaPipe draws hand skeleton as dark shadows
- **Smooth Transitions**: All screens fade in/out smoothly
- **Hold Indicator**: Circular progress indicator when holding a gesture

## 🎮 Controls

- **Click hint icon** (top right) → View gesture guide
- **Click X** → Close gesture guide
- **Click back icon** → Return to spotlight from animal screen
- **Press 'd'** → Toggle debug mode (shows detection info)

## 🚀 How to Use

1. Place all three files in the same folder
2. Open `index.html` in a modern browser (Chrome, Edge, Safari)
3. Allow camera access when prompted
4. Wait for the spotlight screen
5. See your hands as shadows and start making gestures!

## 🔧 Technical Details

- Uses **MediaPipe Hands** for real-time hand tracking
- Detects up to 2 hands simultaneously
- Camera is mirrored for natural interaction
- Shadow effect uses CSS filters and blend modes
- Canvas overlay draws hand skeleton as shadows
- Gesture hold requires 2 seconds of steady position

## 📱 Responsive

Works on desktop, tablet, and mobile devices!

## 🐛 Troubleshooting

- **No camera?** Check browser permissions
- **Gestures not detecting?** Press 'd' for debug mode
- **Shadows not showing?** Make sure lighting is good
