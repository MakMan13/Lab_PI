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

document
  .getElementById("profile-icon")
  .addEventListener("mouseenter", function () {
    document.getElementById("profile-modal-id").style.display = "block";
  });

document
  .getElementById("profile-icon")
  .addEventListener("mouseleave", function () {
    document.getElementById("profile-modal-id").style.display = "none";
  });

document
  .getElementById("notif-icon")
  .addEventListener("mouseenter", function () {
    document.getElementById("notif-modal-id").style.display = "grid";
  });

document
  .getElementById("notif-icon")
  .addEventListener("mouseleave", function () {
    document.getElementById("notif-modal-id").style.display = "none";
  });

document.getElementById("notif-icon").addEventListener("click", function () {
  document.getElementById("notif-indicator-id").style.display = "none";
});

document
  .getElementById("notif-icon")
  .addEventListener("contextmenu", function (e) {
    e.preventDefault();
    this.classList.add("notif-shake-animation");
    document.getElementById("notif-sound").play();
    document.getElementById("notif-indicator-id").style.display = "block";

    setTimeout(() => {
      this.classList.remove("notif-shake-animation");
    }, 4000);
  });

document.getElementById("menu-toggle").addEventListener("click", function () {
  //document.getElementById("nav-burger-id").classList.add("active");
  document.getElementById("nav-burger-id").style.display = "block";
});

function closeBurgerMenu() {
  document.getElementById("nav-burger-id").style.display = "none";
}

function showAddStudentDialog() {
  document.getElementById("add-modal-window").style.display = "block";
}

function closeAddStudentDialog() {
  document.getElementById("add-modal-window").style.display = "none";
}

function showEditStudentDialog() {
  document.getElementById("edit-modal-window").style.display = "block";
}

function closeEditStudentDialog() {
  document.getElementById("edit-modal-window").style.display = "none";
}

function showDeleteStudentDialog(rowIndex) {
  console.log(rowIndex);
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
  document.getElementById("delete-modal-window-id").style.display = "none";
  updateTable();
}

function closeDeleteStudentDialog() {
  document.getElementById("delete-modal-window-id").style.display = "none";
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
  editImg.src = "img/edit.svg";
  editImg.alt = "edit";
  editButton.appendChild(editImg);

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-table-button";
  deleteButton.disabled = true;

  let deleteImg = document.createElement("img");
  deleteImg.src = "img/delete.svg";
  deleteImg.alt = "delete";
  deleteButton.appendChild(deleteImg);

  optionsDiv.appendChild(editButton);
  optionsDiv.appendChild(deleteButton);

  optionsCell.appendChild(optionsDiv);

  document.getElementById("add-modal-window").style.display = "none";

  updateTable();
}
