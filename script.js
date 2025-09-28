let messages = [];
let currentIndex = 0;

function showDate() {
  const today = new Date();

  // Options for formatting (e.g., "Sunday, September 29, 2025")
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  document.getElementById("date").textContent = formattedDate;
}

// Call it first thing
showDate();

function showMessageForToday() {
    // Get today's date
    const today = new Date();

    // Format date nicely
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

    // Display date in the existing #date div
    document.getElementById('date').textContent = `Today is ${formattedDate}`;
    let dayNumber = Math.floor(today.getTime() / (1000*60*60*24));
    //use the date to randomize the message from message.txt
    let index = dayNumber % messages.length;
    document.getElementById("message").textContent = messages[index];
}

fetch("message.txt")
    .then(response => response.text())
    .then(text => {
        //Split the texts into lines
        messages = text.split("\n").filter(line => line.trim() !== "");
        showMessageForToday();
        //this code is for cycling through every 5 seconds, not included in project
        //setInterval(() => {
        //    currentIndex = (currentIndex + 1) % messages.length;
        //    showMessage(currentIndex);
        //}, 5000)
    })
    .catch(err => {
        document.getElementById("message").textContent = "Error loading messages.";
    });
