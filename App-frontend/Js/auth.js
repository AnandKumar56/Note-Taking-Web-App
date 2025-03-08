import { API_URLS } from "./api.js";

// User Signup
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        showLoadingIndicator();
        const response = await fetch(API_URLS.REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        hideLoadingIndicator();
        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.error || "Signup failed.");
        }
    } catch (error) {
        hideLoadingIndicator();
        console.error("Signup Error:", error);
        alert("An error occurred during signup. Please try again.");
    }
});

// User Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        showLoadingIndicator();
        const response = await fetch(API_URLS.LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        hideLoadingIndicator();
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(data.error || "Login failed.");
        }
    } catch (error) {
        hideLoadingIndicator();
        console.error("Login Error:", error);
        alert("An error occurred during login. Please try again.");
    }
});

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

document.getElementById("logoutBtn")?.addEventListener("click", logout);

async function signup(userData) {
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Signup failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('Signup failed: ' + error.message);
    }
}

async function login(userData) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    }
}

function showLoadingIndicator() {
    // Implement loading indicator display
}

function hideLoadingIndicator() {
    // Implement loading indicator hide
}

function showError(message) {
    // Implement error message display
}
