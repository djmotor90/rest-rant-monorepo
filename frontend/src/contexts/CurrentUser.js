import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await fetch('http://localhost:5001/authentication/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const text = await response.text();

                // Check if the response contains valid JSON
                if (text.trim()) {
                    let user = JSON.parse(text);
                    setCurrentUser(user);
                } else {
                    console.error('Empty or invalid JSON response');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        getLoggedInUser();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}

export default CurrentUserProvider;
