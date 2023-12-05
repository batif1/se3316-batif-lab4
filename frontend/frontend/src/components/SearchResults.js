import React, { useState } from 'react';

const SearchResults = ({ results }) => {
    console.log("FROM COMPONENT")
    console.log(results)
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div>
            {results.map(hero => (
                <div key={hero.id} className="hero-card">
                    <div className="hero-summary" onClick={() => toggleExpand(hero.id)}>
                        <h2>{hero.name}</h2>
                        <p>{hero.Publisher}</p>
                    </div>
                    {expandedId === hero.id && (
                        <div className="hero-details">
                            <p>Gender: {hero.Gender}</p>
                            <p>Eye Color: {hero["Eye color"]}</p>
                            <p>Race: {hero.Race}</p>
                            <p>Hair Color: {hero["Hair color"]}</p>
                            <p>Height: {hero.Height} cm</p>
                            <p>Publisher: {hero.Publisher}</p>
                            <p>Skin Color: {hero["Skin color"]}</p>
                            <p>Alignment: {hero.Alignment}</p>
                            <p>Weight: {hero.Weight} lbs</p>
                            <a href={`https://duckduckgo.com/?q=${hero.name}`}>Web Search</a>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default React.memo(SearchResults);

