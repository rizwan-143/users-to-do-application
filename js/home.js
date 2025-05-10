let todolist = document.getElementById("to-do-list");
let userName = document.getElementById("userName");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
userName.textContent = `Welcome ${currentUser.fullName}`;
let mylistform = document.getElementById("my-list-form");

// ✅ Task submit
mylistform.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = event.target.taskInput.value.trim();
    if (task === "") return;

    const todo = {
        task: task,
        createdby: { ...currentUser },
    };

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    // Create list item
    let li = document.createElement("li");
    li.className = "listclass";
    li.textContent = task;

    // Delete Button
    let delBtn = document.createElement("button");
    delBtn.className = "delbtncss";
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", function () {
        li.remove();
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos = todos.filter(t =>
            !(t.task.trim().toLowerCase() === task.toLowerCase() &&
              t.createdby.fullName === currentUser.fullName)
        );
        localStorage.setItem("todos", JSON.stringify(todos));
    });

    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.className = "editbtncss";
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function () {
        let editInput = document.createElement("input");
        editInput.placeholder = "enter new value";
        editInput.value = "";

        let saveBtn = document.createElement("button");
        saveBtn.className = "savebtncss";
        saveBtn.innerText = "Save";

        saveBtn.addEventListener("click", function () {
            const updatedTask = editInput.value.trim();
            if (updatedTask === "") return;

            li.textContent = updatedTask;
            li.appendChild(editBtn);
            li.appendChild(delBtn);

            let todos = JSON.parse(localStorage.getItem("todos")) || [];
            todos = todos.map(t => {
                if (t.task === task && t.createdby.fullName === currentUser.fullName) {
                    return {
                        task: updatedTask,
                        createdby: { ...currentUser }
                    };
                }
                return t;
            });

            localStorage.setItem("todos", JSON.stringify(todos));
        });

        li.innerHTML = "";
        li.appendChild(editInput);
        li.appendChild(saveBtn);
    });

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    todolist.appendChild(li);

    event.target.reset();
});

// ✅ Show tasks on page reload/login
let todos = JSON.parse(localStorage.getItem("todos")) || [];
todos
    .filter(t => t.createdby.fullName === currentUser.fullName)
    .forEach(t => {
        let li = document.createElement("li");
        li.className = "listclass";
        li.textContent = t.task;

        // Delete Button
        let delBtn = document.createElement("button");
        delBtn.className = "delbtncss";
        delBtn.innerText = "Delete";
        delBtn.addEventListener("click", function () {
            li.remove();
            let todos = JSON.parse(localStorage.getItem("todos")) || [];
            todos = todos.filter(task =>
                !(task.task.trim().toLowerCase() === t.task.toLowerCase() &&
                  task.createdby.fullName === currentUser.fullName)
            );
            localStorage.setItem("todos", JSON.stringify(todos));
        });

        // Edit Button
        let editBtn = document.createElement("button");
    editBtn.className = "editbtncss";
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", function () {
            let editInput = document.createElement("input");
            editInput.value = t.task;

            let saveBtn = document.createElement("button");
        saveBtn.className = "savebtncss";

            saveBtn.innerText = "Save";

            saveBtn.addEventListener("click", function () {
                const updatedTask = editInput.value.trim();
                if (updatedTask === "") return;

                li.textContent = updatedTask;
                li.appendChild(editBtn);
                li.appendChild(delBtn);

                let todos = JSON.parse(localStorage.getItem("todos")) || [];
                todos = todos.map(taskObj => {
                    if (taskObj.task === t.task && taskObj.createdby.fullName === currentUser.fullName) {
                        return {
                            task: updatedTask,
                            createdby: { ...currentUser }
                        };
                    }
                    return taskObj;
                });

                localStorage.setItem("todos", JSON.stringify(todos));
            });

            li.innerHTML = "";
            li.appendChild(editInput);
            li.appendChild(saveBtn);
        });

        li.appendChild(editBtn);
        li.appendChild(delBtn);
        todolist.appendChild(li);
    });


    let logout =  document.getElementById("log-out");

logout.addEventListener("click" , function(){
    window.location.href = "../index.html";
})