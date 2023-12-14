const todos = {
  currentFilter: 'All',
  todoList: JSON.parse(localStorage.getItem('todoList')) || [],
  init: function () {
    todos.getAllTodo();
    todos.updateNbOfItemLeft();

    const todoForm = document.querySelector('.todo__form');

    const items = document.querySelectorAll('.todo__list__item-checkbox');
    items.forEach(function (item) {
      item.addEventListener('change', function () {
        todos.updateNbOfItemLeft();

        if (todos.currentFilter !== 'All') {
          item.parentElement.parentElement.classList.add('--hidden');
        }
      });
    });

    todoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      todos.handleNewTodo(event);
      todos.updateNbOfItemLeft();
    });

    const completedItemsBtn = document.querySelector(
      '.todo__footer__clear-btn'
    );
    completedItemsBtn.addEventListener('click', todos.clearCompleted);

    const allFilter = document.getElementById('all');
    allFilter.addEventListener('change', todos.handleAllFilter);
    const activeFilter = document.getElementById('active');
    activeFilter.addEventListener('change', todos.handleActiveFilter);
    const completedFilter = document.getElementById('completed');
    completedFilter.addEventListener('change', todos.handleCompletedFilter);
  },
  handleNewTodo: function (event) {
    let formInput = document.getElementById('newTodoItem');
    let formInputValue = event.target[1].value;

    todos.todoList.push({ text: formInputValue, state: 'unchecked' });

    localStorage.setItem('todoList', JSON.stringify(todos.todoList));

    if (formInputValue === '') {
      return;
    } else {
      todos.makeTodoInDOM({ text: formInputValue });
      todos.updateNbOfItemLeft();

      formInput.value = '';
    }
  },
  updateNbOfItemLeft: function () {
    const itemLeftNb = document.querySelector('.todo__footer__items-left span');

    const items = document.querySelectorAll('.todo__list__item-checkbox');
    let itemsLeft = 0;

    if (items.length < 1) {
      itemLeftNb.textContent = 0 + ' ';
    }

    items.forEach(function (item) {
      if (!item.checked) {
        itemsLeft++;
      }
      itemLeftNb.textContent = itemsLeft + ' ';
    });
  },
  clearCompleted: function (event) {
    const container = document.querySelector('.todo__form');
    const listeItems = document.querySelectorAll('.todo__list__item-checkbox');

    event.preventDefault();

    listeItems.forEach(function (item) {
      let isChecked = item.checked;
			console.log(item);

      if (isChecked) {
        const textItem = item.nextElementSibling.textContent;

        const itemToDelete = todos.todoList.findIndex(
          (todoItem) => todoItem.text === textItem
        );

        todos.todoList.splice(itemToDelete, 1);

        localStorage.setItem('todoList', JSON.stringify(todos.todoList));
        todos.updateNbOfItemLeft();
        container.removeChild(item.parentElement.parentElement);
      }
    });

    todos.updateNbOfItemLeft();
  },
  handleAllFilter: function () {
    const items = document.querySelectorAll('.todo__list__item-checkbox');
    items.forEach(function (item) {
      item.parentElement.parentElement.classList.remove('--hidden');
    });
    todos.currentFilter = 'All';
  },
  handleActiveFilter: function () {
    const items = document.querySelectorAll('.todo__list__item-checkbox');
    items.forEach(function (item) {
      if (item.checked) {
        item.parentElement.parentElement.classList.add('--hidden');
      } else {
        item.parentElement.parentElement.classList.remove('--hidden');
      }
    });
    todos.currentFilter = 'Active';
  },
  handleCompletedFilter: function () {
    const items = document.querySelectorAll('.todo__list__item-checkbox');
    items.forEach(function (item) {
      if (!item.checked) {
        item.parentElement.parentElement.classList.add('--hidden');
      } else {
        item.parentElement.parentElement.classList.remove('--hidden');
      }
    });
    todos.currentFilter = 'Completed';
  },
  makeTodoInDOM: function (todo) {
    const template = document.getElementById('template-todo');

    const newTodo = document.importNode(template.content, true);

    const todoContainer = document.querySelector('.todo__form');

    if (todo.state === 'checked') {
      newTodo.querySelector('input[type="checkbox"]').checked = true;
    }

    newTodo.querySelector('label').textContent = todo.text;

    newTodo.querySelector('.icon-close').addEventListener('click', (event) => {
      todos.deleteTodo(event);
    });

    newTodo
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', (event) => {
        todos.updateNbOfItemLeft();
        todos.handleState(event);
      });

    todoContainer.append(newTodo);
  },
  deleteTodo: function (event) {
    const todoContainer = document.querySelector('.todo__form');

    const item = event.target.closest('.todo__list-item-container');
    console.log('item:', item);

    const textItem = item.querySelector('label').textContent;

    todoContainer.removeChild(item);

    const itemToDelete = todos.todoList.findIndex(
      (todoItem) => todoItem.text === textItem
    );
    todos.todoList.splice(itemToDelete, 1);

    localStorage.setItem('todoList', JSON.stringify(todos.todoList));
    todos.updateNbOfItemLeft();
  },
  getAllTodo: function () {
    const todoString = localStorage.getItem('todoList');
    const todoArray = JSON.parse(todoString);

    if (todoArray) {
      for (const list of todoArray) {
        todos.makeTodoInDOM(list);
      }
    }
  },
  handleState: function (event) {
    const item = event.target.closest('.todo__list-item-container');

    const textItem = item.querySelector('label').textContent;

    const indexItemToUpdate = todos.todoList.findIndex(
      (todoItem) => todoItem.text === textItem
    );

    const itemState = todos.todoList[indexItemToUpdate].state;
    console.log('itemState:', itemState);

    if (itemState === 'unchecked') {
      todos.todoList[indexItemToUpdate].state = 'checked';
    } else {
      todos.todoList[indexItemToUpdate].state = 'unchecked';
    }

    console.log(todos.todoList[indexItemToUpdate].state);
    localStorage.setItem('todoList', JSON.stringify(todos.todoList));
    console.log(localStorage);
  },
};
