import React from 'react';
import './styles.css'; // Update the path as necessary

const Home = () => {
    return (
        <div>

            <h1 id="big-title">Find your next favorite superhero...</h1>

            <select className="category-selector" id="search-category">
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="race">Race</option>
                <option value="publisher">Publisher</option>
                <option value="power">Power</option>
            </select>

            <input className="field" type="text" id="search-input" placeholder="Search..." />
            <input className="field" type="number" id="search-number" placeholder="Enter number of results" />

            <button className="button" id="search-button">Search</button>

            <h1>_________________________________</h1>
            <h2>Like a few? Don't forget about them! Create a new list:</h2>
            <input className="field" type="text" id="list-input" placeholder="List's Name" />
            <input className="field" type="text" id="list-content" placeholder="Insert Info eg [1,2,3]" />
            <p>To add to a list please create one first and then select "edit" to add/edit information to it.</p>

            <select className="list-selector" id="list-category">
                <option value="create">Create</option>
                <option value="edit">Add/Edit Existing List</option>
                <option value="view">View</option>
                <option value="delete">Delete</option>
            </select>

            <button className="button" id="list-button">Save</button>
            <p id="requested"></p>

            <p id="listView"></p>

            <ul id="superheroCards" className="card-list"></ul>
        </div>
    );
};

export default Home;
