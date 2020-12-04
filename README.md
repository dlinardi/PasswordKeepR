# keepr

**keepr** is a password generator and manager that creates and stores passwords for individuals and groups.

## Features
- Generates passwords based on user's specifications
- Allows users to add other members to their organizations.
- Allows an organization to invite users to view their **keepr** vault.

## Screenshots
!["#"]()

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Setup Database and create .env file (instructions below)
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

### Setting Up A Database
1. psql -c "CREATE DATABASE <database name>"
2. Using .env.example crate a .env file in the root directory with your database's informtion.
ie) 
DB_HOST=localhost
DB_USER=username
DB_PASS=password
DB_NAME=mydatabase
# Uncomment and set to true for Heroku
# DB_SSL=true if heroku
DB_PORT=5432
3. npm run db:reset


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

### Known Issues
===================================================================================================

Tweeter is a simple, single-page Twitter clone.  

Front-end was artisinally hand crafted using HTML, AJAX, CSS, jQuery; 

Back-end provided by Lighthouse Labs using Node, Express and MongoDB. 


## Front-End (Called in HTML)

- Viewport
- JQuery
- Bootstrap
- fontAwesome
- Google Font API

### Known Issues
- Creating a New Organization requires a refresh in order to show new content
- User Removal is working, but server sending a 500 status error

#### Features
- Single Page Application - No refresh required; all the information POST and GET are triggered within actions on the site.
- Responsive Design - Designed to support various display sizes, and transition between various sizes on the fly.


- Write a Tweet - Will open a text area and shift focus; the box will close as the user scrolls out of view (draft tweets will remain).
- Tweet Validation - Will not post empty tweets, or tweets over 140 characters.
- Tweet Character Counter - As the user types the couter will give automatically update with remaining characters. (Will show when past the limit)
- Scroll to Top Button will appear as the user start scrolling down.

#### To be Added
- Filter dropdown button populates search bar with tags generated from User's Current Organizations.
