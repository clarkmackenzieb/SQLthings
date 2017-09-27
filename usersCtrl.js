
const getUserByName = (req, res, next) => {
    //endpoint w callback
    
    //connecting db
    const db = req.app.get('db');
    //bringing in ur thing from the DB folder PASSING IN VALUES ALWAYS HAS TO BE IN AN ARRAY
    db.getUserByName([req.query.name]).then(response => {
        //returning the thing
        res.json(response)
    })
}

module.exports = {
    getUserByName
}