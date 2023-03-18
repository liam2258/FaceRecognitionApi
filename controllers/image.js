import Clarifai from 'clarifai';

//Connects to Clarifai using api key
const app = new Clarifai.App({
    apiKey: API_KEY
   });

//Sends request to Clarifai api
function handleApiCall(req, res) {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to call Api'))
}

//Updates counter in database for user making request
function handleImage(req, res, db) {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Error getting entries'))
}

export default {handleImage, handleApiCall}