document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks) {
        storedTasks.forEach((tasks) => tasks.push(task))
        updateTaskList()
        updateStats();
    }
})


let tasks = [];

const saveTasks = () => {
    localStorage.setItem('task', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completeTasks / totalTasks) * 100
    const progressBar = document.getElementById('progress')
    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;


    if (tasks.length && completeTasks == totalTasks) {
        blaskConfetti();
    }
}


const updateTaskList = () => {
    const taskList = document.getElementById("task-list")
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
                <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
             <img src="24.png" id="ed" onClick="editTask(${index})"/>
             <img src="crox1.png"  id="del" onClick="deleteTask(${index})"/>
            
            </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();

    addTask();
});

const blaskConfetti = () => {
    const duration = 3.7 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 49, spread: 360, ticks: 460, zIndex: 2 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.3 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.3 },
    })
  );
}, 200);
} 
