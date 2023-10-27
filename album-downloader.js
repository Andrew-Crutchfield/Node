const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

const url = 'https://lukes-projects.herokuapp.com/v1/hiphop';

rp(url)
.then((data) => {
    const albums = JSON.parse(data);
    albums.forEach((album) => {
        rp({url: album.imageURL, encoding: 'base64'}) 
          .then((imageData) => {
            fs.writeFile(path.join(__dirname, 'downloads', `${album.id}.jpg`), imageData, 'base64', (err) => {
              if (err) {
                console.error(`Failed to write file for album ${album.id}`);
              } else {
                console.log(`File written for album ${album.id}`);
              }
            });
          });
        })
})
.catch((err) => {
    console.error(err);
});