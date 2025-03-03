const API_BASE_URL = "http://localhost:5000/api"; // Update when deployed

export const API_URLS = {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    GET_USER: `${API_BASE_URL}/auth/getuser`,
    ADD_NOTE: `${API_BASE_URL}/notes/addnote`,
    FETCH_NOTES: `${API_BASE_URL}/notes/fetchnotes`,
    UPDATE_NOTE: `${API_BASE_URL}/notes/updatenote/`, // Append note ID
    DELETE_NOTE: `${API_BASE_URL}/notes/deletenote/`, // Append note ID
};
