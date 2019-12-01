const taskText = document.getElementById('taskText');
let errors = [];

function templateTodos(task) {

    return `
    <div class="item" data-idtask=${task.idTodo}>
        <p>${task.task}</p>
        <div class="controls">
            <div class="delete-container">
                <i class="far fa-trash-alt" id="deleteTask"></i>
            </div>
            <div class="edit-container">
                <i class="fas fa-pen" id="editTask"></i>
            </div>
            <div>
                <label>
                    <input type="checkbox" id="checkboxTastComplete">
                    <span></span>
                </label>
            </div>
            
        </div>
    </div>
    `
}
taskText.addEventListener('keydown', (e) => handlerAddTask(e), false);
document.addEventListener('click', (e) => handlerDocumentClick(e), false);
document.addEventListener('DOMContentLoaded', (e) => handlerDocumentLoad(e), false);

async function handlerDocumentLoad(e) {
    let reqTasks = await fetch('controllers/tasks.controller.php');
    let resTasks = await reqTasks.json();
    // console.log(resTasks);
    renderTasks(resTasks.tasks)
}

async function handlerDocumentClick(e) {
    if(e.target.id == 'addTask') {
        addTask();
    }

    if(e.target.id == 'deleteTask') {
        if(confirm('Esta seguro que desea eliminar éste tarea?')) {
            deleteTask(e);
        }
    }
}

async function handlerAddTask(e) {
    if(e.key === 'Enter') {
        addTask();
    }
}

async function addTask() {

    // if(!validateInputTask()) return;


    let reqAddTask = await fetch('controllers/addTask.controller.php', {
        method: 'POST',
        body: JSON.stringify({
            task: taskText.value,
        }),
        headers: {
            'Content-Type': 'json/application'
        }
    });
    let resAddTask = await reqAddTask.json();
    if(resAddTask.status == true) {
        // document.getElementById('items').innerHTML
        let task = {
            idTodo: resAddTask.id,
            task: taskText.value
        }
        document.getElementById('items').innerHTML += templateTodos(task)
    }
    console.log(resAddTask);

} 

async function renderTasks(tasks) {

    tasks.forEach((task, index) => {
        // console.log(task);
        document.getElementById('items').innerHTML += templateTodos(task)
        
    })

}

async function deleteTask(e) {
    let idTask = e.target.parentElement.parentElement.parentElement.dataset.idtask;
    let reqDeleteTask = await fetch('controllers/deleteTask.controller.php', {
        method: 'POST',
        body: JSON.stringify({
            idTask: idTask
        }),
        headers: {
            'Content-Type': 'json/application'
        }
    })
    let resDeleteTask = await reqDeleteTask.json();
    // console.log(resDeleteTask);
    if(resDeleteTask == true) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
}

function validateInputTask() {
    if(taskText.value == '') {
        errors.push('favor de agregar una tarea')
    }

    if(errors.length > 0) {
        let stringErrors = '';
        errors.forEach((error, index) => {
            stringErrors += `\n ${error}`
        })

        alert(stringErrors)
        errors = [];
        return false;
    } else {
        return true;
    }
}