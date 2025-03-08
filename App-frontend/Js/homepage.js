import { API_URLS } from "./api.js";

// Fetch notes from the backend
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
        hideLoadingIndicator();
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        hideLoadingIndicator();
        console.error("Fetch Notes Error:", error);
        showError(error.message);
        alert("An error occurred while fetching notes. Please try again.");
    }
}

// Render notes in the UI
function renderNotes(notes) {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="editNote('${note._id}')">Edit</button>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Add note
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
        hideLoadingIndicator();
        if (!response.ok) {
            throw new Error('Failed to create note');
        }
        const note = await response.json();
        alert("Note added successfully!");
        fetchNotes();
    } catch (error) {
        hideLoadingIndicator();
        console.error("Add Note Error:", error);
        showError(error.message);
        alert("An error occurred while adding the note. Please try again.");
    }
});

// Edit note
async function editNote(noteId) {
    const newTitle = prompt("Edit Note Title:");
    const newContent = prompt("Edit Note Content:");

    if (newTitle && newContent) {
        const token = localStorage.getItem("token");

        try {
            showLoadingIndicator();
            const response = await fetch(`${API_URLS.UPDATE_NOTE}${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTitle, content: newContent }),
            });
            hideLoadingIndicator();
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            const note = await response.json();
            alert("Note updated successfully!");
            fetchNotes();
        } catch (error) {
            hideLoadingIndicator();
            console.error("Edit Note Error:", error);
            showError(error.message);
            alert("An error occurred while updating the note. Please try again.");
        }
    }
}

// Delete note
async function deleteNote(noteId) {
    const token = localStorage.getItem("token");

    try {
        showLoadingIndicator();
        const response = await fetch(`${API_URLS.DELETE_NOTE}${noteId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
        hideLoadingIndicator();
        if (!response.ok) {
            throw new Error('Failed to delete note');
        }
        alert("Note deleted successfully!");
        fetchNotes();
    } catch (error) {
        hideLoadingIndicator();
        console.error("Delete Note Error:", error);
        showError(error.message);
        alert("An error occurred while deleting the note. Please try again.");
    }
}

// Initial notes data
let notes = [
    { id: 1, title: "Simple Interactive Note 1", content: "This is the content of note 1.", category: "Work" },
    { id: 2, title: "Simple Interactive Note 2", content: "This is the content of note 2.", category: "Personal" },
    { id: 3, title: "Simple Interactive Note 3", content: "This is the content of note 3.", category: "Work" },
    { id: 4, title: "Simple Interactive Note 4", content: "This is the content of note 4.", category: "Personal" },
    { id: 5, title: "Simple Interactive Note 5", content: "This is the content of note 5.", category: "Work" },
    { id: 6, title: "Simple Interactive Note 6", content: "This is the content of note 6.", category: "Personal" }
];

// Note Modal Functions
function showNoteContent(noteId) {
    try {
        const note = notes.find(n => n.id === noteId);
        if (note) {
            const noteIdElement = document.getElementById('noteId');
            const noteTitleElement = document.getElementById('noteTitle');
            const noteContentElement = document.getElementById('noteContent');
            const noteModalElement = document.getElementById('noteModal');

            if (noteIdElement && noteTitleElement && noteContentElement && noteModalElement) {
                noteIdElement.value = note.id;
                noteTitleElement.innerText = note.title;
                noteContentElement.innerText = note.content;
                noteModalElement.classList.remove('hidden');
            }
        }
    } catch (error) {
        console.error('Error showing note content:', error);
    }
}

function closeNoteModal() {
    try {
        const noteModal = document.getElementById('noteModal');
        if (noteModal) {
            noteModal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error closing note modal:', error);
    }
}

// Add Note Modal Functions
function addNote() {
    try {
        const addNoteModal = document.getElementById('addNoteModal');
        if (addNoteModal) {
            addNoteModal.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error opening add note modal:', error);
    }
}

function closeAddNoteModal() {
    try {
        const addNoteModal = document.getElementById('addNoteModal');
        if (addNoteModal) {
            addNoteModal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error closing add note modal:', error);
    }
}

function saveNewNote() {
    try {
        const titleElement = document.getElementById('newNoteTitle');
        const contentElement = document.getElementById('newNoteContent');
        const categoryElement = document.getElementById('newNoteCategory');

        if (!titleElement || !contentElement || !categoryElement) {
            console.error('Required form elements not found');
            return;
        }

        const title = titleElement.value.trim();
        const content = contentElement.value.trim();
        const category = categoryElement.value;

        if (title && content && category) {
            const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
            notes.push({
                id: newId,
                title: title,
                content: content,
                category: category
            });
            closeAddNoteModal();
            renderNotes();
            
            // Clear form
            titleElement.value = '';
            contentElement.value = '';
            categoryElement.value = 'Work';
        } else {
            alert('Please fill in all fields');
        }
    } catch (error) {
        console.error('Error saving new note:', error);
    }
}

// Note Operations
function editNote() {
    try {
        const noteId = document.getElementById('noteId').value;
        const currentTitle = document.getElementById('noteTitle').innerText;
        const currentContent = document.getElementById('noteContent').innerText;

        const newTitle = prompt("Edit Note Title:", currentTitle);
        const newContent = prompt("Edit Note Content:", currentContent);

        if (newTitle && newContent) {
            const note = notes.find(n => n.id == noteId);
            if (note) {
                note.title = newTitle;
                note.content = newContent;
                document.getElementById('noteTitle').innerText = newTitle;
                document.getElementById('noteContent').innerText = newContent;
                renderNotes();
            }
        }
    } catch (error) {
        console.error('Error editing note:', error);
    }
}

function deleteNote() {
    try {
        const noteId = document.getElementById('noteId').value;
        notes = notes.filter(n => n.id != noteId);
        closeNoteModal();
        renderNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

// Note Rendering and Display
function renderNotes(filteredNotes = null) {
    try {
        const notesContainer = document.getElementById('notesContainer');
        if (!notesContainer) {
            console.error('Notes container not found');
            return;
        }

        notesContainer.innerHTML = '';
        const notesToRender = Array.isArray(filteredNotes) ? filteredNotes : notes;
        
        if (notesToRender && notesToRender.length > 0) {
            notesToRender.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'bg-purple-800 rounded-lg p-4 text-white cursor-pointer note-card';
                noteElement.innerText = note.title;
                noteElement.onclick = () => showNoteContent(note.id);
                notesContainer.appendChild(noteElement);
            });
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'text-gray-600 text-center py-4';
            emptyMessage.innerText = 'No notes found';
            notesContainer.appendChild(emptyMessage);
        }
    } catch (error) {
        console.error('Error rendering notes:', error);
    }
}

// UI Functions
function toggleMenu() {
    try {
        const menu = document.getElementById('profileMenu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    } catch (error) {
        console.error('Error toggling menu:', error);
    }
}

// Search and Filter Functions
function searchNotes() {
    try {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) {
            console.error('Search input not found');
            return;
        }

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            const filteredNotes = notes.filter(note => 
                note.title.toLowerCase().includes(searchTerm) || 
                note.content.toLowerCase().includes(searchTerm)
            );
            renderNotes(filteredNotes);
        } else {
            renderNotes();
        }
    } catch (error) {
        console.error('Error searching notes:', error);
    }
}

function filterNotes() {
    try {
        const filterTerm = prompt("Enter filter term:");
        if (filterTerm) {
            const filteredNotes = notes.filter(note => 
                note.title.toLowerCase().includes(filterTerm.toLowerCase())
            );
            renderNotes(filteredNotes);
        }
    } catch (error) {
        console.error('Error filtering notes:', error);
    }
}

function categorizeNotes() {
    try {
        const categories = [...new Set(notes.map(note => note.category))];
        const notesContainer = document.getElementById('notesContainer');
        
        if (!notesContainer) {
            console.error('Notes container not found');
            return;
        }

        notesContainer.innerHTML = '';

        if (categories.length > 0) {
            categories.forEach(category => {
                const categoryHeader = document.createElement('h3');
                categoryHeader.className = 'text-lg font-semibold mb-2';
                categoryHeader.innerText = category;
                notesContainer.appendChild(categoryHeader);

                const categoryNotes = notes.filter(note => note.category === category);
                categoryNotes.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.className = 'bg-purple-800 rounded-lg p-4 text-white cursor-pointer mb-2 note-card';
                    noteElement.innerText = note.title;
                    noteElement.onclick = () => showNoteContent(note.id);
                    notesContainer.appendChild(noteElement);
                });
            });
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'text-gray-600 text-center py-4';
            emptyMessage.innerText = 'No categories found';
            notesContainer.appendChild(emptyMessage);
        }
    } catch (error) {
        console.error('Error categorizing notes:', error);
    }
}

// Initialize notes on page load
document.addEventListener("DOMContentLoaded", fetchNotes);

function showLoadingIndicator() {
    // Implement loading indicator display
}

function hideLoadingIndicator() {
    // Implement loading indicator hide
}

function showError(message) {
    // Implement error message display
}
