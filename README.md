# QUampus

Bringing together Queen's students one tap at a time

## Setup

Begin by cloning the repository.

### Frontend

1. `cd` to the directory `/frontend`.
2. run `npm install` to install the necessary node modules.
3. Visit https://console.cloud.google.com/home/dashboard and login with a google account.
4. Create a new Google Cloud project and obtain a Google Maps API key.
5. In the directory `frontend` create a new file called `.env`.
6. Add a line in the file that says `REACT_APP_GOOGLE_API_KEY=<Your API key here>`.
7. Replace `<Your API key here>` with the Google Maps API key you obtained in step 5.
8. Now you should be able to run the project with `npm start`.

### Backend

1. `cd` to the directory `/backend`.
2. If you don't already have the `venv` folder, create the environment by running `python -m venv venv`.
3. To activate the environment, run `venv\Scripts\activate.bat` if on Windows, `source venv/bin/activate` if on MacOS/Linux.
4. `pip install -r requirements.txt` to install any packages needed for the backend.
