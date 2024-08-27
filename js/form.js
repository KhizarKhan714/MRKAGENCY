
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Perform registration logic (e.g., AJAX to server)
    console.log('Registration form submitted');

    // Redirect to login page after successful registration
    window.location.href = 'login.html';
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Perform login logic (e.g., AJAX to server)
    console.log('Login form submitted');

    // Redirect to dashboard or homepage after successful login
    window.location.href = 'index.html';
});