# Setup

## Prerequisites

Before starting to test this **API** locally you need to assure you have the following
prerequisites:

- **Node.JS** see: [Installing Node.js](https://nodejs.org/)

- **npm** see: [Installing npm](https://www.npmjs.com/get-npm)

- **MongoDB** see: [Installing MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation and usage

1. Clone the repo and install all the required packages:

```
# Fork the project
# Clone this repository
$ git clone https://github.com/YOUR_USERNAME/codeRoyale-user-api.git
# Go into the repository
$ cd codeRoyale-user-api
```
### Creating a local environment for development

1. Create a .env file at the root of the project. (Do not **edit** or **rename** .env.example)

2. Copy the contents of .env.example into your .env file.

3. Create your Google Client ID by following [this](https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret) and replace `CLIENT_ID` in .env with your newly created Google Client ID.

4. Create your Facebook App ID & App Secret by following [this](https://developers.facebook.com/docs/development/) and replace `FACEBOOK_APP_ID ` , `FACEBOOK_APP_SECRET ` , `FACEBOOK_APP_URL ` in .env with your newly created Facebook Creds.

### Install dependencies and start development server

```bash
# Install dependencies
$ npm install --aslo=dev
# Starts development server using nodemon
$ npm run dev
# Wait for the development server to load and the server should be live at http://localhost:5000
```

# Development

## Before starting to make changes

1. Create a new branch

```bash
# Create a new branch
$ git checkout -b branch_name
```

2. Make your relevant changes

3. Make sure to document the changes in code by commenting it.

4. Make sure to rewrite or write new test case for new chnages

## Before Commiting / Pushing to repo

<-- All Style Guide scripts -->
