import React from 'react';
import './styles.css'; // Update the path as necessary
import { Link } from 'react-router-dom'
import HeroDashboard from '../components/HeroDashboard';


const Unauth = () => {
    return (
        <div>
            <h1 id="big-title">Time to find your next favorite superheros.</h1>
            <h2>With great power comes great repsonsibility. This website has the ability to search for thousnads of superheros. </h2>
            <HeroDashboard />
       </div>

    );
};

export default Unauth;
