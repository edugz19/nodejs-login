const { request } = require("express");
const express = require("express");
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req,res) => {
    const {title, description} = req.body;
    const newTask = {
        title, 
        description
    };
    await pool.query('INSERT INTO tasks SET ?', [newTask]);
    req.flash('success', 'Task saved successfully!');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req,res) => {
    const tasks = await pool.query('SELECT * FROM tasks');
    res.render('links/list', { tasks });
});

router.get('/delete/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    req.flash('success', 'Task deleted successfully!');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params;
    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.render('links/edit', {task: tasks[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const newTask = {
        title,
        description
    };
    await pool.query('UPDATE tasks SET ? WHERE id = ?', [newTask, id]);
    req.flash('success', 'Task updated successfully!');
    res.redirect('/links');
});

module.exports = router;