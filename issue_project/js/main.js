// Course platform main script - contains a bug that causes crash

// Course data (embedded directly to avoid need for server)
const coursesData = {
    "courses": [
        {
            "id": 1,
            "title": "Python Fundamentals to Advanced",
            "instructor": "Prof. Zhang",
            "duration": "40 hours",
            "level": "Beginner",
            "price": "$299",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%234CAF50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' fill='white' font-weight='bold'%3EPython%3C/text%3E%3C/svg%3E"
        },
        {
            "id": 2,
            "title": "JavaScript Full Stack Development",
            "instructor": "Prof. Li",
            "duration": "60 hours",
            "level": "Intermediate",
            "price": "$399",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%232196F3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='white' font-weight='bold'%3EJavaScript%3C/text%3E%3C/svg%3E"
        },
        {
            "id": 3,
            "title": "Data Structures and Algorithms",
            "instructor": "Prof. Wang",
            "duration": "50 hours",
            "level": "Intermediate",
            "price": "$499",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23FF9800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='white' font-weight='bold'%3EAlgorithm%3C/text%3E%3C/svg%3E"
        },
        {
            "id": 4,
            "title": "React Framework Introduction",
            "instructor": "Prof. Zhao",
            "duration": "35 hours",
            "level": "Intermediate",
            "price": "$349",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%2300BCD4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' fill='white' font-weight='bold'%3EReact%3C/text%3E%3C/svg%3E"
        }
    ]
};

// Global error handler - catch unhandled exceptions and display alert
window.addEventListener('error', function(event) {
    // Display friendly error message
    alert('💥 Page Crashed!\n\nError: ' + event.message + '\n\nLocation: ' + event.filename + ' (line ' + event.lineno + ')\n\nPlease check browser console (F12) for more details.');
    
    // Prevent browser's default error handling
    event.preventDefault();
});

// Execute after page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

// Load course data
function loadCourses() {
    const container = document.getElementById('courses-container');
    
    // Show loading message
    container.innerHTML = '<div class="loading">Loading courses...</div>';
    
    // Use embedded data, simulate async loading
    setTimeout(() => {
        // Clear container
        container.innerHTML = '';
        
        // Render course cards
        coursesData.courses.forEach(course => {
            const courseCard = createCourseCard(course);
            container.appendChild(courseCard);
        });
    }, 500);
}

// Create course card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <div class="course-info">
                <div class="course-info-item">👨‍🏫 Instructor: ${course.instructor}</div>
                <div class="course-info-item">⏰ Duration: ${course.duration}</div>
                <div class="course-info-item">📊 Level: ${course.level}</div>
            </div>
            <div class="course-price">${course.price}</div>
            <button class="btn-detail" onclick="showCourseDetail(${course.id})">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// ⚠️ This function contains a BUG - it will cause the page to crash!
// Bug Type: Crash/Exception - attempting to access a non-existent DOM element
function showCourseDetail(courseId) {
    console.log('User clicked on course ID:', courseId);
    
    // Alert user that bug is about to be triggered
    alert('⚠️ Warning: You clicked the "View Details" button!\n\nThe code will now attempt to access a non-existent DOM element,\nwhich will cause JavaScript to crash.\n\nPlease open Developer Tools (F12) to view console error messages.\n\nClick OK to trigger the bug...');
    
    // ❌ BUG LOCATION: Attempting to get a non-existent element
    // HTML does not have an element with id="course-detail-panel"
    const detailPanel = document.getElementById('course-detail-panel');
    
    // ❌ When detailPanel is null, this line will throw an exception:
    // Uncaught TypeError: Cannot set property 'innerHTML' of null
    detailPanel.innerHTML = `
        <h2>Course Details</h2>
        <p>Course ID: ${courseId}</p>
        <p>Loading details...</p>
        <button onclick="closeDetail()">Close</button>
    `;
    
    // This line will never execute because the code already crashed above
    detailPanel.classList.remove('hidden');
    
    // ❌ This alert will never show because the code already crashed above
    alert('If you see this message, the bug has been fixed!');
}

// Close detail panel (this function will never be called because the above function crashes)
function closeDetail() {
    const detailPanel = document.getElementById('course-detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }
}

/* 
=== BUG EXPLANATION ===

Problem: Clicking any "View Details" button will cause JavaScript to crash

Trigger Conditions:
1. User clicks "View Details" button on any course card
2. showCourseDetail(courseId) function is called

Crash Reason:
- showCourseDetail() function attempts to get element with id="course-detail-panel"
- But this element doesn't exist in index.html (intentionally removed)
- document.getElementById() returns null
- Attempting to set null.innerHTML throws a TypeError exception
- Entire JavaScript execution stops, other page functions become unusable

Browser Console Error Message:
Uncaught TypeError: Cannot set property 'innerHTML' of null
    at showCourseDetail (main.js:XX)
    at HTMLButtonElement.onclick (index.html:XX)

Fix Methods (three options):

Method 1: Add null check
function showCourseDetail(courseId) {
    const detailPanel = document.getElementById('course-detail-panel');
    if (!detailPanel) {
        console.error('Detail panel element does not exist!');
        return;
    }
    detailPanel.innerHTML = ...;
}

Method 2: Add missing element in HTML
Add inside <main> tag in index.html:
<div id="course-detail-panel" class="detail-panel hidden"></div>

Method 3: Use try-catch to catch exception
function showCourseDetail(courseId) {
    try {
        const detailPanel = document.getElementById('course-detail-panel');
        detailPanel.innerHTML = ...;
    } catch (error) {
        console.error('Failed to show details:', error);
        alert('Sorry, unable to display course details');
    }
}
*/
