# Project Friendship App

Here is a quick and recent app update: https://drive.google.com/file/d/1YoocMhNg-2l8-x5lVzupCpd25hi-Gz6u/view?usp=sharing

## Setup 
1. Install Expo Cli/Expo App on mobile phone.
1. Connect to VPN or St. Olaf network to be able to connect to the backend.
1. Have a `.pgpass` file with PostgreSQL schema password.
1. Copy/paste psql tables into PostgreSQL schema from `psql-tables` folder. 
1. Change username in line 273 from `khan6` to your own. 
1. In lib files, you will have to go through every file and change the url route for the database to your own url (I will work on making this easier to do using a secret file). You can obtain the relavent IP address by going into path `/pf-server`, do `npm i` to install dependencies, and then `npm run deploy` to start running the server. One of the IP addresses shown is the one you swap the url IP address with. 
1. Now to start the frontend, run `npm i` in the base directory of the repo.
1. Finally, run `expo start`, scan the QR code!
