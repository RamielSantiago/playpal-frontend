const express = require('express');
const router = express.Router();
const player = require('../models/users');
const game = require('../models/games');
const app = express();
app.use(express.json());

//Get All Players
const searchAll = async (req, res) => {
    try{
        const players = await player.find();
        res.json(players);
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

//Get One Player
const searchOne = async (req, res) => {
    const email = req.query.email || req.body?.email;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    try {
        const found = await player.findOne({ email });
        if (!found) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json({ fullName: found.fullName, email: found.email });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

//Add One Player
const addPlayer = async (req, res) => {
    const {email} = req.body;
    try{
        const exists = await player.findOne({email: email})
        if(exists){
            res.status(200).json("User already exists");
        } else {
            const user = await player.create({email}); 
            res.status(200).json(user);
        }
       }catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

//Update One Player
const updateOne = async (req, res) => {
    try{
        const exists = await player.findOne({name: req.body.email});
        if(!exists){
            res.status(404).json("Person does not Exist");
        } else {
            let newBio = exists.bio;
            let newFavs = exists.favSports
            if(req.body.bio != null && !(req.body.bio === newBio)){
                newBio = req.body.bio
            } 
            if(req.body.favSports != null && !(req.body.bio === newBio)){
                newFavs = req.body.favSports;
            }
            const update = await player.findOneAndUpdate({name: req.body.name}, {$set: {bio: newBio, favSports: newFavs}});
            res.status(200).json("Event Updated");
        }
       }catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
       }
}

//Delete One Player
const deleteOne = async (req, res) => {
    try {
        const { id } = req.body;
        const toDelete = await player.findByIdAndDelete(id);

     if(!toDelete){
        res.status(404).json({error: "No such user"});
    }
     res.status(200).json(toDelete);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Add One Event
const addSched = async (req, res) => {
    try{
        const exists = await game.findOne({name: req.body.name})
        if(exists){
            res.status(200).json("Event already exists");
        } else {
            const user = await game.create({name:req.body.name, description:req.body.description, sport:req.body.sport,
                                            date:req.body.date, place: req.body.place, organizerEmail: req.body.organizerEmail,
                                            memberEmails: req.body.memberEmails, capacity: req.body.capacity});
            }; 
            res.status(200).json("Event added");
        }
       catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

//Update Event Params should be (name, newName date, place, capacity)
const updateSched = async (req, res) => {
    try{
        const exists = await game.findOne({name: req.body.name});
        if(!exists){
            res.status(404).json("Event does not Exist");
        } else {
            let eventName = exists.name;
            let newDesc = exists.description;
            let newSport = exists.sport;
            let newPlace = exists.place;
            let newDate = exists.date;
            let newCapacity = exists.capacity;
            if(req.body.name != req.body.newName && (req.body.newName != "" && req.body.newName != null)){
                eventName = req.body.newName
            } 
            if(req.body.description != "" && req.body.description != null){
                newDesc = req.body.description;
            } 
            if(req.body.sport != "" && req.body.sport != null){
                newSport = req.body.sport;
            } 
            if(req.body.date != "" && req.body.date != null){
                newSport = req.body.date;
            } 
            if(req.body.place != "" && req.body.place != null){
                newSport = req.body.place;
            } 
            if(req.body.capacity != null){
                newSport = req.body.capacity;
            } 
            const update = await game.findOneAndUpdate({name: req.body.name}, {$set: {name: eventName, description:newDesc, sport: newSport,
                                                                            date: newDate, place: newPlace, capacity: newCapacity}});
            res.status(200).json("Event Updated");
        }
       }catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

//Add someone to an event
const joinGame = async (req, res) => {
    try{
        const exists = await game.findOne({name: req.body.name})
        let players = exists.memberEmails;
        if(players.includes(req.body.newMember)){
            res.status(202).json("Player already exists");
        }else{
            const update = await game.findOneAndUpdate({name: req.body.name},{ $push: {memberEmails: req.body.newMember}}); 
            res.status(200).json("Event Updated");
        }
       }catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

//Remove someone from an event
const quitGame = async (req, res) => {
    try{
        const exists = await game.findOne({name: req.body.name})
        let players = exists.memberEmails;
        if(!players.includes(req.body.newMember)){
            res.status(202).json("Player does not exist");
        }else{
            const update = await game.findOneAndUpdate({name: req.body.name},{ $pull: {memberEmails: req.body.newMember}}); 
            res.status(200).json("Event Updated");
        }
       }catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

const searchAllGames = async (req, res) => {
    try{
        const events = await game.find();
        res.json(events);
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = {addPlayer, searchAll, searchOne, deleteOne, 
                  updateOne, addSched, updateSched, joinGame, 
                  quitGame, searchAllGames}