const taskInput = document.getElementById("taskInput")
const addbtn = document.getElementById("addbtn")
const taskList = document.getElementById("taskList")
const filterInput = document.getElementById("filter")
const priorityInput = document.getElementById("priorityInput");
//understanding pending
let isSortedByPriority = false;



let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks() {
    taskList.innerHTML = "";

    const selectedCategory = document.getElementById("filterCategory").value;
    const filteredTasks = selectedCategory === "All"
        ? tasks
        : tasks.filter(t => t.category === selectedCategory)

    const searchTerm = filterInput.value.toLowerCase()

    //understanding pending
    let searchFilteredTasks = filteredTasks.filter(taskObj =>
        taskObj.task.toLowerCase().includes(searchTerm)
    );

    if (isSortedByPriority) {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        searchFilteredTasks.sort((a, b) => {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }



    searchFilteredTasks.forEach((taskObj, index) => {

        //understanding pending
        let badgeColor;
        switch (taskObj.priority) {
            case "High":
                badgeColor = "danger";
                break;
            case "Medium":
                badgeColor = "warning";
                break;
            default:
                badgeColor = "secondary";
        }

        const priorityBadge = `<span class="badge me-2 bg-${badgeColor}">${taskObj.priority}</span>`;



        const li = document.createElement("li")
        li.className = "list-group-item d-flex justify-content-between align-items-center"

        //understanding pending
        li.innerHTML = `<div><input type="checkbox" id="checkBox" onchange="toggleDone(${index})" ${taskObj.done ? "checked" : ""}>
        <span class="${taskObj.done ? 'text-decoration-line-through' : ''}">
        <strong>${taskObj.task}</strong> ${priorityBadge}//understanding pending
        <br>
        <small class="text-muted">${taskObj.time}</small></span></div>
        <div>
        <span class="badge me-2${getBadgeColor(taskObj.category)}">${taskObj.category}</Span>
        <button class="btn btn-sm btn-outline-info" onclick="editTask(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        </div>`

        taskList.appendChild(li)

        console.log(taskObj.priority);

    })
}

let editIndex = null

function editTask(index) {
    const task = tasks[index]

    document.getElementById("editTask").value = task.task;
    document.getElementById("editCategory").value = task.category;
    editIndex = index

    document.getElementById("editSection").classList.remove("d-none")
}


function deleteTask(index) {
    tasks.splice(index, 1)
    saveTasks()
    renderTasks()
}

addbtn.addEventListener("click", () => {
    const task = taskInput.value.trim()
    const category = document.getElementById("category").value

    if (task !== "") {
        const taskObj = {
            task: task,
            category: category,
            time: new Date().toLocaleString(),
            done: false,  // when adding new task   //understanding pending
            priority: priorityInput.value//understanding pending
        }

        tasks.push(taskObj)
        saveTasks()
        renderTasks()
        taskInput.value = "";
    }

})
//understanding pending
function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}
//understanding pending
document.getElementById("sortPriorityBtn").addEventListener("click", () => {
    isSortedByPriority = !isSortedByPriority;
    renderTasks();
});



document.getElementById("updatebtn").addEventListener("click", () => {
    const UpdatedTask = document.getElementById("editTask").value.trim();
    const UpdatedCategory = document.getElementById("editCategory").value;

    if (editIndex !== null && UpdatedTask !== "") {

        tasks[editIndex] = {
            task: UpdatedTask,
            category: UpdatedCategory,
            time: new Date().toLocaleString()
        }
        saveTasks()
        renderTasks()
        editIndex = null

        document.getElementById("editSection").classList.add("d-none")
    }
})


filterInput.addEventListener("input", renderTasks)

document.getElementById("filterCategory").addEventListener("change", renderTasks)



function getBadgeColor(category) {
    if (category === "Personal") return " bg-info text-dark"
    if (category === "Work") return " bg-warning text-dark"
    return " bg-secondary"
}


const btn = document.getElementById("toggleMode");

btn.addEventListener("click", () => {//understanding pending
    document.body.classList.toggle("dark-mode");

    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);
    btn.textContent = mode === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";
});

// On page load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    btn.textContent = "☀ Light Mode";
}


renderTasks()





