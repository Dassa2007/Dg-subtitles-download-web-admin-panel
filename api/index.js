const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://gimahandasun_db_user:wBQRsaPleVoFEXSK@cluster0.k2jdqob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch(err => console.log(err));

const subSchema = new mongoose.Schema({
    title: String,
    episode: String,
    directLink: String,
    telegramLink: String,
    date: { type: Date, default: Date.now }
});
const Subtitle = mongoose.model('Subtitle', subSchema);

app.get('/api/add', async (req, res) => {
    try {
        const { title, episode, directLink, telegramLink } = req.query;
        const newSub = new Subtitle({ title, episode, directLink, telegramLink });
        await newSub.save();
        res.json({ message: "Added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
