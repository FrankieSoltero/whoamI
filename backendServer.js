const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const req = require('express/lib/request');
const { stderr } = require('process');
const app = express();
const PORT = 3000;
// This will allow us to access the static files in my FrontEnd
app.use(express.static(path.join(__dirname,'frontEnd')));
//Here we define routes for our main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd', 'homePage.html' ));
});
//Here we define the route for our personal projects page
app.get('/PersonalProjects', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'PersonalProjects.html'));
});
//This will route the executed java project and capture the output 
app.get('/run-zombiegame', (req, res) => {
    exec('docker run --rm zombiegame', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
            return;
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});
app.listen(PORT, () => {
    console.log(`Server is running`);
});

