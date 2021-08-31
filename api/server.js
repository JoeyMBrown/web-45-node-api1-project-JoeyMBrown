// BUILD YOUR SERVER HERE
const express = require('express');
const database = require('./users/model');

const server = express();

server.use(express.json()) //Teaches express to read json

server.post('/api/users', (req, res) => {
    const newUser = req.body

    if(newUser.name && newUser.bio) {
    database.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(400).json({ message: "Please provide name and bio for the user"})
    }
})

server.get('/api/users', (req, res) => {
    database.find()
    .then(users => {
        if(users) {
            res.json(users)
        } else {
            res.status(500).json({ message: "The users information could not be retrieved"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

server.get('/api/users/:id', (req, res) => {
    database.findById(req.params.id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    database.remove(req.params.id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'User does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user could not be removed" })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    if(id !== '' && changes.bio && changes.name) {
        database.update(id, changes)
            .then(updatedUser => {
                if(updatedUser) {
                    res.status(200).json(updatedUser)
                } else if(!updatedUser) {
                    res.status(404).json({ message: "The user with the specified ID does not exist" })
                }})
            .catch (err => {
                console.log(err)
                res.status(500).json({ message: "The user information could not be modified" })
            }
        )
    }  else {
            res.status(400).json({ message: "Please provide name and bio for the user" })
    }
})

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server working'})
})

server.use('*', (req, res) => {
    res.status(404).json({ message: 'sorry, no route found!'}) //Order matters!
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
