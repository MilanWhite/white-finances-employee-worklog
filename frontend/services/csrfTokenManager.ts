let csrfToken: string | null = null;

// fetch CSRF token
const fetchCsrfToken = async (): Promise<string | null> => {
    if (csrfToken) {
        return csrfToken;
    }
    
    const response = await fetch("http://localhost:5000/api/csrf-token", {
        credentials: "include",
    });
    const data = await response.json();
    csrfToken = data.csrf_token;

    return csrfToken;
};

export const getCsrfToken = async (): Promise<string | null> => {
    if (csrfToken) {
        console.log("CACHED")
        return csrfToken;
    }
    return fetchCsrfToken();
};