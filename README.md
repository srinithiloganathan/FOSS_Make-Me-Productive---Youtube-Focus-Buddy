# YouTube Focus Filter

YouTube Focus Filter is a Chrome extension designed to help users stay focused by hiding distracting entertainment videos on YouTube while highlighting educational content. It includes productivity tracking to help users understand and improve their learning habits.

## Features

- **Smart Content Filtering**: 
  - Automatically detects and filters non-educational content using an extensive keyword database
  - Preserves educational videos like tutorials, courses, and lectures
  - Real-time filtering of newly loaded content

- **Productivity Analytics**:
  - Tracks the number of educational vs non-educational videos viewed
  - Measures educational watch time
  - Calculates your personalized productivity score
  - Provides real-time progress visualization

- **User-Friendly Interface**:
  - Clean, modern popup interface with productivity statistics
  - Easy toggle switch to enable/disable filtering
  - Visual progress bars and percentages
  - Productivity score display

- **Motivational Features**:
  - Context-aware motivational messages for different types of distracting content
  - Elegant overlay design with blur effect
  - Encouraging messages to keep you focused on learning

- **Privacy-Focused**:
  - Works entirely in your browser
  - No data collection or external services
  - Settings sync across your Chrome instances

## Benefits

- **Enhanced Learning**: Focus only on educational content that adds value to your learning journey
- **Time Management**: Reduce time spent on entertainment videos during study/work hours
- **Progress Tracking**: Monitor your YouTube usage patterns and educational content consumption
- **Behavior Change**: Motivational messages help build better viewing habits
- **Productivity Boost**: Clear visualization of your productivity helps maintain focus

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing this project.

## Usage

1. Click the extension icon in your Chrome toolbar
2. Toggle "Make Me Productive" to enable/disable filtering
3. Visit YouTube to see the changes in action
4. Check your productivity stats in the popup window:
   - Number of filtered videos
   - Educational video count
   - Educational watch time
   - Productivity score
   - Educational content percentage

## File Structure

- Contains the logic for filtering YouTube videos.
     - Handles the popup toggle functionality.
   - The HTML structure and styling for the popup interface.
- Chrome extension manifest file.
     - Icon for the extension.

## How It Works

1. **Content Script**:
   - The `content.js` file runs on YouTube pages and scans for video elements.
   - It checks video titles against a list of distracting keywords and hides them if they are not educational.
   - Hidden videos are overlaid with motivational messages.

2. **Popup**:
   - The `popup.html` and `popup.js` files provide a user interface to enable or disable the filter.
   - The toggle state is saved using Chrome's `storage.sync` API.

3. **Manifest**:
   - The `manifest.json` file defines the extension's permissions, content scripts, and popup configuration.

## Customization

- **Distracting Keywords**: Modify the `entertainmentKeywords` array in `content.js` to add or remove keywords.
- **Educational Keywords**: Update the `educationalKeywords` array in `content.js` to refine what is considered educational content.
- **Motivational Messages**: Customize the messages in the `distractingKeywordMessages` object.

## Permissions

This extension requires the following permissions:
- **Storage**: To save the toggle state.
- **Scripting**: To inject scripts into YouTube pages.
- **Tabs**: To reload the active tab when the filter is toggled.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.

---

Hide distractions. Grow your focus.