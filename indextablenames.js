const supabaseUrl = 'https://mqxmptmzegpftuuekexf.supabase.co';
const supabaseKey = 'sb_publishable_VhAXbd4iQbv94RkePc1Rdw_nq4IbcVD';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
    const RoomNamesPlaceholder = document.getElementById('RoomNamesPlaceholder');

    async function fetchRoomNames() {
        RoomNamesPlaceholder.innerHTML = "<p>Loading rooms...</p>";
        console.log("Getting names...");
        const { data, error } = await supabaseClient
            .from('rooms')
            .select('id, name, created_at')
            .order('created_at', { ascending: true })


            if (error) {
                console.error('Error fetching table name', error)
            } else if (!data || data.length === 0) {
                RoomNamesPlaceholder.innerHTML = "<p>No rooms available.</p>";
            } else {
                RoomNamesPlaceholder.innerHTML = data.map(room => `<a href="chat.html#roomID=${room.id}">${room.name}</a>`).join('');
            }
    };

    fetchRoomNames();
});