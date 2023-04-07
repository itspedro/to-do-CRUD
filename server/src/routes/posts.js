const express = require('express');
const router = express.Router();
const Post = require('../Post');

let allPosts = [];
let completedPosts = [];

const deletePost = (id) => {
    allPosts = allPosts.filter((post) => post.id !== id);
    completedPosts = completedPosts.filter((post) => post.id !== id);
};

const completePost = (id) => {
    const index = allPosts.findIndex((post) => post.id === id);
    if (index !== -1) {
        allPosts[index].completed = true;
        completedPosts.push(allPosts[index]);
        allPosts.splice(index, 1);
    }
};

const createPost = (title, body) => {
    const newPost = new Post(title, body);
    allPosts.push(newPost);
};

router.use(express.json());

router.get('/to-do', (req, res) => {
    res.send(allPosts);
});

router.get('/completed', (req, res) => {
    res.send(completedPosts);
});


router.post('/', (req, res) => {
    const { title, body } = req.body;
    createPost(title, body);
    res.json(allPosts);
});

router.delete('/:id/delete', (req, res) => {
    const id = parseInt(req.params.id);
    deletePost(id);
});

router.put('/:id/complete', (req, res) => {
    const id = parseInt(req.params.id);
    completePost(id);
});


module.exports = router;