document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
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
            checkbox.addEventListener('change', () => {
                todos[index].completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            // Delete todo
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            todoList.appendChild(li);
        });
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add new todo
    function addTodo(text) {
        if (text.trim() !== '') {
            todos.push({
                text: text,
                completed: false
            });
            saveTodos();
            renderTodos();
            todoInput.value = '';
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

    // Initial render
    renderTodos();
}); 