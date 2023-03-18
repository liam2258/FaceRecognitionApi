function handleProfile (req, res, db) {
    const {id} = req.params;

    //Retrieves user information from database
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
       if (user.length) {
        res.json(user[0]);
       } else {
        res.status(400).json('Not found');
       }
    })
    .catch(err => res.status(404).json('Error getting user'))
}

export default {handleProfile}