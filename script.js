let appendContainer = document.getElementById("appendContainer");
let imageelem = document.getElementById("imageelem");
let addTask = document.getElementById("addTask");
let lsv = document.getElementById("lastSaved");
let count = -1;
let alltask = [];
if (localStorage.getItem("dtm") !== null) {
    lsv.animate([{
        opacity: 0,
    }, {
        opacity: 1,
    }], 1000);
    lsv.textContent = JSON.parse(localStorage.getItem("dtm"));
} else {
    lsv.animate([{
        opacity: 0
    }, {
        opacity: 1
    }], 1000);
    lsv.textContent = "NEVER";
}

function checkboxevent(input, label, todo) {
    label.classList.toggle("strikeout");
    todo.checked = input.checked;
}

function saveItem() {
    let stit = JSON.stringify(alltask);
    localStorage.setItem("items", stit);
    let currentDate = new Date().toLocaleString();
    lsv.animate([{
        opacity: 0
    }, {
        opacity: 1
    }], 1000);
    lsv.textContent = currentDate;
    currentDate = JSON.stringify(currentDate);
    localStorage.setItem("dtm", currentDate);
    console.log(currentDate);
    alert("Tasks Saved");
}

function deleteElem1(list) {
    appendContainer.removeChild(list);
    count -= 1;
    let deletedElem = alltask.findIndex(function(eachelement) {
        let unno = "li" + eachelement.uniqueno;
        if (list.id === unno) {
            return true;
        }
    });
    alltask.splice(deletedElem, 1);
    if (count === -1) {
        let div1 = document.getElementById("div1");
        div1.style.height = "190vh";
        let img = document.createElement("img");
        img.src = "https://icons.veryicon.com/png/o/education-technology/student-evaluation/no-task-1.png";
        img.id = "imageelem1";
        img.height = 250;
        imageelem.appendChild(img);
        let para = document.createElement("p");
        para.textContent = "No Task Pending";
        para.id = "paraelem";
        para.classList = "tasks";
        imageelem.appendChild(para);
    } else {
        let div1 = document.getElementById("div1");
        div1.style.height = "120vh";
    }
}

function append(todo) {
    let listid = "li" + todo.uniqueno;
    let checkboxid = "cb" + todo.uniqueno;
    let labelid = "la" + todo.uniqueno;

    let list = document.createElement("li");
    list.id = listid;
    list.classList.add("todo-item-container", "d-flex", "flex-row");
    appendContainer.appendChild(list);

    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = checkboxid;
    input.classList.add("checkboxdesign");
    /*list.animate([{
               transform: "translateY("+(-150*(count+1))+"px)"
           },
           {
               transform: "translateY(0px)"
           }
       ], 1000);*/
    list.animate([{
            transform: "scaleX(0)",
            opacity: 0
        },
        {
            transform: "scaleX(1.1)",
            opacity: 0.5
        },
    ], {
        duration: 1000,
        easing: "ease-out"

    });
    setTimeout(function() {
        list.animate([{
                transform: "scaleX(1.1)",
                opacity: 0.5
            },
            {
                transform: "scaleX(1.0)",
                opacity: 1
            }
        ], 500);
    }, 950);

    list.appendChild(input);

    let label = document.createElement("label");
    label.setAttribute("id", labelid);
    label.textContent = todo.text;
    label.setAttribute("for", checkboxid);
    label.classList.add("label-container", "d-flex", "flex-row");
    list.appendChild(label);

    if (todo.checked) {
        input.checked = true;
        label.classList.add("strikeout");
    }

    input.onclick = function onclickevent() {
        checkboxevent(input, label, todo);
    };

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    list.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function deleteElem() {
        list.animate([{
                transform: "scaleX(1)",
                opacity: 1
            },
            {
                transform: "scaleX(-0.1)",
                opacity: 0,
                easing: "ease-out"
            }
        ], 850);
        setTimeout(function() {
            deleteElem1(list);
        }, 800);

    };
}

function create(usertext) {
    let todo = {
        text: usertext,
        uniqueno: count,
        checked: false
    };
    alltask.push(todo);
    append(todo);
}

function addItem() {
    let userInput = document.getElementById("userInput");
    let usertext = userInput.value;
    if (usertext === "") {
        alert("Task Field Cannot Be Empty");
    } else {
        userInput.value = "";
        count += 1;
        if (count === 0) {
            let img = document.getElementById("imageelem1");
            imageelem.removeChild(img);
            let para = document.getElementById("paraelem");
            imageelem.removeChild(para);
        }
        create(usertext);
    }
}

function addPreLoadItems(items) {
    let usertext = items.text;
    let chk = items.checked;
    if (usertext === "") {
        alert("Task Field Cannot Be Empty");
    } else {
        count += 1;

        if (count === 0) {
            let img = document.getElementById("imageelem1");
            imageelem.removeChild(img);
            let para = document.getElementById("paraelem");
            imageelem.removeChild(para);
        }

        let todo = {
            text: usertext,
            uniqueno: count,
            checked: chk
        };
        alltask.push(todo);
        append(todo);
    }
}

if (localStorage.getItem("items") !== null) {
    let items = JSON.parse(localStorage.getItem("items"));
    for (let i in items) {
        addPreLoadItems(items[i]);
    }
}
