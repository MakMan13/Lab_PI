let tbody = document
  .getElementById("students-table")
  .getElementsByTagName("tbody")[0];

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

updateTable();

function updateTable() {
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
  let currentRow = tbody.rows[rowIndex];

  switch (currentRow.cells[1].textContent) {
    case "KN-21":
      document.getElementById("edit-group-input-id").selectedIndex = 1;
      break;
    case "KN-22":
      document.getElementById("edit-group-input-id").selectedIndex = 2;
      break;
    case "KN-23":
      document.getElementById("edit-group-input-id").selectedIndex = 3;
      break;
    case "KN-24":
      document.getElementById("edit-group-input-id").selectedIndex = 4;
      break;
  }

  document.getElementById("edit-first-name-input").value =
    currentRow.cells[2].textContent.split(" ")[0];

  document.getElementById("edit-last-name-input").value =
    currentRow.cells[2].textContent.split(" ")[1];

  const gender = currentRow.cells[3].textContent;
  document.getElementById("edit-gender-input").selectedIndex =
    gender === "M" ? 1 : 2;

  let rawDate = currentRow.cells[4].textContent.trim();
  let dateParts = rawDate.split(".");
  let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  document.getElementById("edit-birthday-input").value = formattedDate;

  document.getElementById("edit-modal-window").style.display = "block";

  let confirmSaveButton = document.getElementById("saveEditedStudentButton-id");

  confirmSaveButton.replaceWith(confirmSaveButton.cloneNode(true));
  confirmSaveButton = document.getElementById("saveEditedStudentButton-id");

  document
    .getElementById("edit-form")
    .addEventListener("submit", function (event) {
      validateEdited(event, rowIndex);
    });

  //confirmSaveButton.addEventListener("click", function (event) {validateEdited(event, rowIndex);});
}

function closeEditStudentDialog() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("edit-modal-window").style.display = "none";
}

function showDeleteStudentDialog(rowIndex) {
  document.getElementById("overlay").classList.add("active");
  let student = tbody.rows[rowIndex]?.cells[2]?.textContent || "Unknown";
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
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("delete-modal-window-id").style.display = "none";
  updateTable();
}

function closeDeleteStudentDialog() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("delete-modal-window-id").style.display = "none";
}

document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    group = document.getElementById("add-group-input-id");
    firstName = document.getElementById("add-first-name-input");
    lastName = document.getElementById("add-last-name-input");
    gender = document.getElementById("add-gender-input");
    birthday = document.getElementById("add-birthday-input");

    let errors = this.querySelectorAll("p");

    const nameRegex = /^[A-ZА-ЯІЇЄ][a-zа-яіїє'-]{1,19}$/;
    let regexValid = true;

    if (group.value === "") {
      regexValid = false;
      errors[0].style.display = "block";
    } else {
      errors[0].style.display = "none";
    }

    if (!nameRegex.test(firstName.value.trim())) {
      regexValid = false;
      errors[1].style.display = "block";
    } else {
      errors[1].style.display = "none";
    }

    if (!nameRegex.test(lastName.value.trim())) {
      regexValid = false;
      errors[2].style.display = "block";
    } else {
      errors[2].style.display = "none";
    }

    if (gender.value === "") {
      regexValid = false;
      errors[3].style.display = "block";
    } else {
      errors[3].style.display = "none";
    }

    if (birthday.value === "") {
      regexValid = false;
      errors[4].style.display = "block";
    } else {
      errors[4].style.display = "none";
    }

    if (regexValid) {
      addStudentToTheTable();
      this.reset();
    }
  });

