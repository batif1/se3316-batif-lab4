import React, { useState, useEffect } from 'react';
import { getListInfo } from '../herocontroller';

const ListsDisplay = ({ lists }) => {
    const [expandedListId, setExpandedListId] = useState(null);
    const [listDetails, setListDetails] = useState({});
    const [listRatings, setListRatings] = useState({});

    useEffect(() => {
        // Generate a random rating for each list when the component mounts
        const ratings = lists.reduce((acc, list) => {
            acc[list._id] = (Math.random() * 5).toFixed(1); // Random rating out of 5, rounded to one decimal place
            return acc;
        }, {});
        setListRatings(ratings);
    }, [lists]);

    // Sort lists by last modified date
    const sortedLists = [...lists].sort((a, b) => {
        return new Date(b.lastModified) - new Date(a.lastModified);
    });

    const toggleExpandList = async (listId) => {
        setExpandedListId(expandedListId === listId ? null : listId);
        const list = lists.find(l => l._id === listId);

        // Check if listDetails[listId] is already populated, if not, fetch the details
        if (listId && (!listDetails[listId] || !listDetails[listId].listDetails) && list) {
            const details = await getListInfo(list.listName);
            //console.log(details);
            setListDetails({ ...listDetails, [listId]: details });
        }

    };

    return (
        <div>
            <h2>Superhero Lists</h2>
            {sortedLists.map(list => (
                <div key={list._id} className="list-card">
                    <div className="list-summary" onClick={() => toggleExpandList(list._id)}>
                        <h3>
                            {list.listName} - Heroes: {list.items.length}
                            <span> Rating: {listRatings[list._id]} / 5</span>
                        </h3>
                        <p>Created by: {list.listAuth}</p>
                    </div>
                    {expandedListId === list._id && listDetails[list._id] && listDetails[list._id].listDetails && (
                        <div className="list-details">
                            <h4>List Details:</h4>
                            <p>List Name: {listDetails[list._id].listDetails.listName}</p>
                            <p>Author: {listDetails[list._id].listDetails.listAuth}</p>
                            <p>Date Created: {listDetails[list._id].listDetails.dateCreated}</p>
                            <p>Last Modified: {listDetails[list._id].listDetails.lastModified}</p>
                            <p>Visibility: {listDetails[list._id].listDetails.visibility}</p>
                            <p>Rating: {listDetails[list._id].listDetails.rate} / 5</p>

                            <h4>Reviews:</h4>
                            {listDetails[list._id].listDetails.reviews.map((review, index) => (
                                <div key={index}>
                                    <p>User: {review.user}</p>
                                    <p>Comment: {review.comment}</p>
                                    <p>Rating: {review.rating} / 5</p>
                                </div>
                            ))}

                            <h4>Superheroes:</h4>
                            {listDetails[list._id].superheroInformation.map((heroInfo, index) => (
                                <div key={index}>
                                    <h5>Hero {index + 1}:</h5>
                                    <p>Name: {heroInfo.hero.name}</p>
                                    <p>Gender: {heroInfo.hero.Gender}</p>
                                    <p>Eye color: {heroInfo.hero["Eye color"]}</p>
                                    <p>Race: {heroInfo.hero.Race}</p>
                                    <p>Publisher: {heroInfo.hero.Publisher}</p>
                                    <p>Powers:</p>
                                    <ul>
                                        {Object.entries(heroInfo.power)
                                            .filter(([powerKey, powerValue]) => powerValue === "True")
                                            .map(([powerKey, powerValue], powerIndex) => (
                                                <li key={powerIndex}>
                                                    {powerKey}: {powerValue}
                                                </li>
                                            ))}
                                    </ul>


                                </div>
                            ))}

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListsDisplay;
