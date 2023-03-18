import emailValidator from 'email-validator';

function handleRegister (req, res, db, bcrypt) {
    const {name, email, password} = req.body;

    //Hashes password using bcrypt
    const hash = bcrypt.hashSync(password);

    //Makes sure email is valid and password is at least 8 characters
    if (!emailValidator.validate(email)) {
        return res.json('Please enter a valid email')
    } else if (password.length < 8) {
        return res.json('Password must be at least 8 characters long')
    }


    //Attempts to add registration to database, returns 400 status on failure
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(() => {
            trx('users')
            .returning('*')
            .insert({
                email: email,
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Error unable to register'))
}

export default {handleRegister}