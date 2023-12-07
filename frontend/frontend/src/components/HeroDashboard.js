import React, { useState, useEffect } from 'react';
import {
    getHeroList,
    getPowerList,
    searchHeroes,
    createList,
    getList,
    deleteList,
    editList,
    viewAllLists,
    addReviewToList
} from '../herocontroller';
import '../index.css';
import SearchResults from './SearchResults';
import { useAuthContext } from '../hooks/useAuthContext'
import ListsDisplay from './ListDisplay';


const HeroDashboard = () => {
    const { user } = useAuthContext()

    const [heroes, setHeroes] = useState([]);
    const [powers, setPowers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [requestMessage, setRequestMessage] = useState('');
    const [listViewData, setListViewData] = useState([]);

    const [searchCategory, setSearchCategory] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [searchNumber, setSearchNumber] = useState(10);
    const [searchPower, setSearchPower] = useState('');

    const [searchName, setSearchName] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchRace, setSearchRace] = useState('');
    const [searchPublisher, setSearchPublisher] = useState('');

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const heroesData = await getHeroList();
            setHeroes(heroesData);
            const powersData = await getPowerList();
            setPowers(powersData);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            let queryParams = new URLSearchParams();

            if (searchName) queryParams.append('name', searchName);
            if (searchId) queryParams.append('id', searchId);
            if (searchRace) queryParams.append('race', searchRace);
            if (searchPublisher) queryParams.append('publisher', searchPublisher);
            if (searchPower) queryParams.append('power', searchPower);

            const results = await searchHeroes(queryParams.toString());
            setSearchResults(results);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };


    const handleListAction = async (e) => {
        e.preventDefault();
        console.log('in HERE')

        const username = user.email.split('@')[0];
        const listName = document.getElementById('list-input').value.trim().toLowerCase();
        const listContent = document.getElementById('list-content').value.trim();
        const selectedFunction = document.getElementById('list-category').value.trim();
        const listDescription = document.getElementById('list-description').value.trim();
        const listVisibility = document.getElementById('list-visibility').value.trim();
        const rate = ''
        const reviews = []
        const actualArray = JSON.parse(listContent);

        if (listName === '') {
            return;
        }

        try {
            let response;
            switch (selectedFunction) {
                case 'create':
                    //(listName, username,listContent, listDescription, listVisibility)
                    response = await createList(listName, username, actualArray, listDescription, listVisibility);

                    break;
                case 'edit':
                    console.log(listContent)

                    //(listName, username, listContent, listVisibility, rate, reviews, listDescription)
                    console.log(listVisibility)
                    response = await editList(listName, username, actualArray, listVisibility, rate, reviews, listDescription);

                    break;
                case 'view':
                    response = await getList(listName);
                    setListViewData(response);
                    break;
                case 'view-all':
                    response = await viewAllLists();
                    console.log(response);
                    setListViewData(response);
                    break;

                case 'delete':
                    setShowDeleteConfirmation(true);
                    setListToDelete(listName);
                    //response = await deleteList(listName);
                    break;
                default:
                    break;
            }
            setRequestMessage(response ? 'Action completed successfully' : 'No response from server');
        } catch (error) {
            console.error('List action failed:', error);
            setRequestMessage('An error occurred');
        }
    };
    const confirmDelete = async () => {
        if (listToDelete) {
            try {
                const response = await deleteList(listToDelete);
                setRequestMessage(response ? 'List deleted successfully' : 'Failed to delete list');
            } catch (error) {
                console.error('List deletion failed:', error);
                setRequestMessage('An error occurred while deleting the list');
            }
        }

        // Hide the delete confirmation dialog
        setShowDeleteConfirmation(false);
        setListToDelete(null);
    };

    const handleListView = async (e) => {
        e.preventDefault();
    
        try {
            const response = await viewAllLists();
            setListViewData(response);
        } catch (error) {
            console.error('View lists failed:', error);
        }
    };
    

    const handleReview = async (e) => {
        e.preventDefault();
        const username = user.email.split('@')[0];
        const listName = document.getElementById('list-review-name').value.trim().toLowerCase();
        const listReview = document.getElementById('list-review').value.trim();
        const listRate = document.getElementById('list-rate').value.trim();

        if (listName === '') {
            return;
        }

        try {
            const response = await addReviewToList(listName, username, listReview, listRate);
            setRequestMessage(response ? 'Review added successfully' : 'Failed to add review');
        }
        catch (error) {
            console.error('Review failed:', error);
            setRequestMessage('An error occurred');
        }
    };



    return (
        <div>
            <h1 id="big-title">Find your next favorite superhero...</h1>
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="category-selector" id="search-category">                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="race">Race</option>
                <option value="publisher">Publisher</option>
                <option value="power">Power</option>
            </select>

            <input
                value={searchPower}
                onChange={(e) => setSearchPower(e.target.value)}
                className="field"
                type="text"
                id="search-power"
                placeholder="Power"
            />

            <input value={searchName} onChange={(e) => setSearchName(e.target.value)} className="field" type="text" id="search-name" placeholder="Name" />
            <input value={searchId} onChange={(e) => setSearchId(e.target.value)} className="field" type="text" id="search-id" placeholder="ID" />
            <input value={searchRace} onChange={(e) => setSearchRace(e.target.value)} className="field" type="text" id="search-race" placeholder="Race" />
            <input value={searchPublisher} onChange={(e) => setSearchPublisher(e.target.value)} className="field" type="text" id="search-publisher" placeholder="Publisher" />



            <input value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} className="field" type="number" id="search-number" placeholder="Enter number of results" />


            <button className="button" onClick={handleSearch}>Search</button>
            <button className="button" onClick={handleListView}>View Public Lists</button>


            <h2>Like a few? Don't forget about them! Create a new list (sign-in required):</h2>

            <input className="field" type="text" id="list-input" placeholder="List's Name" />
            <input className="field" type="text" id="list-content" placeholder="Insert Info eg [1,2,3]" />
            <input className="field" type="text" id="list-description" placeholder="Insert Description" />

            <select className="category-selector" id="list-visibility">
                <option value="private">private</option>
                <option value="public">public</option>
            </select>

            <select className="category-selector" id="list-category">
                <option value="create">Create</option>
                <option value="edit">Edit</option>
                <option value="view">View</option>
                <option value="view-all">View All</option>
                <option value="delete">Delete</option>
            </select>

            <button className="button" onClick={handleListAction}>Save</button>
            <p>{requestMessage}</p>
            <ul id="superheroCards" className="card-list">

                <SearchResults results={searchResults} />
                <ListsDisplay lists={listViewData} />

            </ul>

            {showDeleteConfirmation && (
                <div className="delete-confirmation-modal">
                    <p>Are you sure you want to delete the list "{listToDelete}"?</p>
                    <div className="modal-buttons">
                        <button className="button" onClick={confirmDelete}>Yes</button>
                        <button className="button" onClick={() => setShowDeleteConfirmation(false)}>No</button>
                    </div>
                </div>
            )}

            <h2>Leave a review or a rating? Share your thoughts...</h2>
            <input className="field" type="text" id="list-review-name" placeholder="List's Name to Review" />
            <input className="field" type="number" id="list-rate" placeholder="Rate (max 5, min 0)" />
            <input className="field" type="text" id="list-review" placeholder="Insert Review" />
            <button className="button" onClick={handleReview}>Save</button>

            

        </div>
    );
};

export default HeroDashboard;