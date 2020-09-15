const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const fetch = require('node-fetch');

//API access info
const username = "findagig";
const pw = "m74tgzy6hyxb";
let data; 
const musicTypes = "(146,145,279,154,276,278,277,290,255,286,106,147,248,148,28,150,156,151,153,152,302,265,149)";


app.listen(3000, ()=> {
    console.log('listening at 3000');
    fetch(`https://api.eventfinda.co.nz/v2/events.json?rows=20&category=${musicTypes}`, {
    method: 'GET',    
    headers: {'Authorization': 'Basic ' + Buffer.from(`${username}:${pw}`).toString('base64')},

    })
    .then (response => response.json())
    .then(eventData => {
        console.log("Retrieved data from EventFinda API");
        data = eventData.events;
    })
    .catch(err => console.log(err));
})

// Let client JS access data from EventFinda API
app.get('/getData', (req, res) => {
    res.json({
        body: data
    })
})