//Install express server
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;
const host = '0.0.0.0';

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/<name-of-app>'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
});

app.listen(port, host);