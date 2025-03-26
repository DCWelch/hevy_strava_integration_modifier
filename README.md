# Hevy Strava Integration Modifier

This tool listens for new Strava activity events using a webhook and updates the description of workouts with a custom message or format.

The current implementation simply removes the description from posts containing "Hevy" in them, but keeps the title and image. This structure could be modified to work with most types of posts with a few tweaks.
