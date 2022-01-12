import React from "react";

function Storage(DBName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
  
    const [users, setUsers] = React.useState(initialValue);

    React.useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageUsers = localStorage.getItem(DBName);
                let parsedUsers;

                if (!localStorageUsers) {
                    localStorage.setItem(DBName, JSON.stringify(initialValue));
                    parsedUsers = initialValue;
                } else {
                    parsedUsers = JSON.parse(localStorageUsers);
                }

                setUsers(parsedUsers);
                setLoading(false);
            } catch (error) {
                setError(error);
                
            }
        }, 1000);
    });

    const saveUsers = (newUsers) => {
        try {
            const stringifiedUsers = JSON.stringify(newUsers);
            localStorage.setItem(DBName, stringifiedUsers);
            setUsers(newUsers);
        } catch (error) {
            setError(error);
        }
    };

    return {
        users,
        saveUsers,
        loading,
        error,
    };
}

export {Storage};