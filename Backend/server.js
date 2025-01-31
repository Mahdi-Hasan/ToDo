const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let todos = [];

// GET all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST new todo
app.post('/api/todos', (req, res) => {
    const todo = {
        id: Date.now(), // Simple way to generate unique id
        text: req.body.text,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// PATCH todo (toggle completion)
app.patch('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[todoIndex].completed = req.body.completed;
    res.json(todos[todoIndex]);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 