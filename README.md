# Project Friendship App

The **Project Friendship Mobile Application** serves the purpose of connecting St. Olaf and Carleton College students to their mentee's parents to schedule hangouts and events. Also allows for a mean to emergency contact the PF organization or other alert other St. Olaf/Carleton students of any emergencies. 

Here is the initial prototype created in July: [Google Presentation](https://docs.google.com/presentation/d/1YQho84Fd8_VQ12D2q5Jli4o7HsH273ovf5yKlhiTxSM/edit).

## Technologies Used

**NodeJS** - Creating Express.js RESTful API server in MVC environemnt. 

**React Native** - Frontend.

**PostgreSQL** - backend database.

**AWS** - deployment of Express.js server.

**Expo** - SDK environment. 

## Features

Incoming features for baseline deployment are marked with a `*` character.

* **Registration**: the registration screen ensures that every field is complete before sending a registration request to the database. An admin can then approve, edit, deny this request as they please.

* **Google OAuth User Login**: after registration is completed and approved, users can login using their gmail account using safe, passwordless Google Authentication. An admin can still edit user email, phone number and every account detail, even being able to delete the account with cascading delete API calls to the backend to ensure user privacy*. 

* **Phone Number Login\***: for parents who do not have a gmail account, to allow for more accessibility, I would like to allow for phone-number login. To avoid storing phone number in our PF database, password hashing will be used. 

* **Profile page**
    * Mentor's View:

        **My Profile**: Mentor is able to view their profile and private information. Mentors must contact admin to edit their person information for security purposes.

        **My Relationships**: Mentors can click on this tab to see their relationships. Mentor's have QR codes that parents can scan and assign given mentor to a child*. Mentors can scan a child's QR code to add that child to their relationship, so they can start sending event requests.

        **Logs**: *mentors only* - mentors of the Project Friendship community will have access to their previously completed events, the number of hours spent at each, and total hours contributed. 



## Extra Features
* **"Delete My Account" Button**: An extra feature would be to have a "Delete My Account" requesting button that an admin can approve for retiring St. Olaf/Carleton students from the PF program*.



## Setup 

### Environment Version
* node.js `v16.14.0`
* npm -v `8.3.1`

### Instructions using anansi.stolaf.edu hosted PSQL server
1. Install Expo Cli/Expo App on mobile phone.
1. Connect to VPN or St. Olaf network to be able to connect to the backend.
1. Have a `.pgpass` file with PostgreSQL schema password.
1. Copy/paste psql tables into PostgreSQL schema from `psql-tables` folder. 
1. Change username in line 273 from `khan6` to your own. 
1. In lib files, you will have to go through every file and change the url route for the database to your own url (I will work on making this easier to do using a secret file). You can obtain the relavent IP address by going into path `/pf-server`, do `npm i` to install dependencies, and then `npm run deploy` to start running the server. One of the IP addresses shown is the one you swap the url IP address with. 
1. Now to start the frontend, run `npm i` in the base directory of the repo.
1. Finally, run `expo start`, scan the QR code!
