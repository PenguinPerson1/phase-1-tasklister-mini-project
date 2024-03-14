
// A custom funciton to create and append / store an element
// Only works with basic attributes that most elements use
function createSimpleElement(element,text,className,location,value) {
  const elem = document.createElement(element);
  elem.className = className;
  elem.textContent = text;
  if(value!==undefined){
    elem.value = value;
  }
  if(location!==undefined){
    location.append(elem);
  }
  return elem;
}
// Moves an element to the destination
function moveElement(element,destination) {
  inTransit = element;
  inTransit.remove();
  destination.append(inTransit);
}
document.addEventListener("DOMContentLoaded", () => {
  const undecidedTasks = document.querySelector("#undecided-tasks");
  const tasksLists = document.querySelector("#list");
  const inputField = document.querySelector("#new-task-description");
  const dateField = document.querySelector("#new-task-date")
  const newTaskForm = document.querySelector("#create-task-form");

  // When the form is submitted, it creates and adds a task to the list
  newTaskForm.addEventListener("submit", event => {
    event.preventDefault();
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
      createSimpleElement("option",priorityNames[i],"priority-options",dropdown,(i).toString());
    }
    li.append(dropdown);    

    // If there is a date provided, it includes ' by ', but if there is no date provided, just the task is added
    createSimpleElement("p",`${inputField.value}${dateField.value!==""?" by ":""}${dateField.value}`,"task-text",li);
    createSimpleElement("button","X","delete-button",li);

    undecidedTasks.append(li);
    inputField.value="";
  });
  // When the delete button is pressed, it deletes that task
  tasksLists.addEventListener("click", event => {
    if(event.target.className === "delete-button"){
      event.target.parentNode.remove();
    }
  });
  // When a task is selected, the task is replaced with a text box to edit it
  tasksLists.addEventListener("selectstart", event =>{
    if (event.target.parentNode.className === "task-text") {
      event.preventDefault();
      const textToChange = event.target.parentNode;
      const editBox = createSimpleElement("input","","edit-box",undefined,textToChange.textContent);
      textToChange.replaceWith(editBox);
      editBox.focus();
     }
  });
  // When the enter key is pressed, the edit box is replaced with the edited text
  tasksLists.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.className === "edit-box") {
      event.target.replaceWith(createSimpleElement("p",event.target.value,"task-text"));
    }
  });
  // When the dropdown menu is changed, the task is moved to the correct list
  document.addEventListener("change", event => {
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
          console.log("Error: it isn't reading the dropdown correctly");
          break;
      }
    }
  });
});
