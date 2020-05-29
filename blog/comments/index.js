const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(request,response)=>{
    response.send(commentsByPostId[request.params.id] || []);
});

app.post('/posts/:id/comments',async (request,response)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = request.body;
    const comments = commentsByPostId[request.params.id] || [];
    comments.push({id:commentId,content});
    commentsByPostId[request.params.id] = comments;
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId: request.params.id
        }
    });

    response.status(201).send(comments);
});

app.post('/events',(request,response)=>{
    const event = request.body;
    console.log("Received event",event);
    response.send({});
});

app.listen(4001,()=>{
    console.log("Comments server started on port 4001"); 
});

