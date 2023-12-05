const Fuse = require('fuse.js');
const express = require('express');
const app = express();
const port = 4000;

const requireAuth = require('./middleware/requireAuth.js');

const router = express.Router();
const fs = require('fs');
const { parse } = require('path');
const bodyParser = require('body-parser'); // Import body-parser
app.use(bodyParser.json()); // Use body-parser middleware

//INSERT PUBLIC ACCESS THINGS




//router.use(requireAuth);

//MongoDB


const uri = "mongodb+srv://basharatif2003:mkQqf26u9xvDfqn@cluster0.pykducv.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require('mongoose');


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log("Connected to MongoDB database!");
});



const superheroSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    items: {
        type: [Number],
        required: true // Make the 'items' array required
    },
    listAuth: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    visibility: {
        type: String,
        default: 'private'
    },
    rate: {
        type: Number
    },
    reviews: [{
        user: String,
        comment: String,
        rating: Number
    }],
    description: {
        type: String
    }
});

module.exports = mongoose.model('Superhero', superheroSchema);

const SuperHeroListDB = mongoose.model('superHeroListDB', superheroSchema);


module.exports = SuperHeroListDB;

app.use(express.json());
app.use('/', express.static('../static'));


const userRoutes = require('./users.js');
app.use('/api/user', userRoutes);


function getHeros() {
    return new Promise((resolve, reject) => {
        fs.readFile('superhero_info.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const heros = JSON.parse(data);
                    resolve(heros);
                } catch (err) {
                    reject(err);
                }
            }
        });
    });
}


// Usage with async/await:
async function fetchHeros() {
    try {
        const heros = await getHeros();
    } catch (err) {
        console.error('Error fetching heroes:', err);
    }
}

fetchHeros();


function getPowers() {
    return new Promise((resolve, reject) => {
        fs.readFile('superhero_powers.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const heros = JSON.parse(data);
                    resolve(heros);
                } catch (err) {
                    reject(err);
                }
            }
        });
    });
}

async function fetchPowers() {
    try {
        const heros = await getPowers();
    } catch (err) {
        console.error('Error fetching Powers:', err);
    }
}

fetchPowers();

//middleware
app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`);
    next();//keep going
});

//Serves static files
//app.use('/static', express.static('static'));

// Route to get a specific hero by id
router.get('/:hero_id', async (req,res)=>{
    try{
        const heros = await getHeros();
        const id = parseInt(req.params.hero_id);
        const hero = heros.find(h => h.id === id);
        if (hero) {
            res.send(hero);
        }else{
            res.status(404).send('Hero not found');
        }
    }catch(err){
        console.error('Error fetching heroes:', err);
        res.status(500).send('Server error');
    }

});

// Route to get all heros
router.get('/', async (req, res) => {
    try {
        const heros = await getHeros();
        res.send(heros);
    }catch (err) {
        console.error('Error fetching heroes:', err);
        res.status(500).send('Server error');
    }
});


//To get all powers (the whole list)
app.get('/api/powers', async (req, res) => {
    try {
        const powers = await getPowers();
        res.send(powers);
    }catch (err) {
        console.error('Error fetching powers:', err);
        res.status(500).send('Server error');
    }
});


//To get a specific power by hero
app.get('/api/powers/:hero_id', async (req, res) => {
    try{
        const powers = await getPowers();
        const heros = await getHeros();
        const id = parseInt(req.params.hero_id);
        const heroName = heros.find(h => h.id === id);
        const power = powers.find(p => p.hero_names === heroName.name);
        if (power) {
            res.send(power);
        }else{
            res.status(404).send('Power not found');
        }
    }catch (err) {
        console.error('Error fetching powers:', err);
        res.status(500).send('Server error');
    }
});

//Get all publisher names
app.get('/api/publishers', async (req, res) => {
    try {
        const heros = await getHeros();
        const publishers = heros.map(h => h.Publisher);
        res.send(publishers);
    } catch (error) {
        console.error('Error fetching publishers:', err);
        res.status(500).send('Server error');
    }
});

/*
//Seaching
app.get('/api/search/:field/:query', async (req, res) => {
    try {
        const field = req.params.field;
        const pattern = req.params.query; // This is the search pattern
        const n = req.query.n ? parseInt(req.query.n, 10) : null;
        const heros = await getHeros(); // This function should return an array of heroes


        // Assuming the field is valid and exists on the hero objects
        const matchingSuperheroes = heros.filter(hero =>
            new RegExp(pattern, 'i').test(hero[field])
        );

        const limitedResults = (n && n > 0) ? matchingSuperheroes.slice(0, n) : matchingSuperheroes;
        res.json(limitedResults); // Send the result as a JSON response


    } catch (err) { // Corrected error variable name
        console.error('Error fetching heroes:', err);
        res.status(500).send('Server error');
    }
});


*/
app.get('/api/search/', async (req, res) => {
    try {
        const { name, id, race, publisher, power, n } = req.query;

        const heroesData = await getHeros();
        const powersData = await getPowers();

        // Combine hero data with power data
        const combinedData = heroesData.map(hero => ({
            ...hero,
            powers: powersData.find(p => p.hero_names === hero.name) || {}
        }));

        // Options for Fuse.js
        const options = {
            keys: ['name', 'id', 'Race', 'Publisher'], // Fields to search in
            threshold: 0.3 // Adjust this for more or less strict matching
        };

        // Create a new Fuse instance with the combined data and options
        const fuse = new Fuse(combinedData, options);

        // Search using Fuse.js
        const result = fuse.search(name || race || publisher || id);
        const matchedHeroes = result.map(item => item.item).slice(0, n ? parseInt(n, 10) : undefined);

        // Further filter for power if specified
        const finalResults = power ? matchedHeroes.filter(hero => hero.powers[power] === "True") : matchedHeroes;

        res.json(finalResults);

    } catch (err) {
        console.error('Error fetching heroes:', err);
        res.status(500).send('Server error');
    }
});



app.use('/api/heros', router)

app.listen(port, () => {
    console.log(`Listening on port ' ${port})`);
});
app.post('/api/lists', async (req, res) => {
    const { listName, items, username, visibility, reviews, description } = req.body;
    let { rate } = req.body;

    try {
        const listExists = await SuperHeroListDB.findOne({ listName: listName });

        if (listExists) {
            return res.status(400).send('List name already exists.');
        }

        if (!rate) {
            rate = 0; // Set default rating to 0 if not provided
        }

        const newList = new SuperHeroListDB({
            listName: listName,
            items: items || [],
            listAuth: username,
            visibility: visibility || 'private',
            rate: rate,
            reviews: reviews || [],
            description: description || ''
        });

        await newList.save();
        res.status(201).json({ message: 'New superhero list created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error when creating a new list.' });
    }
});




