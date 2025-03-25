document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        // Toggle the current theme
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeButton(currentTheme);
    });
    
    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }
    
    // Rest of your existing code...
    // Profile Photo Upload Functionality
    const uploadBtn = document.getElementById('upload-btn');
    const photoUpload = document.getElementById('photo-upload');
    const profilePhoto = document.getElementById('profile-photo');
    
    uploadBtn.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files.length) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePhoto.src = event.target.result;
                // In a real app, you would upload the image to a server here
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Progress Circle Animation
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const circumference = 2 * Math.PI * 50;
        const offset = circumference - (progress / 100) * circumference;
        
        const progressRing = circle.querySelector('.progress-ring-circle');
        progressRing.style.strokeDasharray = circumference;
        progressRing.style.strokeDashoffset = offset;
    });
    
    // Modal Functionality
    const addReminderBtn = document.getElementById('add-reminder');
    const reminderModal = document.getElementById('reminder-modal');
    const closeModal = document.querySelector('.close-modal');
    const reminderForm = document.getElementById('reminder-form');
    
    addReminderBtn.addEventListener('click', function() {
        reminderModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        reminderModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === reminderModal) {
            reminderModal.style.display = 'none';
        }
    });
    
    reminderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('reminder-title').value;
        const time = document.getElementById('reminder-time').value;
        const days = document.getElementById('reminder-days').value;
        
        // In a real app, you would save this to a database
        // For now, we'll just add it to the UI
        addReminderToUI(title, time, days);
        
        // Reset form and close modal
        reminderForm.reset();
        reminderModal.style.display = 'none';
    });
    
    function addReminderToUI(title, time, days) {
        const remindersList = document.querySelector('.reminders-list');
        
        let daysText = '';
        switch(days) {
            case 'once':
                daysText = 'Once';
                break;
            case 'daily':
                daysText = 'Daily';
                break;
            case 'weekdays':
                daysText = 'Weekdays';
                break;
            case 'weekly':
                daysText = 'Weekly';
                break;
        }
        
        const reminderItem = document.createElement('div');
        reminderItem.className = 'reminder-item';
        reminderItem.innerHTML = `
            <i class="fas fa-bell reminder-icon"></i>
            <div class="reminder-details">
                <h4>${title}</h4>
                <p>${daysText} at ${formatTime(time)}</p>
            </div>
            <div class="reminder-actions">
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        remindersList.appendChild(reminderItem);
        
        // Add event listeners to new buttons
        const deleteBtn = reminderItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            reminderItem.remove();
        });
        
        // Edit functionality would be similar to add, but we'd need to track which item is being edited
    }
    
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        let period = 'AM';
        let hour = parseInt(hours);
        
        if (hour >= 12) {
            period = 'PM';
            if (hour > 12) hour -= 12;
        }
        
        return `${hour}:${minutes} ${period}`;
    }
    
    // Delete reminder functionality for existing reminders
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.reminder-item').remove();
        });
    });
    
    // Course card click functionality
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, this would navigate to the course page
            alert('Navigating to course details page');
        });
    });
    
    // Task action button functionality
    document.querySelectorAll('.task-action').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskItem = this.closest('.task-item');
            const taskName = taskItem.querySelector('h4').textContent;
            alert(`Starting task: ${taskName}`);
        });
    });
});