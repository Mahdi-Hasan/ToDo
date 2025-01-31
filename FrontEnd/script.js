document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');
    
    const API_URL = 'http://localhost:3000/api';

    // Fetch all todos
    async function fetchTodos() {
        try {
            const response = await fetch(`${API_URL}/todos`);
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    // Render todos
    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            // Toggle completion
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', async () => {
                try {
                    await fetch(`${API_URL}/todos/${todo.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ completed: checkbox.checked }),
                    });
                    fetchTodos();
                } catch (error) {
                    console.error('Error updating todo:', error);
                }
            });

            // Delete todo
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', async () => {
                try {
                    await fetch(`${API_URL}/todos/${todo.id}`, {
                        method: 'DELETE',
                    });
                    fetchTodos();
                } catch (error) {
                    console.error('Error deleting todo:', error);
                }
            });

            todoList.appendChild(li);
        });
    }

    // Add new todo
    async function addTodo(text) {
        if (text.trim() !== '') {
            try {
                await fetch(`${API_URL}/todos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: text }),
                });
                todoInput.value = '';
                fetchTodos();
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    }

    // Event listeners
    addTodoBtn.addEventListener('click', () => {
        addTodo(todoInput.value);
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(todoInput.value);
        }
    });

    // Initial fetch
    fetchTodos();
}); 