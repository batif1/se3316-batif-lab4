const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const Schema = mongoose.Schema;

console.log('privacy.js LOADED');

const privacySchema = new Schema({
    DMCA: {
        type: String,
        minlength: 3,
        maxlength: 500,
    },
    privacy: {
        type: String,
        required: true,
        // DATA VALIDATION
    },
    AUP: {
        type: String,
        required: true,
        // DATA VALIDATION
    },
});

const privacyDB = mongoose.model('privacy', privacySchema);

const router = express.Router();

// Get all privacy items
router.get('/DMCA', async (req, res) => {
    try {
        const privacyItem = await privacyDB.findOne({}, { DMCA: 1 });
        res.json(privacyItem.DMCA);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/privacy', async (req, res) => {
    try {
        const privacyItem = await privacyDB.findOne({}, { privacy: 1 });
        res.json(privacyItem.privacy);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/AUP', async (req, res) => {
    try {
        const privacyItem = await privacyDB.findOne({}, { AUP: 1 });
        res.json(privacyItem.AUP);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update privacy items

// Update the DMCA field
router.put('/DMCA', async (req, res) => {
    const newDMCA = req.body.DMCA; // Get the new DMCA value from the request body

    try {
        // Find the existing privacy document
        const privacyItem = await privacyDB.findOne();

        // Update the DMCA field with the new value
        privacyItem.DMCA = newDMCA;

        // Save the updated document
        await privacyItem.save();

        res.json({ message: 'DMCA field updated successfully', updatedDMCA: newDMCA });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update DMCA field', error: err });
    }
});

// Update the privacy field
router.put('/privacy', async (req, res) => {
    const newPrivacy = req.body.privacy; // Get the new privacy value from the request body

    try {
        // Find the existing privacy document
        const privacyItem = await privacyDB.findOne();

        if (!privacyItem) {
            return res.status(404).json({ message: 'Privacy document not found' });
        }

        // Update the privacy field with the new value
        privacyItem.privacy = newPrivacy;

        // Save the updated document
        await privacyItem.save();

        res.json({ message: 'Privacy field updated successfully', updatedPrivacy: newPrivacy });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update Privacy field', error: err.message });
    }
});


// Update the AUP field
router.put('/AUP', async (req, res) => {
    const newAUP = req.body.AUP; // Get the new AUP value from the request body

    try {
        // Find the existing privacy document
        const privacyItem = await privacyDB.findOne();

        // Update the AUP field with the new value
        privacyItem.AUP = newAUP;

        // Save the updated document
        await privacyItem.save();

        res.json({ message: 'AUP field updated successfully', updatedAUP: newAUP });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update AUP field', error: err });
    }
});

// Create a new privacy document
router.post('/', async (req, res) => {
    const { DMCA, privacy, AUP } = req.body; // Get values from the request body

    try {
        // Check if a privacy document already exists
        const existingPrivacy = await privacyDB.findOne();

        if (existingPrivacy) {
            return res.status(400).json({ message: 'Privacy document already exists' });
        }

        // Create a new privacy document with the provided values
        const newPrivacy = new privacyDB({
            DMCA,
            privacy,
            AUP,
        });

        // Save the new document
        await newPrivacy.save();

        res.status(201).json({ message: 'Privacy document created successfully', privacy: newPrivacy });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create privacy document', error: err });
    }
});


module.exports = router;
