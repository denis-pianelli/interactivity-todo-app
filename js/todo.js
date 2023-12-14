const todo = {
  currentFilter: 'All',
  init: function () {
    todo.updateNbOfItemLeft();
    const todoForm = document.querySelector('.todo__form');

    const items = document.querySelectorAll('.todo__list__item-checkbox');
    items.forEach(function (item) {
      item.addEventListener('change', function () {
        todo.updateNbOfItemLeft();

        if (todo.currentFilter !== 'All') {
          item.parentElement.parentElement.classList.add('--hidden');
        }
      });
    });

    todoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      todo.handleNewTodo();
      todo.updateNbOfItemLeft();
    });

    const completedItemsBtn = document.querySelector(
      '.todo__footer__clear-btn'
    );
    completedItemsBtn.addEventListener('click', todo.clearCompleted);

    const allFilter = document.getElementById('all');
    allFilter.addEventListener('change', todo.handleAllFilter);
    const activeFilter = document.getElementById('active');
    activeFilter.addEventListener('change', todo.handleActiveFilter);
    const completedFilter = document.getElementById('completed');
    completedFilter.addEventListener('change', todo.handleCompletedFilter);

    const deleteIcons = document.querySelectorAll('.icon-close');
    deleteIcons.forEach(function (icon) {
      icon.addEventListener('click', function () {
        todoForm.removeChild(icon.parentElement.parentElement);
        todo.updateNbOfItemLeft();
      });
    });
  },
  handleNewTodo: function () {
    let formInput = document.getElementById('newTodoItem');
    let formInputValue = document.getElementById('newTodoItem').value;
    if (formInputValue === '') {
      return;
    } else {
      const todoItemsNb = document.querySelectorAll(
        '.todo__list-item-container'
      ).length;
      // Nouvelle div list-item-container
      const divEl = document.createElement('div');
      divEl.classList.add('todo__list-item-container');
      document.querySelector('.todo__form').appendChild(divEl);
      // Nouvelle div list-input-container
      const inputContainer = document.createElement('div');
      inputContainer.classList.add('todo__list-input-container');
      divEl.appendChild(inputContainer);
      // Nouvelle checkbox
      const newCheckbox = document.createElement('input');
      newCheckbox.setAttribute('type', 'checkbox');
      newCheckbox.setAttribute('name', 'todo');
      newCheckbox.classList.add('todo__list__item-checkbox');
      newCheckbox.id = `todo${todoItemsNb + 1}`;
      inputContainer.appendChild(newCheckbox);
      // Nouveau label
      const newLabel = document.createElement('label');
      newLabel.setAttribute('for', newCheckbox.id);
      newLabel.textContent = formInputValue;
      inputContainer.appendChild(newLabel);
      // Nouvelle div item-delete
      const itemDelete = document.createElement('div');
      itemDelete.classList.add('todo__item-delete');
      divEl.appendChild(itemDelete);
      // Nouvelle icon delete
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('icon-close');
      itemDelete.appendChild(deleteIcon);
      deleteIcon.addEventListener('click', function () {
        document
          .querySelector('.todo__form')
          .removeChild(deleteIcon.parentElement.parentElement);
          todo.updateNbOfItemLeft();
      });
      // Reset de l'input
      formInput.value = '';
      // Ajout event listener
      newCheckbox.addEventListener('change', function () {
        todo.updateNbOfItemLeft();

        if (todo.currentFilter !== 'All') {
          newCheckbox.parentElement.parentElement.classList.add('--hidden');
        }
      });
    }
  },
  updateNbOfItemLeft: function () {
    const itemLeftNb = document.querySelector('.todo__footer__items-left span');

    const items = document.querySelectorAll('.todo__list__item-checkbox');
    let itemsLeft = 0;

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
      if (isChecked) {
        container.removeChild(item.parentElement.parentElement);
      }
    });
    todo.updateNbOfItemLeft();
  },
  handleAllFilter: function () {
    const items = document.querySelectorAll('.todo__list__item-checkbox');
    items.forEach(function (item) {
      item.parentElement.parentElement.classList.remove('--hidden');
    });
    todo.currentFilter = 'All';
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
    todo.currentFilter = 'Active';
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
    todo.currentFilter = 'Completed';
  },
  handleDragAndDrop: function () {
    
  }
};
