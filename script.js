const supabaseUrl = 'https://mqxmptmzegpftuuekexf.supabase.co';
const supabaseKey = 'sb_publishable_VhAXbd4iQbv94RkePc1Rdw_nq4IbcVD';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const messageBox = document.getElementById('messageBox');
  const messageInput = document.getElementById('messageInput');
  const roomNameHeader = document.getElementById('roomNameHeader');

  // pick username. placeholder before i add passwords
  if (!localStorage.getItem('username')) {
    const username = prompt("Please enter your username:");
    localStorage.setItem('username', username || "Secret"); // see im cool i used secret instead of anon
  }

  // pick room to access
  if (window.location.href.includes("#roomID=") || !window.location.href.includes("chat")) {
    let room_id = window.location.href.split("#roomID=")[1];
    localStorage.setItem('room_id', room_id);
  }
  else if (localStorage.getItem('room_id') && !window.location.href.includes("#roomID=")) {
    window.location.href = `/chat.html#roomID=${localStorage.getItem('room_id')}`;
  }
  else if (!localStorage.getItem('room_id')) {
    let room_id = prompt("Which room?");
    localStorage.setItem('room_id', room_id || "1");
    window.location.href = `/chat.html#roomID=${room_id}`; // redirect to the room
  }
  const roomName = `Room ${localStorage.getItem('room_id')}`; // Later, query the SQL database for room details!!!
  document.title = `kChat - ${roomName}`;
  document.getElementById('roomNameHeader').textContent = `${roomName}`;

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
  async function displayMessages() {
    const { data, error } = await supabaseClient
      .from('messages')
      .select('id, username, content, created_at')
      .eq('room_id', localStorage.getItem('room_id'))
      .order('created_at', { ascending: true })
      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        messageBox.innerHTML = data.map(msg => `<p class="message"><strong>${msg.username}</strong>: ${msg.content} <span class="timestamp" style="font-size: 0.8em; color: gray;">${new Date(msg.created_at).toLocaleString()}</span></p>`).join('') || "No messages yet."
      }
  }
  displayMessages(); // show on page load
  // input
  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      let currentMessages = localStorage.getItem("displayMessages") || "";
      const { data, error } = await supabaseClient
        .from('messages')
        .insert({
          room_id: localStorage.getItem('room_id'),
          username: localStorage.getItem('username'),
          content: messageInput.value
        })
      if (error) {
        console.error('Error inserting message:', error)
      } else {
        console.log('Message inserted successfully:', data)
      }
      messageInput.value = "";
      displayMessages();
    }
  });
});
