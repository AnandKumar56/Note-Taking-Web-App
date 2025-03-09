function showLoadingIndicator() {
    const loader = document.getElementById("loadingIndicator");
    if (loader) loader.style.display = "block"; // Show loading indicator
}


function hideLoadingIndicator() {
    const loader = document.getElementById("loadingIndicator");
    if (loader) loader.style.display = "none"; // Hide loading indicator
}


function showError(message) {
    alert(message); // Display error message
}
