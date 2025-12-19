// Fixed course platform main script

const coursesData = {
    "courses": [
        {
            "id": 1,
            "title": "Python Fundamentals to Advanced",
            "instructor": "Prof. Zhang",
            "duration": "40 hours",
            "level": "Beginner",
            "price": "$299",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%234CAF50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' fill='white' font-weight='bold'%3EPython%3C/text%3E%3C/svg%3E",
            "description": "A practical course that takes you from Python basics to advanced topics, including data processing and automation."
        },
        {
            "id": 2,
            "title": "JavaScript Full Stack Development",
            "instructor": "Prof. Li",
            "duration": "60 hours",
            "level": "Intermediate",
            "price": "$399",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%232196F3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='white' font-weight='bold'%3EJavaScript%3C/text%3E%3C/svg%3E",
            "description": "Build modern full-stack applications using JavaScript, Node.js, and popular frameworks."
        },
        {
            "id": 3,
            "title": "Data Structures and Algorithms",
            "instructor": "Prof. Wang",
            "duration": "50 hours",
            "level": "Intermediate",
            "price": "$499",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23FF9800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='white' font-weight='bold'%3EAlgorithm%3C/text%3E%3C/svg%3E",
            "description": "Improve problem-solving skills with classic algorithms and efficient data structures."
        },
        {
            "id": 4,
            "title": "React Framework Introduction",
            "instructor": "Prof. Zhao",
            "duration": "35 hours",
            "level": "Intermediate",
            "price": "$349",
            "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%2300BCD4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' fill='white' font-weight='bold'%3EReact%3C/text%3E%3C/svg%3E",
            "description": "Learn React fundamentals and build responsive single-page applications."
        }
    ]
};

window.addEventListener('error', function(event) {
    console.error('Unhandled error:', event.message, 'at', event.filename + ':' + event.lineno);
    // Non-blocking notification
    // (In production you'd use a non-intrusive UI element instead of alert)
});

document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

function loadCourses() {
    const container = document.getElementById('courses-container');
    container.innerHTML = '<div class="loading">Loading courses...</div>';

    setTimeout(() => {
        container.innerHTML = '';
        coursesData.courses.forEach(course => {
            const courseCard = createCourseCard(course);
            container.appendChild(courseCard);
        });
    }, 300);
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
            <button class="btn-detail" data-course-id="${course.id}">View Details</button>
        </div>
    `;

    // Use event listener instead of inline onclick to keep separation of concerns
    const btn = card.querySelector('.btn-detail');
    btn.addEventListener('click', () => showCourseDetail(course.id));

    return card;
}

function showCourseDetail(courseId) {
    try {
        const course = coursesData.courses.find(c => c.id === courseId);
        if (!course) {
            alert('Course not found');
            return;
        }

        let detailPanel = document.getElementById('course-detail-panel');

        // Defensive: if the panel doesn't exist for any reason, create it dynamically
        if (!detailPanel) {
            detailPanel = document.createElement('div');
            detailPanel.id = 'course-detail-panel';
            detailPanel.className = 'detail-panel';
            document.body.appendChild(detailPanel);
        }

        detailPanel.innerHTML = `
            <div class="detail-header">
                <h2>${escapeHtml(course.title)}</h2>
                <button class="close-btn" id="close-detail-btn">Close</button>
            </div>
            <img src="${course.image}" alt="${escapeHtml(course.title)}" class="detail-image">
            <p><strong>Instructor:</strong> ${escapeHtml(course.instructor)}</p>
            <p><strong>Duration:</strong> ${escapeHtml(course.duration)}</p>
            <p><strong>Level:</strong> ${escapeHtml(course.level)}</p>
            <p><strong>Price:</strong> ${escapeHtml(course.price)}</p>
            <p style="margin-top:1rem;">${escapeHtml(course.description || 'No description available.')}</p>
        `;

        detailPanel.classList.remove('hidden');
        detailPanel.setAttribute('aria-hidden', 'false');

        const closeBtn = document.getElementById('close-detail-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDetail);
        }

    } catch (err) {
        console.error('Failed to show details:', err);
        alert('Sorry, unable to display course details. Please check the console for more information.');
    }
}

function closeDetail() {
    const detailPanel = document.getElementById('course-detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
        detailPanel.setAttribute('aria-hidden', 'true');
    }
}

// Simple HTML escape to protect from accidental injection if data changes
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}