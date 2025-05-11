# YouTube Focus Filter

YouTube Focus Filter is a Chrome extension designed to help users stay focused by hiding distracting entertainment videos on YouTube and highlighting educational content.

## Features

- **Comprehensive Keyword Filtering**: Filters out videos containing a wide range of entertainment-related keywords, such as "music", "comedy", "prank", "trailer", and more.
- **Educational Content Whitelisting**: Ensures that videos with educational keywords like "tutorial", "lesson", "course", and "study" remain visible.
- **Motivational Overlays**: Displays motivational messages over hidden videos to encourage users to stay focused.
- **Dynamic DOM Monitoring**: Uses a MutationObserver to detect and filter newly loaded content dynamically.
- **Customizable Messages**: Provides specific motivational messages for different types of distracting content.
- **Opacity and Interaction Control**: Reduces the opacity of filtered videos and disables user interaction with them.
- **Toggle Filter**: Allows users to enable or disable the distraction filter via the extension's popup interface.
- **Real-Time Updates**: Automatically applies or removes the filter when the toggle state is changed.
- **Chrome Storage Integration**: Saves the filter's enabled/disabled state using Chrome's `storage.sync` API.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing this project.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Use the toggle switch to enable or disable the distraction filter.
3. Reload the YouTube tab to apply the changes.

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