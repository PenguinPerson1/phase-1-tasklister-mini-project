document.addEventListener("DOMContentLoaded", () => {
  const undecidedTasks = document.querySelector("#undecided-tasks");
  const tasksLists = document.querySelector("#list");
  const inputField = document.querySelector("#new-task-description");
  const dateField = document.querySelector("#new-task-date")
  const newTaskForm = document.querySelector("#create-task-form");

  function moveElement(element,destination) {
    inTransit = element;
    inTransit.remove();
    console.log(element);
    destination.append(inTransit);
  }

  newTaskForm.addEventListener("submit", (target) => {
    target.preventDefault();
    const li = document.createElement("li");
    li.className = "li-list";

    const dropdown = document.createElement("select");
    dropdown.name = "priority";
    dropdown.className = "priority-select";

    const option0 = document.createElement("option");
    option0.textContent = "Choose Priority";
    option0.setAttribute("hidden", "");
    option0.setAttribute("disabled", "");
    option0.setAttribute("selected", "");
    dropdown.append(option0);

    const priorityNames = ["High Priority","Medium Priority","Low Priority"];
    for (let i = 0; i < 3; i++) {
      const option = document.createElement("option");
      option.value = (i).toString();
      option.textContent = priorityNames[i];
      option.className = "priority-options"
      dropdown.append(option);
    }

    li.append(dropdown);    

    const p = document.createElement("p");
    p.textContent = `${inputField.value} by ${dateField.value}`;

    const button = document.createElement("button");
    button.className = "delete-button";
    button.textContent = "X"

    li.append(p);
    li.append(button);

    undecidedTasks.append(li);

    inputField.value="";
  });

  tasksLists.addEventListener("click", (event) => {
    if(event.target.className === "delete-button"){
      event.target.parentNode.remove();
    }
  });

  tasksLists.addEventListener("change", (event) => {
    if(event.target.className===("priority-select")){
      switch (event.target.value) {
        case "0":
          moveElement(event.target.parentNode,document.getElementById("high-priority-tasks"));
          break;
        case "1":
          moveElement(event.target.parentNode,document.getElementById("med-priority-tasks"));
          break;
        case "2":
          moveElement(event.target.parentNode,document.getElementById("low-priority-tasks"));
          break;
        default:
          event.target.parentNode.getElementsByTagName("p")[0].style.color = "blue";
          console.log("it isn't reading the dropdown correctly");
          break;
      }
    }
  });
});
