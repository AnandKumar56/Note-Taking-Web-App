import { API_URLS } from "./api.js";
import { showLoadingIndicator, hideLoadingIndicator, showError } from "./ui.js";

async function fetchNotes() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        showLoadingIndicator();
        const response = await fetch(API_URLS.FETCH_NOTES, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });
        const notes = await response.json();

        const notesContainer = document.getElementById("notesContainer");
        notesContainer.innerHTML = "";
        notes.forEach((note) => {
            notesContainer.innerHTML += `
                <div class="note">
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                    <button onclick="editNote('${note._id}')">Edit</button>
                    <button onclick="deleteNote('${note._id}')">Delete</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Fetch Notes Error:", error);
        showError("Failed to fetch notes. Please try again later.");
    } finally {
        hideLoadingIndicator();
    }
}

// Add Note
document.getElementById("addNoteForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const token = localStorage.getItem("token");

    try {
        showLoadingIndicator();
        const response = await fetch(API_URLS.ADD_NOTE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            alert("Note added successfully!");
            fetchNotes();
        }
    } catch (error) {
        console.error("Add Note Error:", error);
        showError("Failed to add note. Please try again later.");
    } finally {
        hideLoadingIndicator();
    }
});

// Load Notes on Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchNotes();
}
