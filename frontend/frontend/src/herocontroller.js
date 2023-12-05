import { useAuthContext } from './hooks/useAuthContext';

const { user } = useAuthContext();
// Fetches the list of heroes
export const getHeroList = () => {
    return fetch('/api/heros/')
        .then(handleResponse)
        .catch(handleError);
};

// Fetches the list of hero powers
export const getPowerList = () => {
    return fetch('/api/powers')
        .then(handleResponse)
        .catch(handleError);
};

// Searches for heroes based on different criteria
export const searchHeroes = (queryString) => {
    console.log('Searching for heroes...');
    return fetch(`/api/search?${queryString}`)
        .then(handleResponse)
        .catch(handleError);
};

/*
export const searchPublisher = (field) => {
    console.log('Searching for heros with publisher...');
    return fetch(`/api/search/${field}/${query}?n=${n}`)
        .then(handleResponse)
        .catch(handleError);
};

*/
// Creates a new list
export const createList = (listName) => {
    const payload = {
        listName: listName,
        username: user.username
    };
    return fetch('http://localhost:3000/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(handleResponse)
    .catch(handleError);
};

// Edits an existing list
export const editList = (listName, superheroIds) => {
    const payload = {
        superheroIds: superheroIds // Send superheroIds as part of the payload
    };
    return fetch(`http://localhost:3000/api/lists/${listName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(handleResponse)
    .catch(handleError);
};


// Retrieves a specific list
export const getList = (listName) => {
    return fetch(`http://localhost:3000/api/lists/information/${listName}`)
        .then(handleResponse)
        .catch(handleError);
};

// Deletes a list
export const deleteList = (listName) => {
    return fetch(`http://localhost:3000/api/lists/${listName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(handleResponse)
    .catch(handleError);
};



// Helper function to handle HTTP response
const handleResponse = response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Helper function to handle errors
const handleError = error => {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
};
