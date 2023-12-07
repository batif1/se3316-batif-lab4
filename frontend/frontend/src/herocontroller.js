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

export const getListInfo = (listName) => {
    console.log('Getting list info...');
    return fetch(`/api/lists/information/${listName}`)
        .then(handleResponse)
        .catch(handleError);
}
/*
export const searchPublisher = (field) => {
    console.log('Searching for heros with publisher...');
    return fetch(`/api/search/${field}/${query}?n=${n}`)
        .then(handleResponse)
        .catch(handleError);
};

*/


// Creates a new list
export const createList = (listName, username, listContent, listDescription, listVisibility) => {

    const payload = {
        listName: listName,
        items: listContent,
        username: username,
        visibility: listVisibility,
        rate: 0,
        reviews: [],
        description: listDescription,
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
// Edits an existing list
export const editList = (listName, username, listContent, listVisibility, rate, reviews, listDescription) => {
    const payload = {
        items: listContent,
        username: username,
        visibility: listVisibility,
        rate: rate,
        reviews: reviews,
        description: listDescription
    };
    console.log(payload);
    return fetch(`http://localhost:3000/api/lists/${listName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(handleResponse)
    .catch(handleError);
};

export const addReviewToList = (listName, user, comment, rating) => {
    const payload = {
        user,
        comment,
        rating,
    };

    return fetch(`http://localhost:3000/api/lists/${listName}/reviews`, {
        method: 'POST',
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


// Retrieves all lists
export const viewAllLists = () => {
    return fetch(`/api/getlists`)
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
