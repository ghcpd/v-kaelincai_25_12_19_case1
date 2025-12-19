# Course Platform - Crash/Exception Bug Demo Project

## Project Overview

This is a demonstration project for a **Crash/Exception** type bug in an online course platform.

## Bug Description

**Bug Type**: Crash/Exception

**Trigger Scenario**: Clicking "View Details" button causes page crash

### Problem Manifestation

1. User clicks "View Details" button on any course card
2. First alert warns the user about the incoming bug
3. JavaScript crashes with error in browser console
4. Second alert displays crash notification with error details
5. Other interactive features become unusable

### Technical Cause

JavaScript code attempts to access a non-existent DOM element:

```javascript
// In showCourseDetail() function in js/main.js
const detailPanel = document.getElementById('course-detail-panel');
detailPanel.innerHTML = '...';  // ❌ detailPanel is null, crash occurs here
```

Issue: HTML file does not contain an element with `id="course-detail-panel"`

## How to Run

### Method 1: Using VS Code Live Server (Recommended)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 2: Direct Open

Double-click `index.html` file to open in browser directly

## How to Reproduce the Bug

1. Open the page (displays 4 course cards with embedded SVG images)
2. Click "View Details" button on any course
3. First alert appears warning about the bug trigger
4. Click OK to proceed
5. Page crashes and second alert displays crash details
6. Open browser Developer Tools (F12)
7. Check Console tab
8. You'll see error: `Uncaught TypeError: Cannot set property 'innerHTML' of null`

## Recent Updates

- **Embedded Course Data**: Course data is now directly embedded in JavaScript (no external JSON file needed)
- **SVG Images**: Uses inline SVG data URIs for instant loading without external dependencies
- **Alert Notifications**: Added warning alert before crash and error alert after crash for clear demonstration
- **Global Error Handler**: Catches unhandled exceptions and displays friendly error messages

## Bug Fix Methods

### Method 1: Add Null Check (Recommended)

Add a check in the `showCourseDetail()` function in [js/main.js](js/main.js):

```javascript
function showCourseDetail(courseId) {
    const detailPanel = document.getElementById('course-detail-panel');
    
    // Add null check
    if (!detailPanel) {
        console.error('Detail panel element does not exist!');
        alert('Sorry, unable to display course details');
        return;
    }
    
    detailPanel.innerHTML = `...`;
}
```

### Method 2: Add Missing HTML Element

Add inside `<main>` tag in [index.html](index.html):

```html
<div id="course-detail-panel" class="detail-panel hidden"></div>
```

### Method 3: Use try-catch to Catch Exception

```javascript
function showCourseDetail(courseId) {
    try {
        const detailPanel = document.getElementById('course-detail-panel');
        detailPanel.innerHTML = `...`;
        detailPanel.classList.remove('hidden');
    } catch (error) {
        console.error('Failed to show details:', error);
        alert('Sorry, unable to display course details');
    }
}
```

## Project Structure

```
issue_project/
├── index.html           # Main page (missing detail panel element)
├── README.md            # Project documentation
├── css/
│   └── style.css        # Stylesheet
├── data/
│   └── courses.json     # Course data (not used, kept for reference)
└── js/
    └── main.js          # Main script (contains crashing code)
```

## Key Learning Points

This bug demonstrates:

1. **Null Pointer Exception**: Accessing non-existent DOM elements
2. **Defensive Programming**: Always check if elements exist before using them
3. **Error Handling**: Use try-catch or conditional checks to handle potential errors
4. **Code Robustness**: Never assume elements will always exist
5. **User Feedback**: Provide clear error messages through alerts and console logs

## Important Notes

- This is a **Bug Demonstration** project, intentionally containing buggy code
- In real development, use one of the fix methods above to avoid such crashes
- Open browser Developer Tools for better observation of error messages
- The bug is clearly indicated by two alerts: one before crash and one after
- No external server needed - works by simply opening the HTML file
