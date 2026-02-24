document.addEventListener("DOMContentLoaded", ()=>{
const storedTasks = JSON.parse(localStorage.getItem('tasks'))

if(storedTasks){
    storedTasks.forEach((task) => tasks.push(task))
    updatetaskslist();
    updateStats();
}
})

let tasks =  [];
const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}




const addTask = () => {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim()

    if(text){
      tasks.push({text:text, completed: false });
    
      updatetaskslist();
      updateStats();
      saveTasks();
    }
};
const toggletaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updatetaskslist();
    console.log({tasks})
    updateStats();
    saveTasks();
}
const deleteTask =(index) =>{
    tasks.splice(index,1);
    updatetaskslist();
    updateStats();
    saveTasks();
};
const editTask =(index) =>{
const taskInput = document.getElementById('taskInput')
taskInput.value = tasks[index].text

tasks.splice(index,1)
updatetaskslist();
updateStats();
saveTasks();
};
const updateStats = ()=>{
    const completedTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = ( completedTasks/totalTasks )*100
    const progressbar = document.getElementById('progress')
    progressbar.style.width = `${progress}%`
    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`
if(tasks.length && completedTasks === totalTasks){
    blaskconfetti();
}  

}






const updatetaskslist = () =>{
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''
    tasks.forEach((task,index)=>{
        const listItem = document.createElement('li')
        listItem.innerHTML = `
     <div class="taskItem">
    <div class="task ${task.completed ? 'completed':''}">
        <input type="checkbox" class="checkbox"  ${task.completed ? "checked" : ""}/>
        <p>${task.text}</p>
    </div>
    <div class="icons">
        <img src="edit.png" onClick="editTask(${index})"/>
        <img src="delete1.png" onclick="deleteTask(${index})"/>
    </div>
</div>
        `;
        listItem.addEventListener('change', ()=> toggletaskComplete(index))
            taskList.append(listItem);
    });
};

 document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();
 addTask();

})
const blaskconfetti = ()=>{
    const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["heart"],
  colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
};

confetti({
  ...defaults,
  particleCount: 50,
  scalar: 2,
});

confetti({
  ...defaults,
  particleCount: 25,
  scalar: 3,
});

confetti({
  ...defaults,
  particleCount: 10,
  scalar: 4,
});
}
