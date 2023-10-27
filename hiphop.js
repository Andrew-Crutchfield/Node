const fs = require('fs');
const requestPromise = require('request-promise');

const url = 'https://lukes-projects.herokuapp.com/v1/hiphop';

requestPromise(url)
    .then(response => {
        const albums = JSON.parse(response);

        let extractedAlbums = [];

        albums.forEach(album => {
            extractedAlbums.push({
                artist: album.artist,
                album: album.album,
                id: album.id
            });
        });

        fs.writeFile('favorite-albums.json', JSON.stringify(extractedAlbums), err => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Successfully wrote to favorite-albums.json!');
            }
        });
    })
    .catch(err => {
        console.error('Error making request:', err);
    });