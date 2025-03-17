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
