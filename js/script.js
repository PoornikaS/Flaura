// script.js
const toggleBtn = document.querySelectorAll('.toggle-btn');
const forms = document.querySelectorAll('form');
const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');

// Toggle between signup and login forms
toggleBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const formToShow = btn.getAttribute('data-form');
        toggleForm(formToShow);
    });
});

function toggleForm(formToShow) {
    forms.forEach((form) => {
        if (form.classList.contains(`${formToShow}-form`)) {
            form.classList.add('active');
            form.classList.remove('inactive');
        } else {
            form.classList.remove('active');
            form.classList.add('inactive');
        }
    });
    toggleBtn.forEach((btn) => {
        if (btn.getAttribute('data-form') === formToShow) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Signup functionality
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Signup successful!');
            // Optionally, you can redirect to a different page or perform any other actions
        } else {
            const error = await response.json();
            alert(`Signup failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during signup');
    }
});

// Login functionality
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Login successful!');
            // Optionally, you can redirect to a different page or perform any other actions
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
});