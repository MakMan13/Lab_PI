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

  if (!tbody) {
    console.error("Таблиця не має <tbody>!");
    return;
  }

  let newRow = tbody.insertRow();

  /*let groupCell = newRow.insertCell(1);
  let nameCell = newRow.insertCell(2);
  let genderCell = newRow.insertCell(3);
  let birthdayCell = newRow.insertCell(4);
  let statusCell = newRow.insertCell(5);
  let optionsCell = newRow.insertCell(6);

  groupCell.textContent = document.getElementById("modal-group-input").value;
  nameCell.textContent =
    document.getElementById("modal-first-name-input").value +
    " " +
    document.getElementById("modal-last-name-input").value;
  genderCell =
    document.getElementById("modal-gender-input").value == "Male" ? "M" : "F";
  birthdayCell = document.getElementById("modal-birthday-input").value;*/

  document.getElementById("add-modal-window").style.display = "none";
}
