const express = require('express');
const router = express.Router();
const Post = require('../Post');
const pool = require('../../database/db');

let allPosts = [];
let completedPosts = [];

const deletePost = async(id) => {
    try {
        await pool.query("DELETE FROM todo WHERE id_todo = $1", [id]);
        allPosts = allPosts.filter((post) => post.id !== id);
        completedPosts = completedPosts.filter((post) => post.id !== id);
    } catch (error) {
        console.error(error.message);
    }
};

const completePost = async(id) => {
    try {
        const index = allPosts.findIndex((post) => post.id === id);
        await pool.query("UPDATE todo SET completed = true WHERE id_todo = $1;", [id]);
        if (index !== -1) {
            allPosts[index].completed = true;
            completedPosts.push(allPosts[index]);
            allPosts.splice(index, 1);
        }
    } catch (error) {
        console.error(error.message);
    }
};

const createPost = async(title, body) => {
    try {
        await pool.query("INSERT INTO todo (titulo, corpo) VALUES ($1, $2)", [title, body]);
        const response = await pool.query('SELECT * FROM todo ORDER BY id_todo DESC LIMIT 1');
        const { id_todo, titulo, corpo } = response.rows[0];
        const newPost = new Post( titulo, corpo, id_todo);
        allPosts.push(newPost);
    } catch (error) {
        console.error(error.message);
    }
};

const showPost = async() => {
    try {
        const index = allPosts.findIndex((post) => post.completed === true);
        if (index !== false) {
            completedPosts.push(allPosts[index]);
            allPosts.splice(index, 1);
        } else {
            allPosts = [];
            const response = await pool.query('SELECT * FROM todo ORDER BY id_todo DESC LIMIT 1');
            const { id_todo, titulo, corpo } = response.rows[0];
            const newPost = new Post( titulo, corpo, id_todo);
            allPosts.push(newPost);  
        }

    } catch (error) {
        console.error(error.message);
    }
}

router.use(express.json());

router.post('/', async(req, res) => {
    try {
        const { title, body } = req.body;
        createPost(title, body);
        res.json(allPosts);
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/to-do', async(req, res) => {
    try {
        await showPost();
        res.send(allPosts);
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/completed', async(req, res) => {
    try {
        res.send(completedPosts);
    } catch (error) {
        console.error(error.message);
    }
});


router.delete('/:id/delete', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deletePost(id);
    } catch (error) {
        console.error(error.message);
    }
});

router.put('/:id/complete', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await completePost(id);
    } catch (error) {
        console.error(error.message);
    }
});


module.exports = router;