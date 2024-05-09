class Task {
     constructor(value, boolStatus = false, background = 'teal', disabled = false) {
          this.value = value;
          this.boolStatus = boolStatus;
          this.background = background;
          this.disabled = disabled;
     }
}

class TaskManager {
     constructor() {
          this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          this.wrapper = document.getElementById('wrapper');
          this.main = document.getElementById('main');
          this.createTask = document.getElementById('createTask');
          this.inputAdd = document.getElementById('inputAdd');
          this.btnAdd = document.getElementById('btnAdd');
          this.render();
     }

     render() {
          this.main.innerHTML = '';
          this.tasks.forEach((task, index) => {
               const taskPanel = document.createElement('div');
               taskPanel.className = 'task-panel';

               const count = document.createElement('span');
               count.className = 'task-panel__number';
               count.textContent = `${index + 1}`.padStart(2, '0') + '.';

               const inputContainer = document.createElement('div');
               inputContainer.className = 'task-panel__input-container';
               inputContainer.style.background = task.background;

               const taskInput = document.createElement('input');
               taskInput.className = 'task-panel__input';
               taskInput.value = task.value;
               taskInput.disabled = task.disabled;
               taskInput.type = 'text';

               const taskCheckbox = document.createElement('input');
               taskCheckbox.className = 'task-panel__checkbox';
               taskCheckbox.type = 'checkbox';
               taskCheckbox.checked = task.boolStatus;
               inputContainer.append(taskInput, taskCheckbox);
               const delleteBtn = document.createElement('button');

               delleteBtn.className = 'dellete';
               delleteBtn.textContent = 'dell.';
               taskPanel.append(count, inputContainer, delleteBtn);

               taskInput.addEventListener('input', () => {
                    this.tasks[index].value = taskInput.value;
                    this.saveTasks();
               });

               taskCheckbox.addEventListener('change', () => {
                    this.tasks[index].boolStatus = taskCheckbox.checked;
                    this.tasks[index].background = taskCheckbox.checked ? 'grey' : 'teal';
                    this.tasks[index].disabled = taskCheckbox.checked;
                    
                    inputContainer.style.background = this.tasks[index].background;
                    taskInput.disabled = this.tasks[index].disabled;
                    this.saveTasks();
               });

               delleteBtn.addEventListener('click', () => {
                    this.tasks.splice(index, 1);
                    this.saveTasks();
                    this.render();
               });

               this.main.append(taskPanel);
          });
     }

     addTask() {
          const value = this.inputAdd.value.trim();
          if (value !== '') {
               this.tasks.push(new Task(value));
               this.inputAdd.value = '';
               this.saveTasks();
               this.render();
          }
     }

     saveTasks() {
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
     }

     init() {
          this.btnAdd.addEventListener('click', () => {
               this.addTask();
          });
     }
}

const taskManager = new TaskManager();
taskManager.init();
