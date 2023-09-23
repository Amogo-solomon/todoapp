window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })
    


//  GETTING A JSON CODE(JSON helps you to store strings, boolean, number, etc)
// local storage only allows you to store primitive fle use such as string, number,float,  file use and integger integer etc
newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false, 
        createdAt: new Date().getTime()
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    //reseting the inputed field
    e.target.reset();

    DisplayTodos();
})

DisplayTodos();
})

// WORKING ON TODO LIST DISPLAY
function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');

    //anytime we call the "displayTodo", it will clear the all the todo element/content.
    todoList.innerHTML = '';

    //looping through every todo list in our todo arrays
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')  //adding a class name to todoItem div

        //serving all the elements we need
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        //to check if the select is done or not done
        input.type = 'checkbox';
        input.checked = todo.done;//this will tell it if it's done or not done
        
        /*     ADDING CLASS LIST TO THE SERVED ELEMENT */
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        //TO CHANGE THE INNER HTML
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        //APPENDING ALL THE ELEMENT
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }
// any change made will be redisplayed after saving to local host 
            DisplayTodos();
        })

        // EDITING TODO LIST
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos()
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}


/* ASSIGNMENT; SORT THE TO DO LIST  */






