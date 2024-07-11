document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    let usernameError = '';
    let passwordError = '';
    let formMessage = '';

    // Validate username/email
    if (!username) {
        usernameError = 'Username/Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
        usernameError = 'Enter a valid email address';
    }

    // Validate password
    if (!password) {
        passwordError = 'Password is required';
    } else if (password.length < 8) {
        passwordError = 'Password must be at least 8 characters long';
    } else if (!/[a-z]/.test(password)) {
        passwordError = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
        passwordError = 'Password must contain at least one uppercase letter';
    } else if (!/[@$!%*?&]/.test(password)) {
        passwordError = 'Password must contain at least one special character (@$!%*?&)';
    }

    // Display validation errors
    document.getElementById('username-error').textContent = usernameError;
    document.getElementById('password-error').textContent = passwordError;

    if (usernameError || passwordError) {
        return;
    }

    // API integration
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            formMessage = 'Login successful!';
            document.getElementById('form-message').style.color = 'green';
        } else {
            formMessage = 'Login failed!';
            document.getElementById('form-message').style.color = 'red';
        }
        document.getElementById('form-message').textContent = formMessage;
    })
    .catch(error => {
        formMessage = 'An error occurred. Please try again.';
        document.getElementById('form-message').style.color = 'red';
        document.getElementById('form-message').textContent = formMessage;
    });
});
