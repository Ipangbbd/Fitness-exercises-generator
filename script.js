// DOM Elements
const authScreen = document.getElementById('auth-screen');
const loadingScreen = document.getElementById('loading-screen');
const mainScreen = document.getElementById('main-screen');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const welcomeMessage = document.getElementById('welcome-message');
const userDisplayName = document.getElementById('user-display');
const userInitial = document.getElementById('user-initial');
const logoutBtn = document.getElementById('logout-btn');
const scheduleCards = document.querySelectorAll('.schedule-card');
const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
const scheduleModalTitle = document.getElementById('scheduleModalLabel');
const scheduleContent = document.getElementById('schedule-content');
const regenerateBtn = document.getElementById('regenerate-btn');

// Current user and selected schedule
let currentUser = '';
let currentSchedule = '';

// Event Listeners
authForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
regenerateBtn.addEventListener('click', regenerateSchedule);

// Initialize schedule card event listeners
scheduleCards.forEach(card => {
    const generateBtn = card.querySelector('.btn-generate');
    generateBtn.addEventListener('click', () => {
        const scheduleType = card.getAttribute('data-schedule');
        generateSchedule(scheduleType);
    });
});

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    if (!username) return;

    currentUser = username;

    // Show loading screen
    authScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    welcomeMessage.textContent = `Welcome, ${currentUser}.`;

    // Update user display
    userDisplayName.textContent = currentUser;
    userInitial.textContent = currentUser.charAt(0).toUpperCase();

    // Transition to main screen after delay
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        mainScreen.classList.add('active');
    }, 1500);
}

// Handle logout
function handleLogout() {
    // Reset form
    authForm.reset();
    currentUser = '';

    // Switch screens
    mainScreen.classList.remove('active');
    authScreen.classList.add('active');
}

// Generate schedule based on selected frequency
function generateSchedule(scheduleType) {
    currentSchedule = scheduleType;

    // Set modal title
    const scheduleTitle = document.querySelector(`[data-schedule="${scheduleType}"] h3`).textContent;
    scheduleModalTitle.textContent = scheduleTitle;

    // Generate and display schedule
    displaySchedule(scheduleType);

    // Show modal
    scheduleModal.show();
}

// Regenerate current schedule
function regenerateSchedule() {
    if (currentSchedule) {
        displaySchedule(currentSchedule);
    }
}

// Display schedule in modal
function displaySchedule(scheduleType) {
    // Get generated schedule
    const schedule = getSchedule(scheduleType);

    // Build HTML for schedule
    let html = '';

    schedule.forEach(day => {
        html += `
            <div class="exercise-day">
                <h4>${day.day} - ${day.focus}</h4>
        `;

        day.exercises.forEach(group => {
            html += `
                <div class="exercise-group">
                    <h5>${group.group}</h5>
                    <ul class="exercise-list">
            `;

            group.exercises.forEach(exercise => {
                html += `
                    <li>
                        <strong>${exercise.name}</strong> - ${exercise.sets} sets × ${exercise.reps}
                    </li>
                `;
            });

            html += `
                    </ul>
                </div>
            `;
        });

        html += `</div>`;
    });

    // Set content
    scheduleContent.innerHTML = html;
}