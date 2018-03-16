/* Dependencies */

const express = require('express');
const bodyParser = require('body-parser');
const bookController = require('./controllers/books');
const app = express();

/* General settings */

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/* Allowing all origin like localhost for all api calls */

app.all('*', function (req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});


/* API */
app.get('/books', bookController.listBooks);
app.post('/newBook', bookController.addBook);


/* Make the app 'listen' */
app.listen(app.get('port'), () => {
    console.log('app is running');
});