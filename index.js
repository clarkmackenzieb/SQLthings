const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');

const { dbUser, dbPass, database } = require('./config');

const port = 3005;
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/${database}`

const app = express();
// by default export this ^

// MUST HAVE: db folder--> SQL statements --> all that DB shit 


app.use(json());

const usersCtrl = require('./usersCtrl');

const massiveConnection = massive(connectionString)
    .then(db => {
    app.set('db', db)
})
    .catch(err => {
        console.log(err);
    })

app.get('/api/getusers', (req, res, next) => {
    const db = app.get('db');
    db.users.find({
        // you can put stuff in herem like 'name':'Shea'
    })
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            res.json(err);
        })
})

app.get('/api/users/', usersCtrl.getUserByName)

app.listen(port, ()=> {
    console.log(`I'll be right by your side till ${port}`);
})

