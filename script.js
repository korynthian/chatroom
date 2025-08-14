/* import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mqxmptmzegpftuuekexf.supabase.co'
const supabaseKey = "sb_publishable_VhAXbd4iQbv94RkePc1Rdw_nq4IbcVD" // im pretty sure this is safe to have in js???
const supabase = createClient(supabaseUrl, supabaseKey) */
// idk this section breaks stuff so far

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const messageBox = document.getElementById('messageBox');
  const messageInput = document.getElementById('messageInput');

  // pick username. placeholder before i add passwords
  if (!localStorage.getItem('username')) {
    const username = prompt("Please enter your username:");
    localStorage.setItem('username', username || "Secret"); // see im cool i used secret instead of anon
  }

  // pick room to access
  if (!localStorage.getItem('room_id')) {
    const room_id = prompt("Which room?"); /* I should probably allow links to directly pick the room but idk how to do that.
    ex: /chat.html#roomID=347 should take you to room 347 specifically*/
    localStorage.setItem('room_id', room_id || "1");
  }

  // ask password for room. not implemented yet.
  //if (!localStorage.getItem())

  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    darkModeToggle.checked = true;
  } else {
    body.classList.remove('light-mode');
    darkModeToggle.checked = false;
  }

  // Dark mode toggle
  darkModeToggle.addEventListener('change', function () {
    if (this.checked) {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });

//display messages
  function displayMessages() {
    messageBox.innerHTML = localStorage.getItem("displayMessages") || "No messages yet.";
  }
  displayMessages(); // show on page load

  // input
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let currentMessages = localStorage.getItem("displayMessages") || "";
      currentMessages += `<p class="message">${messageInput.value}</p>`;
      localStorage.setItem("displayMessages", currentMessages);
      messageInput.value = "";
      displayMessages();
    }
    if (event.ctrlKey && event.key === 'z') {
      localStorage.setItem("displayMessages", "");
      displayMessages();
    }
  });
});
