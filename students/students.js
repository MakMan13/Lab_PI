class Student {
  id = null;
  group = null;
  name = null;
  surname = null;
  gender = null;
  birthday = null;

  constructor(studentObject) {
    this.id = studentObject.id;
    this.group = studentObject.group;
    this.name = studentObject.name;
    this.surname = studentObject.surname;
    this.gender = studentObject.gender;
    this.birthday = studentObject.birthday;
  }
}

let students = [];
let tbody = document
  .getElementById("students-table")
  .getElementsByTagName("tbody")[0];

async function getAllStudentsFromDB() {
  const response = await fetch("/api/controller.php");
  let studentsList = await response.json();

  for (const studentObj of studentsList) {
    const student = new Student(studentObj);
    students.push(student);
  }

  refillStudentsTable();
}

function refillStudentsTable() {
  tbody.innerHTML = "";

  for (let i = 0; i < students.length; ++i) {
    addStudentToTheTable(i);
  }

  updateTableButtons();
}

getAllStudentsFromDB();
// Виконано запит в БД, студенти в масиві об'єктів та в таблиці на екрані

function updateTableButtons() {
  let checkboxes = tbody.querySelectorAll("input[type='checkbox']");
  let editButtons = tbody.querySelectorAll(".edit-table-button");
  let deleteButtons = tbody.querySelectorAll(".delete-table-button");

  for (let i = 0; i < tbody.rows.length; i++) {
    checkboxes[i].id = `${i}-table-checkbox`;
    checkboxes[i].setAttribute("aria-label", `${i}-student-checkbox`);
    editButtons[i].id = `${i}-table-edit-btn`;
    deleteButtons[i].id = `${i}-table-delete-btn`;

    checkboxes[i].addEventListener("change", function () {
      editButtons[i].disabled = !this.checked;
      deleteButtons[i].disabled = !this.checked;
    });

    editButtons[i].addEventListener("click", function () {
      showEditStudentDialog(i);
    });

    deleteButtons[i].addEventListener("click", function () {
      showDeleteStudentDialog(i);
    });
  }
}

document
  .getElementById("main-table-checkbox")
  .addEventListener("change", function () {
    let isChecked = this.checked;

    for (let i = 0; i < tbody.rows.length; i++) {
      document.getElementById(`${i}-table-checkbox`).checked = isChecked;

      document.getElementById(`${i}-table-edit-btn`).disabled = !isChecked;
      document.getElementById(`${i}-table-delete-btn`).disabled = !isChecked;
    }
  });

function showAddStudentDialog() {
  document.getElementById("overlay").classList.add("active");
  document.getElementById("add-modal-window").style.display = "block";
}

function closeAddStudentDialog() {
  document.getElementById("add-group-input-id").selectedIndex = 0;
  document.getElementById("add-first-name-input").value = "";
  document.getElementById("add-last-name-input").value = "";
  document.getElementById("add-gender-input").selectedIndex = 0;
  document.getElementById("add-birthday-input").value = "";

  document.getElementById("overlay").classList.remove("active");
  document.getElementById("add-modal-window").style.display = "none";
}

function showEditStudentDialog(rowIndex) {
  document.getElementById("overlay").classList.add("active");

  document.getElementById("edit-group-input-id").value =
    students[rowIndex].group;
  document.getElementById("edit-first-name-input").value =
    students[rowIndex].name;
  document.getElementById("edit-last-name-input").value =
    students[rowIndex].surname;
  document.getElementById("edit-gender-input").value =
    students[rowIndex].gender;
  document.getElementById("edit-birthday-input").value =
    students[rowIndex].birthday;

  document.getElementById("edit-modal-window").style.display = "block";

  let confirmSaveButton = document.getElementById("saveEditedStudentButton-id");

  confirmSaveButton.replaceWith(confirmSaveButton.cloneNode(true));
  confirmSaveButton = document.getElementById("saveEditedStudentButton-id");

  document
    .getElementById("edit-form")
    .addEventListener("submit", function (event) {
      validateEdited(event, rowIndex);
    });
}

function closeEditStudentDialog() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("edit-modal-window").style.display = "none";
}

function showDeleteStudentDialog(rowIndex) {
  document.getElementById("overlay").classList.add("active");
  let student = tbody.rows[rowIndex].cells[2].textContent;
  let deleteStudentQuestion = document.getElementById("delete-question-id");
  deleteStudentQuestion.textContent = `Are you sure you want to delete user ${student}?`;
  document.getElementById("delete-modal-window-id").style.display = "block";

  let confirmDeleteButton = document.getElementById("confirm-delete-id");

  confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
  confirmDeleteButton = document.getElementById("confirm-delete-id");

  confirmDeleteButton.addEventListener("click", function () {
    deleteRow(rowIndex);
  });
}

function deleteRow(rowIndex) {
  tbody.deleteRow(rowIndex);
  students.splice(1, rowIndex);
  // TO DO видалити елемент з бд
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("delete-modal-window-id").style.display = "none";
  updateTableButtons();
}

function closeDeleteStudentDialog() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("delete-modal-window-id").style.display = "none";
}

