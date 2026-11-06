
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks(filter = "") {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = task.name;

        if (task.completed) {
            name.classList.add("done");
        }

        name.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks(searchInput.value);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";

        deleteBtn.onclick = () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            displayTasks(searchInput.value);
        };

        li.append(name, deleteBtn);
        taskList.appendChild(li);
    });

    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("remaining").textContent = remaining;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% completed";
}

document.getElementById("addBtn").addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

searchInput.addEventListener("input", event => {
    displayTasks(event.target.value);
});

document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();

displayTasks();
