import { API_URLS } from "./api.js";

async function fetchNotes() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
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
    }
}

// Add Note
document.getElementById("addNoteForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const token = localStorage.getItem("token");

    try {
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
    }
});

// Load Notes on Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchNotes();
}
