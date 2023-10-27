const path = require('path');
const fs = require('fs');
const request = require('request');

let dataPath = path.join(__dirname, '../data.json');

request('https://lukes-projects.herokuapp.com/v1/hiphop', (err, res, body) => {
    if(err) console.log(err);

    fs.writeFile(dataPath, res.body, err => {
        if(err) console.log(err);
    });
});
console.log("Server is running");