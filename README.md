# Make Me Productive – YouTube Focus Buddy

**Make Me Productive – YouTube Focus Buddy** is a Chrome extension that helps you stay focused and productive on YouTube by automatically hiding distracting entertainment videos—including Shorts, ads, and breaking news sections—while highlighting educational content. It also tracks your productivity and provides motivational overlays to encourage better viewing habits.

## Features

- **Smart Content Filtering**:
  - Detects and hides non-educational content using an extensive keyword database
  - Filters out entertainment, Shorts, ads, and breaking news sections
  - Preserves educational videos such as tutorials, courses, and lectures
  - Real-time filtering of newly loaded and dynamically added content

- **Productivity Analytics**:
  - Tracks the number of educational vs. non-educational videos shown
  - Measures educational and entertainment watch time
  - Calculates a personalized productivity score based on your viewing habits
  - Provides real-time progress and score updates

- **Motivational Overlays**:
  - Displays context-aware motivational messages over distracting videos
  - Elegant overlay design with blur and fade effects
  - Encourages you to focus on learning and personal growth

- **User-Friendly Interface**:
  - Modern popup with productivity statistics and progress bars
  - Easy toggle switch to enable or disable filtering
  - Visual display of educational content percentage and productivity score

- **Privacy-Focused**:
  - All processing happens locally in your browser
  - No data collection or external services
  - Settings sync across your Chrome instances

## Benefits

- **Enhanced Learning**: Focus on educational content that adds value to your goals
- **Time Management**: Reduce time spent on entertainment and distractions
- **Progress Tracking**: Monitor your YouTube usage and educational content consumption
- **Behavior Change**: Motivational overlays help build better viewing habits
- **Productivity Boost**: Clear visualization of your productivity helps maintain focus

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing this project.

## Usage

1. Click the extension icon in your Chrome toolbar.
2. Toggle "Make Me Productive" to enable or disable filtering.
3. Visit YouTube to see the changes in action.
4. Check your productivity stats in the popup window:
   - Number of filtered videos
   - Educational video count
   - Educational and entertainment watch time
   - Productivity score
   - Educational content percentage

## File Structure

- `content.js`: Main logic for filtering YouTube videos, handling overlays, and tracking stats.
- `popup.html` / `popup.js`: User interface for toggling the filter and viewing productivity stats.
- `manifest.json`: Chrome extension manifest and permissions.
- `icon.png`: Extension icon.

## How It Works

1. **Content Script**:
   - Scans for video elements, including breaking news and Shorts.
   - Hides distracting videos and overlays them with motivational messages.
   - Tracks stats and watch time for educational and entertainment content.

2. **Popup**:
   - Lets you enable or disable the filter.
   - Displays real-time productivity statistics.

3. **Manifest**:
   - Defines extension permissions, content scripts, and popup configuration.

## Customization

- **Distracting Keywords**: Edit the `entertainmentKeywords` array in `content.js`.
- **Educational Keywords**: Edit the `educationalKeywords` array in `content.js`.
- **Motivational Messages**: Customize the `distractingKeywordMessages` object in `content.js`.

## Permissions

This extension requires:
- **Storage**: To save settings and stats.
- **Tabs**: To reload the active tab when toggling the filter.

## License

MIT License. Free to use, modify, and distribute.