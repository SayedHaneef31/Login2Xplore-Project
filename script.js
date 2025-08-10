const baseURL = "http://api.login2explore.com:5577";
const connToken = "90934942|-31949248735507342|90959439";
const dbName = "SCHOOL-DB";
const relationName = "STUDENT-TABLE";
const primaryKey = "rollNo";

const rollNoEl = document.getElementById("rollNo");
const fullNameEl = document.getElementById("fullName");
const classEl = document.getElementById("class");
const birthDateEl = document.getElementById("birthDate");
const addressEl = document.getElementById("address");
const enrollmentDateEl = document.getElementById("enrollmentDate");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const resetBtn = document.getElementById("resetBtn");
const dbStatus = document.getElementById("dbStatus");
const statusText = document.getElementById("statusText");

async function executeJpdbCommand(command, endpoint) {
  const url = `${baseURL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(command)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('JPDB Response:', result);

    if (dbStatus.classList.contains('status-local')) {
        updateStatus('Connected to JSONPowerDB', true);
    }
    
    return result;

  } catch (error) {
    console.error('JPDB Request Failed:', error);
    updateStatus('Connection to Database Failed!', false);
    return { status: 500, message: "Failed to connect to JSONPowerDB." };
  }
}

function updateStatus(message, isConnected) {
  statusText.textContent = message;
  dbStatus.className = `status-indicator ${isConnected ? 'status-connected' : 'status-local'}`;
}

function clearForm() {
  rollNoEl.value = "";
  fullNameEl.value = "";
  classEl.value = "";
  birthDateEl.value = "";
  addressEl.value = "";
  enrollmentDateEl.value = "";
  
  rollNoEl.disabled = false;
  fullNameEl.disabled = true;
  classEl.disabled = true;
  birthDateEl.disabled = true;
  addressEl.disabled = true;
  enrollmentDateEl.disabled = true;
  
  saveBtn.disabled = true;
  updateBtn.disabled = true;
  resetBtn.disabled = true;
  
  rollNoEl.dataset.rec_no = "";
  
  rollNoEl.focus();
}

function validateForm() {
  if (!rollNoEl.value || !fullNameEl.value || !classEl.value || !birthDateEl.value || !addressEl.value || !enrollmentDateEl.value) {
    alert("All fields are required. Please fill out the entire form.");
    return false;
  }
  return true;
}

function getFormData() {
    return {
        [primaryKey]: parseInt(rollNoEl.value, 10),
        fullName: fullNameEl.value,
        class: classEl.value,
        birthDate: birthDateEl.value,
        address: addressEl.value,
        enrollmentDate: enrollmentDateEl.value,
    };
}

function fillForm(data) {
    fullNameEl.value = data.fullName || "";
    classEl.value = data.class || "";
    birthDateEl.value = data.birthDate || "";
    addressEl.value = data.address || "";
    enrollmentDateEl.value = data.enrollmentDate || "";
}

document.addEventListener('DOMContentLoaded', clearForm);

rollNoEl.addEventListener("blur", async () => {
  const rollNoValue = rollNoEl.value;
  if (!rollNoValue) return;

  const findCommand = {
    token: connToken,
    dbName: dbName,
    rel: relationName,
    cmd: "FIND_RECORD",
    jsonStr: {
        [primaryKey]: parseInt(rollNoValue, 10),
    }
  };
  
  const result = await executeJpdbCommand(findCommand, "/api/irl");
  
  if (result.status === 200 && result.data && result.data.length > 0) {
    const record = result.data[0];
    
    fillForm(record.json);
    
    rollNoEl.dataset.rec_no = record.rec_no; 
    
    rollNoEl.disabled = true;
    fullNameEl.disabled = false;
    classEl.disabled = false;
    birthDateEl.disabled = false;
    addressEl.disabled = false;
    enrollmentDateEl.disabled = false;
    
    updateBtn.disabled = false;
    resetBtn.disabled = false;
    saveBtn.disabled = true;
    
    fullNameEl.focus();

  } else {
    fullNameEl.disabled = false;
    classEl.disabled = false;
    birthDateEl.disabled = false;
    addressEl.disabled = false;
    enrollmentDateEl.disabled = false;
    
    saveBtn.disabled = false;
    resetBtn.disabled = false;
    updateBtn.disabled = true;
    
    fullNameEl.focus();
  }
});

saveBtn.addEventListener("click", async () => {
  if (!validateForm()) return;
  
  const studentData = getFormData();
  
  const saveCommand = {
    token: connToken,
    cmd: "PUT",
    dbName: dbName,
    rel: relationName,
    jsonStr: studentData
  };
  
  const result = await executeJpdbCommand(saveCommand, "/api/iml");
  
  if (result && result.status === 200) {
    alert("Student data saved successfully!");
    clearForm();
  } else {
    alert("Failed to save data. Please check the console for errors.");
  }
});

updateBtn.addEventListener("click", async () => {
  if (!validateForm()) return;
  
  const recordNumber = rollNoEl.dataset.rec_no;
  if (!recordNumber) {
    alert("Error: Cannot update record. Record identifier is missing. Please re-enter the Roll No.");
    return;
  }

  const studentData = getFormData();
  
  const updateCommand = {
    token: connToken,
    cmd: "UPDATE",
    dbName: dbName,
    rel: relationName,
    jsonStr: {
        [recordNumber]: studentData
    }
  };

  const result = await executeJpdbCommand(updateCommand, "/api/iml");
  
  if (result && result.status === 200) {
    alert("Student data updated successfully!");
    clearForm();
  } else {
    alert("Failed to update data. Please check the console for errors.");
  }
});

resetBtn.addEventListener("click", clearForm);