document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    students[rowIndex].group = document.getElementById("add-group-input-id");
    students[rowIndex].name = document.getElementById("add-first-name-input");
    students[rowIndex].surname = document.getElementById("add-last-name-input");
    students[rowIndex].gender = document.getElementById("add-gender-input");
    students[rowIndex].birthday = document.getElementById("add-birthday-input");

    let errors = this.querySelectorAll("p");

    const nameRegex = /^[A-ZА-ЯІЇЄ][a-zа-яіїє'-]{1,19}$/;
    let regexValid = true;

    if (!nameRegex.test(students[rowIndex].name.trim())) {
      regexValid = false;
      errors[1].style.display = "block";
    } else {
      errors[1].style.display = "none";
    }

    if (!nameRegex.test(students[rowIndex].surname.trim())) {
      regexValid = false;
      errors[2].style.display = "block";
    } else {
      errors[2].style.display = "none";
    }

    if (regexValid) {
      addStudent();
      this.reset();
    }
  });

function validateEdited(event, rowIndex) {
  event.preventDefault();

  const form = document.getElementById("edit-form");

  students[rowIndex].group = document.getElementById("edit-group-input-id");
  students[rowIndex].name = document.getElementById("edit-first-name-input");
  students[rowIndex].surname = document.getElementById("edit-last-name-input");
  students[rowIndex].gender = document.getElementById("edit-gender-input");
  students[rowIndex].birthday = document.getElementById("edit-birthday-input");

  let errors = form.querySelectorAll("p");

  const nameRegex = /^[A-ZА-ЯІЇЄ][a-zа-яіїє'-]{1,19}$/;
  let regexValid = true;

  if (!nameRegex.test(students[rowIndex].name.trim())) {
    regexValid = false;
    errors[1].style.display = "block";
  } else {
    errors[1].style.display = "none";
  }

  if (!nameRegex.test(students[rowIndex].surname.trim())) {
    regexValid = false;
    errors[2].style.display = "block";
  } else {
    errors[2].style.display = "none";
  }

  if (regexValid) {
    saveEditedStudent(rowIndex);
    form.reset();
  }
}

function addStudentToTheTable(studentIndex) {
  let newRow = tbody.insertRow();
  newRow.style.height = "2.5rem";

  let checkBoxCell = newRow.insertCell(0);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkBoxCell.appendChild(checkbox);

  let groupCell = newRow.insertCell(1);
  groupCell.textContent = students[studentIndex].group;

  let nameCell = newRow.insertCell(2);
  nameCell.textContent =
    students[studentIndex].name + " " + students[studentIndex].surname;

  let genderCell = newRow.insertCell(3);
  genderCell.textContent = students[studentIndex].gender;

  let birthdayCell = newRow.insertCell(4);
  birthdayCell.textContent = students[studentIndex].birthday;

  let statusCell = newRow.insertCell(5);
  let status = document.createElement("div");
  status.className = "circle-status offline";
  statusCell.appendChild(status);

  // Creating an options cell fillment
  let optionsCell = newRow.insertCell(6);
  let optionsDiv = document.createElement("div");
  optionsDiv.className = "table-options";

  let editButton = document.createElement("button");
  editButton.className = "edit-table-button";
  editButton.disabled = true;

  let editImg = document.createElement("img");
  editImg.src = "/assets/img/edit.svg";
  editImg.alt = "edit";
  editButton.appendChild(editImg);

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-table-button";
  deleteButton.disabled = true;

  let deleteImg = document.createElement("img");
  deleteImg.src = "/assets/img/delete.svg";
  deleteImg.alt = "delete";
  deleteButton.appendChild(deleteImg);

  optionsDiv.appendChild(editButton);
  optionsDiv.appendChild(deleteButton);

  optionsCell.appendChild(optionsDiv);
}

function addStudent() {
  let newStudent = new Student();

  newStudent.id = newStudent.group =
    document.getElementById("add-group-input-id").value;
  newStudent.name = document.getElementById("add-first-name-input").value;
  newStudent.surname = document.getElementById("add-last-name-input").value;
  newStudent.gender =
    document.getElementById("add-gender-input").value == "Male" ? "M" : "F";

  let birthdayValue = document.getElementById("add-birthday-input").value;
  newStudent.birthday = birthdayValue.split("-").reverse().join(".");

  students.push(newStudent);
  addStudentToTheTable(students.length - 1);
  updateTableButtons();

  document.getElementById("add-group-input-id").selectedIndex = 0;
  document.getElementById("add-first-name-input").value = "";
  document.getElementById("add-last-name-input").value = "";
  document.getElementById("add-gender-input").selectedIndex = 0;
  document.getElementById("add-birthday-input").value = "";

  document.getElementById("overlay").classList.remove("active");
  document.getElementById("add-modal-window").style.display = "none";

  // TO DO додати студента в бд
}

function saveEditedStudent(rowIndex) {
  let currentRow = tbody.rows[rowIndex];

  currentRow.cells[1].textContent = students[rowIndex].group;
  currentRow.cells[2].textContent =
    students[rowIndex].name + " " + students[rowIndex].surname;
  currentRow.cells[3].textContent = students[rowIndex].gender;
  currentRow.cells[4].textContent = students[rowIndex].birthday;

  document.getElementById("overlay").classList.remove("active");
  document.getElementById("edit-modal-window").style.display = "none";

  // TO DO надіслати зміни в бд
}
