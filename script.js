const STORAGE_KEY = "patient";

// Dummy reports
const REPORTS = [
  { id: 1, title: "CBC Test", date: "2024-01-15" },
  { id: 2, title: "X-Ray", date: "2024-01-16" }
];

// ---- PAGE CONTROL ----
function show(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );

  document.getElementById(id).classList.add("active");
}

// ---- AUTH ----
function getUser() {
  return localStorage.getItem(STORAGE_KEY);
}

function setUser(id) {
  localStorage.setItem(STORAGE_KEY, id);
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

// ---- LOGIN ----
function login() {

  let id = document.getElementById("patient-id").value.trim();

  if (!id) {
    document.getElementById("error").style.display = "block";
    return;
  }

  setUser(id);
  showReports();
}

// ---- LOGOUT ----
function logout() {
  clearUser();
  show("login-page");
}

// ---- REPORTS ----
function showReports() {

  show("reports-page");

  document.getElementById("welcome").innerText =
    "Logged in as: " + getUser();

  let box = document.getElementById("reports-list");
  box.innerHTML = "";

  REPORTS.forEach(r => {
    box.innerHTML += `
      <div>
        <h4>${r.title}</h4>
        <p>${r.date}</p>
        <button onclick="openDetail(${r.id})">View</button>
      </div>
    `;
  });
}

// ---- DETAIL ----
function openDetail(id) {

  show("detail-page");

  let r = REPORTS.find(x => x.id == id);

  document.getElementById("detail").innerHTML =
    `<h3>${r.title}</h3><p>${r.date}</p>`;
}

function back() {
  showReports();
}

// ---- INIT ----
window.onload = function () {

  document.getElementById("loginBtn").onclick = login;
  document.getElementById("logoutBtn").onclick = logout;
  document.getElementById("backBtn").onclick = back;

  // FIRST TIME LOAD LOGIC
  if (getUser()) {
    showReports();
  } else {
    show("login-page");
  }
};