function validateEdited(event, rowIndex) {
  event.preventDefault();

  const form = document.getElementById("edit-form");

  group = document.getElementById("edit-group-input-id");
  firstName = document.getElementById("edit-first-name-input");
  lastName = document.getElementById("edit-last-name-input");
  gender = document.getElementById("edit-gender-input");
  birthday = document.getElementById("edit-birthday-input");

  let errors = form.querySelectorAll("p");

  const nameRegex = /^[A-ZА-ЯІЇЄ][a-zа-яіїє'-]{1,19}$/;
  let regexValid = true;

  if (group.value === "") {
    regexValid = false;
    errors[0].style.display = "block";
  } else {
    errors[0].style.display = "none";
  }

  if (!nameRegex.test(firstName.value.trim())) {
    regexValid = false;
    errors[1].style.display = "block";
  } else {
    errors[1].style.display = "none";
  }

  if (!nameRegex.test(lastName.value.trim())) {
    regexValid = false;
    errors[2].style.display = "block";
  } else {
    errors[2].style.display = "none";
  }

  if (gender.value === "") {
    regexValid = false;
    errors[3].style.display = "block";
  } else {
    errors[3].style.display = "none";
  }

  if (birthday.value === "") {
    regexValid = false;
    errors[4].style.display = "block";
  } else {
    errors[4].style.display = "none";
  }

  if (regexValid) {
    saveEditedStudent(rowIndex);
    form.reset();
  }
}

function addStudentToTheTable() {
  let newRow = tbody.insertRow();
  newRow.style.height = "2.5rem";

  let checkBoxCell = newRow.insertCell(0);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkBoxCell.appendChild(checkbox);

  let groupCell = newRow.insertCell(1);
  groupCell.textContent = document.getElementById("add-group-input-id").value;

  let nameCell = newRow.insertCell(2);
  nameCell.textContent =
    document.getElementById("add-first-name-input").value +
    " " +
    document.getElementById("add-last-name-input").value;

  let genderCell = newRow.insertCell(3);
  genderCell.textContent =
    document.getElementById("add-gender-input").value == "Male" ? "M" : "F";

  let birthdayCell = newRow.insertCell(4);
  let birthdayValue = document.getElementById("add-birthday-input").value;
  let birthdayFormatted = birthdayValue
    ? birthdayValue.split("-").reverse().join(".")
    : "N/A";
  birthdayCell.textContent = birthdayFormatted;

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

  document.getElementById("add-group-input-id").selectedIndex = 0;
  document.getElementById("add-first-name-input").value = "";
  document.getElementById("add-last-name-input").value = "";
  document.getElementById("add-gender-input").selectedIndex = 0;
  document.getElementById("add-birthday-input").value = "";

  document.getElementById("overlay").classList.remove("active");
  document.getElementById("add-modal-window").style.display = "none";

  updateTable();
}

function saveEditedStudent(rowIndex) {
  let currentRow = tbody.rows[rowIndex];

  let groupIndex = document.getElementById("edit-group-input-id").selectedIndex;
  let firstName = document.getElementById("edit-first-name-input").value;
  let secondName = document.getElementById("edit-last-name-input").value;
  let genderIndex = document.getElementById("edit-gender-input").selectedIndex;
  let birthdayValue = document.getElementById("edit-birthday-input").value;
  let birthdayFormatted = birthdayValue
    ? birthdayValue.split("-").reverse().join(".")
    : "N/A";

  switch (groupIndex) {
    case 1:
      currentRow.cells[1].textContent = "KN-21";
      break;
    case 2:
      currentRow.cells[1].textContent = "KN-22";
      break;
    case 3:
      currentRow.cells[1].textContent = "KN-23";
      break;
    case 4:
      currentRow.cells[1].textContent = "KN-24";
      break;
  }

  currentRow.cells[2].textContent = firstName + " " + secondName;
  currentRow.cells[3].textContent = genderIndex === 1 ? "M" : "F";

  currentRow.cells[4].textContent = birthdayFormatted;

  const editedStudentOBJECT = {
    newGroup: currentRow.cells[1].textContent,
    newName: currentRow.cells[2].textContent,
    newGender: genderIndex === 1 ? "Male" : "Female",
    newBirthday: currentRow.cells[4].textContent,
  };

  const editedStudentJSON = JSON.stringify(editedStudentOBJECT);

  console.log(editedStudentJSON);

  document.getElementById("overlay").classList.remove("active");
  document.getElementById("edit-modal-window").style.display = "none";
}