/*
app.post('/api/lists', async (req, res) => {
    const { listName } = req.body; //listName is an attribute of the JSON
    const {username} = req.body;

    //Error Handling if the list already exists
    try{
        const listExists = await SuperHeroListDB.findOne({ listName: listName});
        if (listExists){
            return res.status(400).send('List name already exists.');
        }

        const newList = new SuperHeroListDB({
            listName: listName,
            listAuth: username
        });

        await newList.save();
        res.status(201).send('New superhero list created.');
    }catch (error){
        console.error(error);
        res.status(500).send('Server error when creating a new list.');
    }
  });
*/
  app.get('/api/getlists', async (req, res) => {
    try {
        const lists = await SuperHeroListDB.find({});
        res.json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).send('Server error when fetching lists.');
    }
});



app.put('/api/lists/:listName', async (req, res) => {
    const { listName } = req.params;
    const { superheroIds, reviews } = req.body; // Include reviews in the request body

    try {
        const list = await SuperHeroListDB.findOne({ listName: listName });

        if (!list) {
            return res.status(404).send('List not found.');
        }

        list.items = superheroIds;

        // Update the lastModified date when the list is modified
        list.lastModified = new Date();

        // Update or add reviews with ratings
        if (reviews && reviews.length > 0) {
            reviews.forEach((review) => {
                if (review.rating) {
                    list.reviews.push({
                        user: review.user,
                        comment: review.comment,
                        rating: review.rating
                    });
                }
            });

            // Calculate the average rating
            const totalRatings = list.reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRatings / list.reviews.length;
            list.rate = averageRating;
        }

        await list.save();
        res.send('List updated with DB.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error when updating a list.');
    }
});

/*
app.put('/api/lists/:listName', async (req, res) => {
    const { listName } = req.params;
    const { superheroIds } = req.body;//"superheroIds" needs to be in the body

    try {
        const list = await SuperHeroListDB.findOne({ listName: listName });

        if (!list){
            return res.status(404).send('List not found.');
        }

        list.items = superheroIds;
        await list.save();
        res.send('List updated with DB.');
    }catch (error){
        console.error(error);
        res.status(500).send('Server error when updating a list.');
    }
  });
*/
//GET Request for the list

app.get('/api/lists/:listName', async (req, res) => {
    const { listName } = req.params;

    try {
        const list = await SuperHeroListDB.findOne({ listName: listName });

        if (!list) {
            return res.status(404).send('List not found.');
        }

        const response = {
            listName: list.listName,
            listAuth: list.listAuth,
            dateCreated: list.dateCreated,
            lastModified: list.lastModified,
            visibility: list.visibility,
            rate: list.rate,
            reviews: list.reviews,
            description: list.description,
            items: list.items
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error when getting a list.');
    }
});


//DELETE Request for the list
app.delete('/api/lists/:listName', async (req, res) => {
    const { listName } = req.params;

    try {
        const result = await SuperHeroListDB.deleteOne({ listName: listName });

        if (result.deletedCount === 0) {
            return res.status(404).send('List not found.');
        }

        res.send('List deleted.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error when deleting a list.');
    }
});


app.get('/api/lists/information/:listName', async (req, res) => {
    const { listName } = req.params;

    try {
        const heros = await getHeros();
        const powers = await getPowers();
        const results = [];

        const list = await SuperHeroListDB.findOne({ listName: listName });

        if (!list) {
            return res.status(404).send('List not found.');
        }

        // Include the new format for list details
        const listDetails = {
            listName: list.listName,
            listAuth: list.listAuth,
            dateCreated: list.dateCreated,
            lastModified: list.lastModified,
            visibility: list.visibility,
            rate: list.rate,
            reviews: list.reviews,
            description: list.description,
            items: list.items
        };

        for (const each of listDetails.items) {
            const id = parseInt(each, 10);
            console.log("Here is the ID:")
            console.log(id);
            const hero = heros.find(h => h.id === id);
            if (hero) {
                const power = powers.find(p => p.hero_names.includes(hero.name));
                if (power) {
                    results.push({
                        hero: hero,
                        power: power
                    });
                }
            }
        }

        if (results.length > 0) {
            // Include the list details along with the superhero information
            const response = {
                listDetails: listDetails,
                superheroInformation: results
            };
            res.json(response);
        } else {
            res.status(404).send('Hero or Power not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
