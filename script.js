// script.js

const users = {
    "adilsamdani.shaik@qualizeal.com": "Samdani@46",
    "demo.app@gmail.com": "demo@007",
    "demo.test1@gmail.com": "password3"
};

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        // Redirect to the home page on successful login
        window.location.href = "home.html";
        return false; // Prevent form submission
    } else {
        alert("Invalid username or password");
        return false; // Prevent form submission
    }
}
