const express = require('express');
const app = express();

app.use(express.static(__dirname + '/assets'));




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
})













app.listen(8080, (error) => {
    if(error) {
        console.log("The server encountered an error at startup");
        return;
    }
    console.log("The server is running at port ", 8080);
});


