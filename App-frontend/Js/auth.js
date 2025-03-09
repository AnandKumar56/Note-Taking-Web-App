import { API_URLS } from "./api.js";
import { showLoadingIndicator, hideLoadingIndicator, showError } from "./ui.js";

// User Signup
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        showLoadingIndicator();
        const response = await fetch(API_URLS.REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        hideLoadingIndicator();

        if (response.ok) {
            alert("Signup successful! Redirecting to login page...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            console.error("Signup failed:", data);
            alert(data.error || "Signup failed. Please check your details.");
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

        const data = await response.json();
        hideLoadingIndicator();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            console.error("Login failed:", data);
            alert(data.error || "Login failed. Please check your credentials.");
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

function showLoadingIndicator() {
    const loader = document.getElementById("loadingIndicator");
    if (loader) loader.style.display = "block";
}

function hideLoadingIndicator() {
    const loader = document.getElementById("loadingIndicator");
    if (loader) loader.style.display = "none";
}

function showError(message) {
    alert(message);
}
