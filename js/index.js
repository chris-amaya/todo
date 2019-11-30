const taskText = document.getElementById('taskText');
let errors = [];

taskText.addEventListener('keydown', (e) => handlerAddTask(e), false);
document.addEventListener('click', (e) => handlerDocumentClick(e), false);
document.addEventListener('DOMContentLoaded', handlerDocumentLoad(e), false);

async function handlerDocumentLoad(e) {
    let reqTasks = await fetch('controllers/tasks.controller.php');
    let resTasks = reqTasks.json();
    console.log(resTasks);
}

async function handlerDocumentClick(e) {
    if(e.target.id == 'addTask') {
        addTask();
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
    console.log(resAddTask);
} 

async function renderTasks(tasks) {

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