// Course platform main script - FIXED VERSION
// Bug fix: Added null checking and proper error handling for DOM element access

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
            "description": "Learn Python from scratch to advanced concepts including OOP, decorators, and async programming.",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%234CAF50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' fill='white' font-weight='bold'%3EPython%3C/text%3E%3C/svg%3E"
        },
        {
            "id": 2,
            "title": "JavaScript Full Stack Development",
            "instructor": "Prof. Li",
            "duration": "60 hours",
            "level": "Intermediate",
            "price": "$399",
            "description": "Master JavaScript for both frontend and backend development with modern frameworks.",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%232196F3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='white' font-weight='bold'%3EJavaScript%3C/text%3E%3C/svg%3E"
        },
        {
            "id": 3,
            "title": "Data Structures and Algorithms",
            "instructor": "Prof. Wang",
            "duration": "50 hours",
            "level": "Intermediate",
            "price": "$499",
            "description": "Deep dive into essential data structures and algorithm optimization techniques.",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23FF9800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='white' font-weight='bold'%3EAlgorithm%3C/text%3E%3C/svg%3E"
        },
        {
            "id": 4,
            "title": "React Framework Introduction",
            "instructor": "Prof. Zhao",
            "duration": "35 hours",
            "level": "Intermediate",
            "price": "$349",
            "description": "Learn React basics and build modern interactive user interfaces.",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%2300BCD4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' fill='white' font-weight='bold'%3EReact%3C/text%3E%3C/svg%3E"
        }
    ]
};

// Global error handler - catch unhandled exceptions
window.addEventListener('error', function(event) {
    // Display friendly error message
    alert('An error occurred:\n\n' + event.message + '\n\nPlease check browser console (F12) for more details.');
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
    
    if (!container) {
        console.error('Courses container not found in DOM');
        return;
    }
    
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

// ✅ FIXED: This function now includes proper null checking and error handling
function showCourseDetail(courseId) {
    try {
        console.log('User clicked on course ID:', courseId);
        
        // Find the detail panel element
        const detailPanel = document.getElementById('course-detail-panel');
        
        // FIX: Check if element exists before attempting to access it
        if (!detailPanel) {
            console.error('Detail panel element does not exist in DOM');
            alert('Sorry, unable to display course details. Please refresh the page.');
            return;
        }
        
        // Find the course data
        const course = coursesData.courses.find(c => c.id === courseId);
        
        if (!course) {
            console.error('Course not found with ID:', courseId);
            alert('Sorry, course details not found.');
            return;
        }
        
        // Update detail panel content
        const detailBody = document.getElementById('detail-body');
        if (detailBody) {
            detailBody.innerHTML = `
                <img src="${course.image}" alt="${course.title}" class="detail-image">
                <h2>${course.title}</h2>
                <div class="detail-info">
                    <p><strong>Instructor:</strong> ${course.instructor}</p>
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Level:</strong> ${course.level}</p>
                    <p><strong>Price:</strong> ${course.price}</p>
                </div>
                <div class="detail-description">
                    <h3>Description</h3>
                    <p>${course.description}</p>
                </div>
                <button class="btn-enroll" onclick="enrollCourse(${courseId})">Enroll Now</button>
            `;
        }
        
        // Show the detail panel
        detailPanel.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error showing course details:', error);
        alert('An unexpected error occurred while loading course details. Please try again.');
    }
}

// Close detail panel
function closeDetail() {
    try {
        const detailPanel = document.getElementById('course-detail-panel');
        if (detailPanel) {
            detailPanel.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error closing detail panel:', error);
    }
}

// Enroll in course
function enrollCourse(courseId) {
    const course = coursesData.courses.find(c => c.id === courseId);
    if (course) {
        alert('🎉 Thank you for enrolling in:\n\n' + course.title + '\n\nYou will receive a confirmation email shortly.');
        closeDetail();
    }
}
