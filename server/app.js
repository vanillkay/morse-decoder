const express = require('express');
const path = require("path");
const app = express();


if (process.env.TYPE !== 'DEV'){
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    })
}


async function start() {
    try {
        //starting server
        app.listen(process.env.PORT || 3000, () => {
            console.log('Server has been started  ...');
        });
    } catch (e) {
        //logging error
        console.log(e)
    }
}

start();