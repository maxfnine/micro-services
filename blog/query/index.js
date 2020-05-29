const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts',(request,response)=>{
    response.send(posts);
});

app.post('/events',(request,response)=>{
    const {type,data} = request.body;

    if(type === 'PostCreated'){
        const {id,title} = data;
        posts[id]={id,title};
    }

    if(type === 'CommentCreated'){
        const {id,content,postId,status} = data;
        post = posts[postId];
        post.comments = post.comments || [];
        post.comments.push({id,content,status});
    }

    if(type === 'CommentUpdated'){
        const {id,content,postId,status} = data;
        post = posts[postId];
        const comment = post.comments.find(comment=>comment.id===id);
        comment.id = id;
        comment.content = content;
        comment.postId = postId;
        comment.status = status;
    }

    response.send({});
});

app.listen(4002, () => {
    console.log("Query server started on port 4002!");
});
