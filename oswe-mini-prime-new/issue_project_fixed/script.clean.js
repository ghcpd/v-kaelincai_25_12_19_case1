// Clean script for course platform (safe, single copy)

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

window.addEventListener('error', function(event) {
    console.error('Unhandled error:', event.error || event.message);
    const container = document.getElementById('courses-container');
    if (container) {
        const err = document.createElement('div');
        err.className = 'loading';
        err.textContent = 'An unexpected error occurred. Check the console for details.';
        container.prepend(err);
    }
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    setupOverlay();
});

function loadCourses() {
    const container = document.getElementById('courses-container');
    if (!container) return;

    container.innerHTML = '<div class="loading">Loading courses...</div>';

    setTimeout(() => {
        container.innerHTML = '';
        coursesData.courses.forEach(course => {
            const card = createCourseCard(course);
            container.appendChild(card);
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
            <button class="btn-detail">View Details</button>
        </div>
    `;

    const btn = card.querySelector('.btn-detail');
    btn.addEventListener('click', () => showCourseDetail(course.id));

    return card;
}

function showCourseDetail(courseId) {
    try {
        const detailPanel = document.getElementById('course-detail-panel');
        const overlay = document.getElementById('detail-overlay');
        if (!detailPanel || !overlay) {
            console.error('Detail panel or overlay is missing.');
            alert('Sorry, unable to display course details at this time.');
            return;
        }

        const course = coursesData.courses.find(c => c.id === courseId);
        if (!course) {
            console.warn('Course not found:', courseId);
            alert('Course details not available.');
            return;
        }

        detailPanel.innerHTML = `
            <img src="${course.image}" alt="${course.title}" style="width:100%;height:180px;object-fit:cover;border-radius:6px;">
            <h2 style="margin-top:1rem">${course.title}</h2>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <div style="text-align:right;"><button class="detail-close">Close</button></div>
        `;

        detailPanel.classList.remove('hidden');
        overlay.classList.remove('hidden');
        detailPanel.setAttribute('aria-hidden', 'false');

        const closeBtn = detailPanel.querySelector('.detail-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDetail);
        }

    } catch (error) {
        console.error('Failed to show course details:', error);
        alert('An error occurred while opening course details.');
    }
}

function closeDetail() {
    const detailPanel = document.getElementById('course-detail-panel');
    const overlay = document.getElementById('detail-overlay');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
        detailPanel.setAttribute('aria-hidden', 'true');
    }
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function setupOverlay() {
    const overlay = document.getElementById('detail-overlay');
    if (!overlay) return;
    overlay.addEventListener('click', closeDetail);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetail();
    });
}