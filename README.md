# keepr

**keepr** is a password generator and manager that creates and stores passwords for individuals and groups.

## Features
- Generates passwords based on user's specifications
- Allows users to add other members to their organizations.
- Allows an organization to invite users to view their **keepr** vault.

### Known Issues
- Creating a New Organization requires a refresh in order to show new content
- User Removal is working, but server sending a 500 status error

## Screenshots
!["#"]()

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Setup Database and create .env file (instructions below)
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

### Setting Up A Database
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Server Dependencies

- Node 5.10.x or above
- Bcrypt
- Body-parser
- Chalk
- EJS
- Express
- Morgan
- Node-sass-middleware
- pg
- pg-native

## Front-End (Called in HTML)

- Viewport
- Bootstrap
- AJAX
- JQuery
- fontAwesome
- Google Font API
