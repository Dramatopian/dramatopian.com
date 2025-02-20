// Status Display
const socket = new WebSocket("wss://api.lanyard.rest/socket");

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: "620229764996923402",
      },
    })
  );
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};

const DISCORD_ID = "620229764996923402";

async function fetchLanyard() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await response.json();

        let activityText = new Set();
        let isListeningToSpotify = false;

        if (data.spotify) {
            isListeningToSpotify = true;
            activityText.add(`Listening to Spotify - ${data.spotify.song} by ${data.spotify.artist}`);
        }

        data.activities.forEach(activity => {
            if (isListeningToSpotify && activity.name === "Spotify") return;
            if (activity.type === 0) {
                activityText.add(`Playing ${activity.name}`);
            }
        });

        const activityContainer = document.getElementById("current-activity");
        activityContainer.innerHTML = activityText.size > 0 
            ? `Currently:<br>${[...activityText].join("<br>")}` 
            : "No current activity";

    } catch (error) {
        console.error("Error fetching Lanyard data:", error);
    }
}

fetchLanyard();
setInterval(fetchLanyard, 5000);