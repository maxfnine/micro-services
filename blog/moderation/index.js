const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events',async (request,response)=>{
    const {type,data} = request.body;
    if(type === 'CommentCreated'){
        const status = data.content.includes('orange')?'rejected':'approved';
        await axios.post('http://event-bus-srv:4005/events',{
        type:'CommentModerated',
        data:{
            id:data.id,
            content:data.content,
            postId: data.postId,
            status
        }
    });
    }

    response.send({});
});

app.listen(4003,()=>{
    console.log("Moderation server started on port 4003."); 
});