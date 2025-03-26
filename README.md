# Strava Integration Modifier

This tool listens for new [**Strava**](https://strava.com/) activity events using a webhook and updates them with a custom message or format.

The current implementation was developed to modify the description of posts from [**Hevy**](https://www.hevyapp.com/) using their default, non-customizable Strava integration. To match my preferences it simply removes the description while keeping the title and image the same, though this structure could be easily modified for many other Strava post manipulations with a few tweaks.

This project is designed to run on an Express.js server which serves as a webhook listener for incoming Strava activity events. Whenever a new activity is posted to Strava, Strava sends an event to the webhook. The server receives that event, checks if the activity was synced from Hevy, and if so, automatically modifies the activity’s description using the Strava API.

I personally use [**Render**](https://render.com/) to host the server, though any service that supports the same functionality would do.
