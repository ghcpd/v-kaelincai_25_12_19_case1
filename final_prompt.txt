# Bug Fix Task Prompt

## Task Overview

You are provided with a course platform project that contains a **Crash/Exception** bug. Your task is to analyze the buggy project, identify the root cause, and create a **fixed version** as a new project.

## Project Context

This is an online course platform with the following features:
- Displays a grid of course cards
- Each course card shows: title, instructor, duration, level, price, and image
- Each course has a "View Details" button
- Currently, clicking the "View Details" button causes the application to crash

## Your Assignment

1. **Analyze the existing project** in the `issue_project` folder
   - Examine all files: HTML, CSS, and JavaScript
   - Identify what happens when users click "View Details"
   - Understand why the application crashes

2. **Identify the root cause**
   - Determine what the code is trying to do
   - Find what is missing or incorrect
   - Understand the relationship between the HTML structure and JavaScript logic

3. **Create a fixed version**
   - Create a **new project folder** named `issue_project_fixed` with the following structure:
   ```
   issue_project_fixed/
   ├── index.html          # Fixed HTML file with corrected structure
   ├── style.css           # CSS file (copy from original or maintain styling)
   ├── script.js           # Fixed JavaScript with proper DOM handling
   └── README.md           # (Optional) Document the fixes made
   ```
   - Copy all necessary files from the original project
   - Implement appropriate fixes to resolve the crash
   - Ensure the "View Details" functionality works properly
   - The fixed version should display course details when the button is clicked

4. **Requirements for the fixed version**
   - Must be a separate project (do not modify the original)
   - Should maintain the same visual design and layout
   - Must handle the "View Details" click without crashing
   - Should provide appropriate user feedback when viewing details
   - Include proper error handling where needed

5. **Deliverables**
   - A new folder `issue_project_fixed` with all fixed files in the following structure:
   ```
   issue_project_fixed/
   ├── index.html          # Main HTML file with fixed structure
   ├── style.css           # Stylesheet for the course platform
   ├── script.js           # Fixed JavaScript with corrected logic
   └── assets/             # (Optional) Images or other resources if needed
       └── ...
   ```
   - The fixed version should be fully functional
   - Users should be able to view course details without any crashes
   - All files should be properly organized and documented

## Important Notes

- **Do not modify** the original `issue_project` folder - it serves as the buggy reference
- **Do create** a new folder for the fixed version
- Focus on making the application robust and user-friendly
- Consider best practices for DOM manipulation and error handling
- Ensure all features work correctly after the fix

## Success Criteria

Your fix is successful when:
- [ ] Clicking "View Details" button no longer causes crashes
- [ ] Course details are properly displayed to users
- [ ] The application handles edge cases gracefully
- [ ] All original functionality is preserved
- [ ] Code follows good error handling practices

## Getting Started

Begin by examining the `issue_project` folder structure and running the application to observe the bug firsthand. Then proceed with your analysis and implementation of the fixed version.
