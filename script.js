let studentArray = [];

let tbody = document
  .getElementById("students-table")
  .getElementsByTagName("tbody")[0];

for (let i = 0; i < tbody.rows.length; ++i) {
  let student = {
    group: tbody.rows[i].cells[1].textContent,
    name: tbody.rows[i].cells[2].textContent,
    gender: tbody.rows[i].cells[3].textContent,
    birthday: tbody.rows[i].cells[4].textContent,
  };

  studentArray.push(student);
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

for (let i = 0; i < tbody.rows.length; i++) {
  document
    .getElementById(`${i}-table-checkbox`)
    .addEventListener("change", function () {
      document.getElementById(`${i}-table-edit-btn`).disabled = !this.checked;
      document.getElementById(`${i}-table-delete-btn`).disabled = !this.checked;
    });
  document
    .getElementById(`${i}-table-edit-btn`)
    .addEventListener("click", function () {
      showEditStudentDialog(i);
    });
  document
    .getElementById(`${i}-table-delete-btn`)
    .addEventListener("click", function () {
      showDeleteStudentDialog(i);
    });
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
  let student = tbody.rows[rowIndex].cells[2].textContent;
  let deleteStudentQuestion = document.getElementById("delete-question-id");
  deleteStudentQuestion.textContent += " ";
  deleteStudentQuestion.textContent += student;
  deleteStudentQuestion.textContent += "?";
  document.getElementById("delete-modal-window-id").style.display = "block";

  document
    .getElementById("confirm-delete-id")
    .addEventListener("click", function () {
      tbody.deleteRow(rowIndex);
      document.getElementById(
        `${rowIndex - 1}-table-delete-btn`
      ).disabled = true;
      deleteStudentQuestion.textContent =
        "Are you sure you want to delete user";
      document.getElementById("delete-modal-window-id").style.display = "none";
    });
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
  checkbox.id = `${newRow.rowIndex - 1}-table-checkbox`;
  checkBoxCell.appendChild(checkbox);

  let groupCell = newRow.insertCell(1);
  groupCell.textContent = document.getElementById("modal-group-input").value;

  let nameCell = newRow.insertCell(2);
  nameCell.textContent =
    document.getElementById("modal-first-name-input").value +
    " " +
    document.getElementById("modal-last-name-input").value;

  let genderCell = newRow.insertCell(3);
  genderCell.textContent =
    document.getElementById("modal-gender-input").value == "Male" ? "M" : "F";

  let birthdayCell = newRow.insertCell(4);
  let birthdayValue = document.getElementById("modal-birthday-input").value;
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
  editButton.id = `${newRow.rowIndex - 1}-table-edit-btn`;
  console.log(newRow.rowIndex);
  editButton.disabled = true;

  let editImg = document.createElement("img");
  editImg.src = "img/edit.svg";
  editImg.alt = "edit";
  editButton.appendChild(editImg);

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-table-button";
  deleteButton.id = `${newRow.rowIndex - 1}-table-delete-btn`;
  deleteButton.disabled = true;

  let deleteImg = document.createElement("img");
  deleteImg.src = "img/delete.svg";
  deleteImg.alt = "delete";
  deleteButton.appendChild(deleteImg);

  editButton.addEventListener("click", showEditStudentDialog);
  deleteButton.addEventListener("click", function () {
    showDeleteStudentDialog(newRow.rowIndex - 1);
  });

  checkbox.addEventListener("change", function () {
    document.getElementById(`${newRow.rowIndex - 1}-table-edit-btn`).disabled =
      !this.checked;
    document.getElementById(
      `${newRow.rowIndex - 1}-table-delete-btn`
    ).disabled = !this.checked;
  });

  optionsDiv.appendChild(editButton);
  optionsDiv.appendChild(deleteButton);

  optionsCell.appendChild(optionsDiv);

  document.getElementById("add-modal-window").style.display = "none";
}
