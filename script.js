document
  .getElementById("main-table-checkbox")
  .addEventListener("change", function () {
    let isChecked = this.checked;

    for (let i = 1; i <= 4; i++) {
      document.getElementById(`${i}-table-checkbox`).checked = isChecked;

      document.getElementById(`${i}-table-edit-btn`).disabled = !isChecked;
      document.getElementById(`${i}-table-delete-btn`).disabled = !isChecked;
    }
  });

document
  .getElementById("1-table-checkbox")
  .addEventListener("change", function () {
    document.getElementById("1-table-edit-btn").disabled = !this.checked;
    document.getElementById("1-table-delete-btn").disabled = !this.checked;
  });

document
  .getElementById("2-table-checkbox")
  .addEventListener("change", function () {
    document.getElementById("2-table-edit-btn").disabled = !this.checked;
    document.getElementById("2-table-delete-btn").disabled = !this.checked;
  });

document
  .getElementById("3-table-checkbox")
  .addEventListener("change", function () {
    document.getElementById("3-table-edit-btn").disabled = !this.checked;
    document.getElementById("3-table-delete-btn").disabled = !this.checked;
  });

document
  .getElementById("4-table-checkbox")
  .addEventListener("change", function () {
    document.getElementById("4-table-edit-btn").disabled = !this.checked;
    document.getElementById("4-table-delete-btn").disabled = !this.checked;
  });

function showAddStudentDialog() {
  document.getElementById("add-modal-window").style.display = "block";
}

function closeAddStudentDialog() {
  document.getElementById("add-modal-window").style.display = "none";

  document.getElementById("modal-group-input").value = "";
  document.getElementById("modal-first-name-input").value = "";
  document.getElementById("modal-last-name-input").value = "";
}

function addStudentToTheTable() {
  let table = document.getElementById("students-table");
  let tbody = table.getElementsByTagName("tbody")[0];

  let newRow = tbody.insertRow();
  newRow.style.height = "2.5rem";

  let checkBoxCell = newRow.insertCell(0);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
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
  editButton.id = "new-table-edit-btn";
  editButton.disabled = true;

  let editImg = document.createElement("img");
  editImg.src = "img/edit.svg";
  editImg.alt = "edit";
  editButton.appendChild(editImg);

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-table-button";
  deleteButton.id = "new-table-delete-btn";
  deleteButton.disabled = true;

  let deleteImg = document.createElement("img");
  deleteImg.src = "img/delete.svg";
  deleteImg.alt = "delete";
  deleteButton.appendChild(deleteImg);

  optionsDiv.appendChild(editButton);
  optionsDiv.appendChild(deleteButton);

  optionsCell.appendChild(optionsDiv);

  document.getElementById("add-modal-window").style.display = "none";
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
