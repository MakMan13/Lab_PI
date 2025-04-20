document
  .getElementsByClassName("avatar")[0]
  .addEventListener("mouseenter", function () {
    document.getElementById("profile-modal-id").style.display = "block";
  });

document
  .getElementsByClassName("avatar")[0]
  .addEventListener("mouseleave", function () {
    document.getElementById("profile-modal-id").style.display = "none";
  });

document
  .getElementsByClassName("notif-icon")[0]
  .addEventListener("mouseenter", function () {
    document.getElementById("notif-modal-id").style.display = "grid";
  });

document
  .getElementsByClassName("notif-icon")[0]
  .addEventListener("mouseleave", function () {
    document.getElementById("notif-modal-id").style.display = "none";
  });

document
  .getElementsByClassName("notif-icon")[0]
  .addEventListener("click", function () {
    document.getElementById("notif-indicator-id").style.display = "none";
  });

document
  .getElementsByClassName("notif-icon")[0]
  .addEventListener("contextmenu", function (e) {
    e.preventDefault();
    this.classList.add("notif-shake-animation");
    document.getElementById("notif-sound").play();
    document.getElementById("notif-indicator-id").style.display = "block";

    setTimeout(() => {
      this.classList.remove("notif-shake-animation");
    }, 4000);
  });

document
  .getElementsByClassName("open-burger-menu")[0]
  .addEventListener("click", function () {
    document.getElementById("nav-burger-id").style.display = "block";
  });

document
  .getElementsByClassName("close-burger-menu")[0]
  .addEventListener("click", function () {
    document.getElementById("nav-burger-id").style.display = "none";
  });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.error("Service Worker registration failed", err));
}
