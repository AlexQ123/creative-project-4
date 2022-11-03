const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/game', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const playerSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    slogan: String,
    highscore: Number,
});

playerSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
});

playerSchema.set('toJSON', {
    virtuals: true
});

const Player = mongoose.model('Player', playerSchema);

app.get('/api/players', async (req, res) => {
    try {
        let players = await Player.find();
        res.send({
            players: players
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/players', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        nickname: req.body.nickname,
        slogan: req.body.slogan,
        highscore: 0
    });
    try {
        await player.save();
        res.send({
            player: player
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/players/:id', async (req, res) => {
    try {
        await Player.deleteOne({
          _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/players/:id/:highscore', async (req, res) => {
    try {
        const result = await Player.updateOne(
            { _id: req.params.id },
            { $set: { highscore: req.params.highscore } }
        );
        res.send({
            result: result
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));