const express = require('express')
const app = express()
// const api = require('./api'); // Uncomment for full CRUD
const morgan = require('morgan') // logger
const bodyParser = require('body-parser')
const cors = require('cors')

app.set('port', (process.env.PORT || 7070))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

/**
 * Simple mongoose connection
 * https://mongoosejs.com/
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
/**
 * Connected or error
 */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

function Save() {

    const Cat = mongoose.model('Cat', { name: String, age: Number });

    const kitty = new Cat({ name: 'From Web API', age: 99 });
    kitty.save().then(() => console.log('meow'));

}
/**
 * CRUD Web API
 */
const PORT = 7070;

app.get('/cats', (req, res) => {
    res.send({ name: 'From Web API', age: 99 })
    console.log(req.url);
})

app.post('/cat', (req, res) => {
    Save(); // Save to MongoDB
    res.send(`{name: 'Bagira', age: 2 } saved rom Web`)
    console.log(req.url);
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})

/**
 * Uncomment bellow for full CRUD
 */

// app.use('/api', api)
// app.use(express.static('static'))

// app.use(morgan('dev'))

// app.use(function (req, res) {
// 	const err = new Error('Not Found')
// 	err.status = 404
// 	res.json(err)
// })

// //  MongoDB connection 
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/virtualstandups', { useNewUrlParser: true })
// // mongoose.connect('mongodb://demo:demo1234@ds255282.mlab.com:55282/virtualstandup', { useNewUrlParser: true })

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
// 	console.log('Connected to MongoDB')

// 	app.listen(app.get('port'), function () {
// 		console.log('API Server Listening on port ' + app.get('port') + '!')
// 	})
// })
