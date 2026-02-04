// Course platform main script - Fixed version

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

// Fixed: Show course details without crashing
function showCourseDetail(courseId) {
    console.log('Showing details for course ID:', courseId);

    // Find the course by ID
    const course = coursesData.courses.find(c => c.id === courseId);
    if (!course) {
        alert('Course not found!');
        return;
    }

    // Get the detail panel
    const detailPanel = document.getElementById('course-detail-panel');
    if (!detailPanel) {
        console.error('Detail panel element not found!');
        return;
    }

    // Populate the detail panel with course information
    detailPanel.innerHTML = `
        <h2>${course.title}</h2>
        <img src="${course.image}" alt="${course.title}" style="width: 100%; max-width: 300px; height: auto; margin: 1rem 0; border-radius: 5px;">
        <div style="margin: 1rem 0;">
            <p><strong>👨‍🏫 Instructor:</strong> ${course.instructor}</p>
            <p><strong>⏰ Duration:</strong> ${course.duration}</p>
            <p><strong>📊 Level:</strong> ${course.level}</p>
            <p><strong>💰 Price:</strong> ${course.price}</p>
        </div>
        <p style="margin: 1rem 0; color: #666;">This is a comprehensive course designed to help you master the fundamentals and advanced concepts. Perfect for beginners and intermediate learners looking to enhance their skills.</p>
        <button onclick="closeDetail()" style="padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
    `;

    // Show the detail panel
    detailPanel.classList.remove('hidden');
}

// Close detail panel
function closeDetail() {
    const detailPanel = document.getElementById('course-detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }
}