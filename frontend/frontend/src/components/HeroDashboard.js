import React, { useState, useEffect } from 'react';
import {
    getHeroList,
    getPowerList,
    searchHeroes,
    createList,
    getList,
    deleteList,
    editList
} from '../herocontroller';
import '../index.css';
import SearchResults from './SearchResults';
import { useAuthContext } from '../hooks/useAuthContext'


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
        console.log(username)
        const listName = document.getElementById('list-input').value.trim().toLowerCase();
        const listContent = document.getElementById('list-content').value.trim();
        const selectedFunction = document.getElementById('list-category').value.trim();

        if (listName === '') {
            return;
        }

        try {
            let response;
            switch (selectedFunction) {
                case 'create':
                    response = await createList(listName, username);
                    break;
                case 'edit':
                    response = await editList(listName, listContent);
                    break;
                case 'view':
                    response = await getList(listName);
                    setListViewData(response);
                    break;
                case 'delete':
                    response = await deleteList(listName);
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


            <h2>Like a few? Don't forget about them! Create a new list:</h2>

            <input className="field" type="text" id="list-input" placeholder="List's Name" />
            <input className="field" type="text" id="list-content" placeholder="Insert Info eg [1,2,3]" />
            <select className="list-selector" id="list-category">
                <option value="create">Create</option>
                <option value="edit">Edit</option>
                <option value="view">View</option>
                <option value="delete">Delete</option>
            </select>

            <button className="button" onClick={handleListAction}>Save</button>
            <p>{requestMessage}</p>
            <ul id="superheroCards" className="card-list">

                <SearchResults results={searchResults} />

            </ul>

        </div>
    );
};

export default HeroDashboard;