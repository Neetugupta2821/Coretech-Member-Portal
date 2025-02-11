// apiUrls.js
export const BASE_URL = 'http://localhost:8000/api/v1/';

export const LOGIN_URL = 'token/';

// Example of a function to generate a URL with dynamic parameters
export function getSectionListUrl(examId) {
    return `exams/${examId}/sections`;
}
export function getQuestionPaperUrl(quesId) {
    return `examPortal/getQuestionPaper/${quesId}`;
}

// Example of a function to generate a URL with query parameters
export function getFilteredUsersUrl(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    return `${BASE_URL}/api/v1/users?${queryParams}`;
}

export const AUTH_CHECK_URL = '/app_auth/auth-check';
// Add more URL functions as needed
