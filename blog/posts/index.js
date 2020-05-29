const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts',(request,response)=>{
    response.send(posts);

});

app.post('/posts',async (request,response)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = request.body;
    posts[id] = {id,title};
    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
            id,
            title
        }
    });
    response.status(201).send(posts[id]);
});

app.post('/events',(request,response)=>{
    const event = request.body;
    console.log("Received event",event);
    response.send({});
});

app.listen(4000,()=>{
    console.log("Posts server has started on port 4000!");  
});