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
    // document.querySelectorAll('.course-card').forEach(card => {
    //     card.addEventListener('click', function() {
    //         // In a real app, this would navigate to the course page
    //         alert('Navigating to course details page');
    //     });
    // });
    
    // Task action button functionality
    // document.querySelectorAll('.task-action').forEach(btn => {
    //     btn.addEventListener('click', function(e) {
    //         e.stopPropagation();
    //         const taskItem = this.closest('.task-item');
    //         const taskName = taskItem.querySelector('h4').textContent;
    //         alert(`Starting task: ${taskName}`);
    //     });
    // });
});


// For Progress Page
function initializeProgressPage() {
    if (document.querySelector('.progress-overview')) {
        // Animate progress numbers
        const bigNumbers = document.querySelectorAll('.big-number');
        bigNumbers.forEach(number => {
            const target = parseInt(number.textContent);
            let current = 0;
            const increment = target / 20;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                number.textContent = Math.floor(current);
            }, 50);
        });
        
        // Initialize chart placeholders
        const charts = document.querySelectorAll('.chart');
        charts.forEach(chart => {
            chart.innerHTML = '<p class="chart-placeholder">Chart will be displayed here</p>';
        });
    }
}

// For Schedule Page
function initializeSchedulePage() {
    if (document.querySelector('.weekly-schedule')) {
        // Date navigation functionality
        const navBtns = document.querySelectorAll('.nav-btn');
        const currentWeekEl = document.querySelector('.current-week');
        
        let currentDate = new Date();
        
        function updateWeekDisplay() {
            const weekStart = new Date(currentDate);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            const options = { month: 'long', day: 'numeric' };
            currentWeekEl.textContent = 
                `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}, ${weekStart.getFullYear()}`;
        }
        
        navBtns[0].addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7);
            updateWeekDisplay();
        });
        
        navBtns[1].addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7);
            updateWeekDisplay();
        });
        
        updateWeekDisplay();
        
        // Add event button functionality
        const addEventBtn = document.querySelector('.btn-primary');
        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => {
                alert('Add event functionality would be implemented here');
            });
        }
    }
}

// Initialize pages when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressPage();
    initializeSchedulePage();
    
    // Your existing theme toggle and other functionality...
    // Keep all your existing code here
});




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
    
    // Profile Photo Upload and Local Storage Functionality
    const uploadBtn = document.getElementById('upload-btn');
    const photoUpload = document.getElementById('photo-upload');
    const profilePhoto = document.getElementById('profile-photo');
    
    // Load saved profile photo if exists
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
    }
    
    uploadBtn.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profilePhoto.src = event.target.result;
                // Save to local storage
                localStorage.setItem('profilePhoto', event.target.result);
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Rest of your existing code...
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
    
    // ... (keep all your other existing functions and code)
});

// For Progress Page
function initializeProgressPage() {
    if (document.querySelector('.progress-overview')) {
        // Animate progress numbers
        const bigNumbers = document.querySelectorAll('.big-number');
        bigNumbers.forEach(number => {
            const target = parseInt(number.textContent);
            let current = 0;
            const increment = target / 20;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                number.textContent = Math.floor(current);
            }, 50);
        });
        
        // Initialize chart placeholders
        const charts = document.querySelectorAll('.chart');
        charts.forEach(chart => {
            chart.innerHTML = '<p class="chart-placeholder">Chart will be displayed here</p>';
        });
    }
}

// For Schedule Page
function initializeSchedulePage() {
    if (document.querySelector('.weekly-schedule')) {
        // Date navigation functionality
        const navBtns = document.querySelectorAll('.nav-btn');
        const currentWeekEl = document.querySelector('.current-week');
        
        let currentDate = new Date();
        
        function updateWeekDisplay() {
            const weekStart = new Date(currentDate);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            const options = { month: 'long', day: 'numeric' };
            currentWeekEl.textContent = 
                `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}, ${weekStart.getFullYear()}`;
        }
        
        navBtns[0].addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7);
            updateWeekDisplay();
        });
        
        navBtns[1].addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7);
            updateWeekDisplay();
        });
        
        updateWeekDisplay();
        
        // Add event button functionality
        const addEventBtn = document.querySelector('.btn-primary');
        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => {
                alert('Add event functionality would be implemented here');
            });
        }
    }
}

