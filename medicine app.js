const form = document.getElementById("reminderForm");
const reminderList = document.getElementById("reminderList");

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
let notified = new Set();

function displayReminders() {
  reminderList.innerHTML = "";
  reminders.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.name} - ${r.time}`;
    reminderList.appendChild(li);
  });
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("medName").value.trim();
  const time = document.getElementById("medTime").value;

  if (name && time) {
    reminders.push({ name, time });
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
    form.reset();

    const confirmMsg = new SpeechSynthesisUtterance(`Reminder set for ${name} at ${time}`);
    speechSynthesis.speak(confirmMsg);
  }
});

function showNotification(name) {
  if (Notification.permission === "granted") {
    new Notification("💊 Medicine Time!", {
      body: `Take your medicine: ${name}`,
      icon: "https://cdn-icons-png.flaticon.com/512/3349/3349127.png"
    });
    const msg = new SpeechSynthesisUtterance(`Please take your medicine: ${name}`);
    speechSynthesis.speak(msg);
  }
}

function checkTime() {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  reminders.forEach((reminder) => {
    const key = `${reminder.name}-${reminder.time}`;
    if (reminder.time === currentTime && !notified.has(key)) {
      showNotification(reminder.name);
      notified.add(key);
    }
  });
}

Notification.requestPermission();
displayReminders();
setInterval(checkTime, 10);

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "medicine login.html";
}
