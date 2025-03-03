document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.edit-profile');
    const nameDisplay = document.getElementById('name');
    const emailDisplay = document.getElementById('email');
    const usernameDisplay = document.getElementById('username');

    // Create input fields for editing
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = nameDisplay.textContent;
    nameInput.style.display = 'none'; // Initially hidden

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = emailDisplay.textContent;
    emailInput.style.display = 'none'; // Initially hidden

    // Append input fields to the profile card
    nameDisplay.parentNode.insertBefore(nameInput, nameDisplay.nextSibling);
    emailDisplay.parentNode.insertBefore(emailInput, emailDisplay.nextSibling);

    editButton.addEventListener('click', function() {
        if (editButton.textContent === 'Edit Profile') {
            // Switch to edit mode
            nameDisplay.style.display = 'none';
            emailDisplay.style.display = 'none';
            nameInput.style.display = 'block';
            emailInput.style.display = 'block';
            editButton.textContent = 'Save';
        } else {
            // Switch back to view mode
            nameDisplay.textContent = nameInput.value;
            emailDisplay.textContent = emailInput.value;
            nameDisplay.style.display = 'block';
            emailDisplay.style.display = 'block';
            nameInput.style.display = 'none';
            emailInput.style.display = 'none';
            editButton.textContent = 'Edit Profile';
            // Here you can add the code to save the changes to the database
        }
    });
});