// Initialize pages when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressPage();
    initializeSchedulePage();
});



// For Notifications Page
function initializeNotificationsPage() {
    if (document.querySelector('.notifications-list')) {
        // Mark all as read functionality
        const markAllReadBtn = document.getElementById('mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function() {
                document.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                });
                // In a real app, you would also update the server
            });
        }

        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // In a real app, you would filter the notifications here
            });
        });

        // Notification action menu functionality
        // document.querySelectorAll('.notification-action').forEach(btn => {
        //     btn.addEventListener('click', function(e) {
        //         e.stopPropagation();
        //         // In a real app, this would open an action menu
        //         alert('Notification actions would appear here');
        //     });
        // });

        // Notification click functionality
        document.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                // In a real app, this would navigate to the relevant content
            });
        });
    }
}

// Update the DOMContentLoaded event listener to include notifications
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressPage();
    initializeSchedulePage();
    initializeNotificationsPage();
    
    // Your existing theme toggle and other functionality...
});


// Profile Page Functionality
function initializeProfilePage() {
    if (document.querySelector('.profile-sections')) {
        // Edit Profile Modal
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const editProfileModal = document.getElementById('edit-profile-modal');
        const closeModal = document.querySelector('.close-modal');
        const cancelEdit = document.getElementById('cancel-edit');
        const profileForm = document.getElementById('profile-form');

        // Load profile data from localStorage or use default
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {
            fullname: "Muhsin Raza",
            email: "muhsinraza2234@gmail.com",
            phone: "+1 (123) 456-7890",
            location: "New York, USA",
            bio: "Passionate computer science student specializing in mobile app development with Flutter. Enthusiastic about creating intuitive user experiences and solving real-world problems through technology."
        };

        // Display profile data
        document.getElementById('profile-fullname').textContent = profileData.fullname;
        document.getElementById('profile-email').textContent = profileData.email;
        document.getElementById('profile-phone').textContent = profileData.phone;
        document.getElementById('profile-location').textContent = profileData.location;
        document.getElementById('profile-bio').textContent = profileData.bio;

        // Set form values
        document.getElementById('edit-fullname').value = profileData.fullname;
        document.getElementById('edit-email').value = profileData.email;
        document.getElementById('edit-phone').value = profileData.phone;
        document.getElementById('edit-location').value = profileData.location;
        document.getElementById('edit-bio').value = profileData.bio;

        // Open modal
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.style.display = 'flex';
        });

        // Close modal
        function closeProfileModal() {
            editProfileModal.style.display = 'none';
        }

        closeModal.addEventListener('click', closeProfileModal);
        cancelEdit.addEventListener('click', closeProfileModal);

        // Save profile data
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const updatedProfile = {
                fullname: document.getElementById('edit-fullname').value,
                email: document.getElementById('edit-email').value,
                phone: document.getElementById('edit-phone').value,
                location: document.getElementById('edit-location').value,
                bio: document.getElementById('edit-bio').value
            };

            // Save to localStorage
            localStorage.setItem('profileData', JSON.stringify(updatedProfile));

            // Update displayed values
            document.getElementById('profile-fullname').textContent = updatedProfile.fullname;
            document.getElementById('profile-email').textContent = updatedProfile.email;
            document.getElementById('profile-phone').textContent = updatedProfile.phone;
            document.getElementById('profile-location').textContent = updatedProfile.location;
            document.getElementById('profile-bio').textContent = updatedProfile.bio;

            // Close modal
            closeProfileModal();
        });
    }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressPage();
    initializeSchedulePage();
    initializeNotificationsPage();
    initializeNotificationBell();
    initializeProfilePage();
    // ... rest of your existing code
});