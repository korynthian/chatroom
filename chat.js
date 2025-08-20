const supabaseUrl = 'https://mqxmptmzegpftuuekexf.supabase.co';
const supabaseKey = 'sb_publishable_VhAXbd4iQbv94RkePc1Rdw_nq4IbcVD';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
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
  if (window.location.href.includes("#roomID=")) {
    let room_id = window.location.href.split("#roomID=")[1];
    localStorage.setItem('room_id', room_id);
  }
  else if (localStorage.getItem('room_id') && !window.location.href.includes("chat#roomID=")) {
    window.location.href = `/chat.html#roomID=${localStorage.getItem('room_id')}`;
  }
  else if (!localStorage.getItem('room_id') && !window.location.href.includes("chat#roomID=")) {
    let room_id = prompt("Which room?");
    localStorage.setItem('room_id', room_id || "1");
    window.location.href = `/chat.html#roomID=${room_id}`; // redirect to the room
  }

  let roomName = "[Placeholder]";
  async function fetchRoomName() {
    console.log("Fetching room name for ID:", Number(localStorage.getItem('room_id')));
    const { data, error } = await supabaseClient
      .from('rooms')
      .select('id, name')
      .eq('id', Number(localStorage.getItem('room_id')))
      .maybeSingle();

      if (error) {
        console.error('Error fetching table name', error)
      } else if (!data) {
        roomName = "Not real";
      } else {
        roomName = data.name;
      }

    document.title = `kChat - ${roomName}`;
    document.getElementById('roomNameHeader').textContent = `${roomName}`;
    };
  fetchRoomName();


  // ask password for room. not implemented yet.
  //if (!localStorage.getItem())
//scrool
  function scrollToBottom() {
    const container = document.querySelector('.messageContainer');
    container.scrollTop = container.scrollHeight;
}
scrollToBottom();

  //display messages
  async function displayMessages() {
    const { data, error } = await supabaseClient
      .from('messages')
      .select('id, username, content, created_at')
      .eq('room_id', Number(localStorage.getItem('room_id')))
      .order('created_at', { ascending: true })
      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        messageBox.innerHTML = data.map(msg => `<p class="message"><strong>${msg.username}</strong>: ${msg.content} <span class="timestamp" style="font-size: 0.8em; color: gray;">${new Date(msg.created_at).toLocaleString()}</span></p>`).join('') || "No messages yet."
      }
    scrollToBottom();
  }
  displayMessages(); // show on page load
  // input
  messageInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
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
        console.log('Message inserted successfully:', messageInput.value);
      }
      messageInput.value = "";
      displayMessages();
    }
  });
});
