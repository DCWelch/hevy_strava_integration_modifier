const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Webhook verification endpoint
app.get("/webhook", (req, res) => {
  const { "hub.mode": mode, "hub.verify_token": token, "hub.challenge": challenge } = req.query;

  if (mode === "subscribe" && token === process.env.STRAVA_VERIFY_TOKEN) {
    console.log("Webhook verified.");
    res.status(200).json({ "hub.challenge": challenge });
  } else {
    res.status(403).send("Verification failed.");
  }
});

// Webhook event receiver
app.post("/webhook", async (req, res) => {
  const event = req.body;

  if (event.object_type === "activity" && event.aspect_type === "create") {
    console.log(`New activity: ${event.object_id}`);

    // Retry logic for delayed Strava processing
    const tryUpdate = async (retriesLeft) => {
      try {
        const token = await refreshAccessToken();

        const activityRes = await axios.get(`https://www.strava.com/api/v3/activities/${event.object_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const activity = activityRes.data;
        const description = activity.description || "";

        if (description.includes("Hevy")) {
          const modified = ""; // Removing the whole description for now...
          await axios.put(`https://www.strava.com/api/v3/activities/${event.object_id}`, {
            description: modified
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          console.log("Description updated.");
        } else {
          console.log("Not a Hevy post — skipping.");
        }
      } catch (error) {
        const err = error.response?.data || error.message;
        if (retriesLeft > 0 && err.message === "Record Not Found") {
          const attemptNumber = 11 - retriesLeft;
          console.warn(`Activity not ready — attempt #${attemptNumber}, retrying in 10s (${retriesLeft} left)`);
          setTimeout(() => tryUpdate(retriesLeft - 1), 10000);
        } else {
          console.error("Error modifying activity:", err);
        }
      }
    };

    // Start the retry loop (6 tries, 10s apart)
    tryUpdate(6);
  }

  res.status(200).send("OK");
});

// Strava OAuth token refresh
async function refreshAccessToken() {
  const res = await axios.post("https://www.strava.com/api/v3/oauth/token", null, {
    params: {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token"
    }
  });
  return res.data.access_token;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
