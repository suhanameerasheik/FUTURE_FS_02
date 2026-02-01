// Page Switching
function showLogin() {
  leadPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

function showDashboard() {
  loginPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");
  loadLeads();
}

function logout() {
  dashboardPage.classList.add("hidden");
  leadPage.classList.remove("hidden");
}

// Submit Lead
leadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let leads = JSON.parse(localStorage.getItem("leads")) || [];

  leads.push({
    name: name.value,
    email: email.value,
    source: source.value,
    message: message.value,
    status: "New",
    notes: ""
  });

  localStorage.setItem("leads", JSON.stringify(leads));
  alert("Lead submitted successfully!");
  this.reset();
});

// Login
function login() {
  if (username.value === "admin" && password.value === "admin123") {
    showDashboard();
  } else {
    error.innerText = "Invalid username or password";
  }
}

// Load Leads
function loadLeads() {
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  leadTable.innerHTML = "";

  leads.forEach((lead, index) => {
    leadTable.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.source}</td>
        <td>
          <select onchange="updateStatus(${index}, this.value)">
            <option ${lead.status=="New"?"selected":""}>New</option>
            <option ${lead.status=="Contacted"?"selected":""}>Contacted</option>
            <option ${lead.status=="Converted"?"selected":""}>Converted</option>
          </select>
        </td>
        <td>
          <input value="${lead.notes}" onchange="updateNotes(${index}, this.value)">
        </td>
      </tr>
    `;
  });
}

function updateStatus(i, value) {
  let leads = JSON.parse(localStorage.getItem("leads"));
  leads[i].status = value;
  localStorage.setItem("leads", JSON.stringify(leads));
}

function updateNotes(i, value) {
  let leads = JSON.parse(localStorage.getItem("leads"));
  leads[i].notes = value;
  localStorage.setItem("leads", JSON.stringify(leads));
}
