// Course platform main script - fixed version (defensive and user-friendly)

// Course data (embedded for simplicity)
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

// Keep a global error handler to show friendly message for unexpected errors
window.addEventListener('error', function(event) {
    // Avoid spamming alerts during development; log and show unobtrusive message
    console.error('Unhandled error:', event.message, 'at', event.filename + ':' + event.lineno);
    // We still prevent default to avoid ugly browser error popups, but do not block user
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

function loadCourses() {
    const container = document.getElementById('courses-container');
    if (!container) return; // defensive

    container.innerHTML = '<div class="loading">Loading courses...</div>';

    setTimeout(() => {
        container.innerHTML = '';
        coursesData.courses.forEach(course => {
            const card = createCourseCard(course);
            container.appendChild(card);
        });
    }, 350);
}

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

// Fixed: showCourseDetail now handles missing panel gracefully, and renders full course info
function showCourseDetail(courseId) {
    try {
        console.log('User requested details for course ID:', courseId);

        // find course data - if not found, show an informative message
        const course = coursesData.courses.find(c => c.id === Number(courseId));
        if (!course) {
            alert('Course not found.');
            return;
        }














































}    });        })[s];            "'": '&#39;'            '"': '&quot;',            '>': '&gt;',            '<': '&lt;',            '&': '&amp;',        return ({    return str.replace(/[&<>"']/g, function (s) {    if (typeof str !== 'string') return str;function escapeHtml(str) {// small utility to escape HTML inserted into the DOM (prevent accidental HTML injection)
    // hide panel (don't remove it - reuse next time)
    detailPanel.classList.add('hidden');
}    if (!detailPanel) return;    const detailPanel = document.getElementById('course-detail-panel');function closeDetail() {}    }        alert('Sorry, unable to display course details at this time.');        console.error('Failed to show course detail:', err);
    } catch (err) {        // For accessibility, focus the panel
        detailPanel.setAttribute('tabindex', '-1');
        detailPanel.focus();        detailPanel.classList.remove('hidden');
        // Make sure it's visible (remove hidden class if present)
                `;            </div>                <button class="detail-close" onclick="closeDetail()">Close</button>            <div style="display:flex;gap:0.5rem;justify-content:flex-end;margin-top:1rem;">            <p style="margin-top:0.5rem;font-size:1.15rem;color:#667eea;font-weight:600;">Price: ${escapeHtml(course.price)}</p>            <p><strong>Level:</strong> ${escapeHtml(course.level)}</p>            <p><strong>Duration:</strong> ${escapeHtml(course.duration)}</p>            <p><strong>Instructor:</strong> ${escapeHtml(course.instructor)}</p>            <img src="${course.image}" alt="${escapeHtml(course.title)}" style="width:100%;height:auto;border-radius:6px;margin:0.5rem 0 1rem 0;">            <h2 id="detail-title">${escapeHtml(course.title)}</h2>
        // Build accessible, user-friendly content
        detailPanel.innerHTML = `        }            document.body.appendChild(detailPanel);            detailPanel.className = 'detail-panel';            detailPanel.id = 'course-detail-panel';            detailPanel = document.createElement('div');        if (!detailPanel) {        let detailPanel = document.getElementById('course-detail-panel');        // Try to get existing panel; if it doesn't exist, create one and append to body (defensive)
        