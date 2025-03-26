# Strava Integration Modifier

This tool listens for new [**Strava**](https://strava.com/) activity events using a webhook and updates them with a custom message or format.

The current implementation was developed to modify the description of posts from [**Hevy**](https://www.hevyapp.com/) using their default, non-customizable Strava integration. To match my preferences it simply removes the description while keeping the title and image the same, though this structure could be easily modified for many other Strava post manipulations with a few tweaks.

This project is designed to run on an Express.js server which serves as a webhook listener for incoming Strava activity events. Whenever a new activity is posted to Strava, Strava sends an event to the webhook. The server receives that event, checks if the activity was synced from Hevy, and if so, automatically modifies the activity’s description using the Strava API.

I personally use [**Render**](https://render.com/) to host the server, though any service that supports the same functionality would do.

## Getting Started

To host this yourself, follow this general guide:

- Clone the repo
  - and run `npm install` if you are working locally or using a platform that does not auto-install dependencies
- Create a `.env` file with your following environment variables
  - `STRAVA_CLIENT_ID`
  - `STRAVA_CLIENT_SECRET`
  - `STRAVA_REFRESH_TOKEN`
  - `STRAVA_VERIFY_TOKEN`
- Deploy the server with any Node-compatible platform
- Register the webhook with Strava

## Contributing

If you want help, found a bug, or wish to suggest an improvement, please open [open an issue](https://github.com/your-username/strava-integration-modifier/issues). If you are not comfortable submitting an issue, feel free to reach out here:  
- Email: [dcwelch545@gmail.com](mailto:dcwelch545@gmail.com)

If you would like to contribute directly, feel free to fork the repo and submit a pull request!
