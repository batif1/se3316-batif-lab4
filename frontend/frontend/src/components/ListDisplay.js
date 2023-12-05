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

    const toggleExpandList = async (listId) => {
        setExpandedListId(expandedListId === listId ? null : listId);
        const list = lists.find(l => l._id === listId);
        if (listId && !listDetails[listId] && list) {
            const details = await getListInfo(list.listName);
            setListDetails({ ...listDetails, [listId]: details });
        }
    };

    return (
        <div>
            <h2>Superhero Lists</h2>
            {lists.map(list => (
                <div key={list._id} className="list-card">
                    <div className="list-summary" onClick={() => toggleExpandList(list._id)}>
                        <h3>
                            {list.listName} - Heroes: {list.items.length}
                            <span> Rating: {listRatings[list._id]} / 5</span>
                        </h3>
                        <p>Created by: {list.listAuth}</p>
                    </div>
                    {expandedListId === list._id && (
                        <div className="list-details">
                            {listDetails[list._id] && listDetails[list._id].map((detail, index) => (
                                <div key={index}>
                                    <p>Name: {detail.hero.name}</p>
                                    <p>Publisher: {detail.hero.Publisher}</p>
                                    {/* Add more details as needed */}
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
