# Setup

## Installation and usage

### Project in your local machine

```bash
# Fork the project
# Clone this repository
$ git clone https://github.com/YOUR_USERNAME/coderoyale-frontend.git
# Go into the repository
$ cd codeRoyale-frontend
```

### Creating a local environment for development

1. Create a .env file at the root of the project. (Do not **edit** or **rename** .env.example)

2. Copy the contents of .env.example into your .env file.

3. Create your Google Client ID by following [this](https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret) and replace `REACT_APP_GOOGLE_CLIENT_I` in .env with your newly created Google Client ID.

### Install dependencies and start development server

```bash
# Install dependencies
$ npm install
# Starts development server
$ npm start
# Wait for the development server to load and the website should be live at http://localhost:3000
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

4. Add all your changes for staging

```bash
# Adds all changes for stages
$ git add .
```

5. Create a commit message

```bash
# Create a commit message
$ git commit -m 'Your commit message'
```
6. Once you create a commit husky will run `npm run prettier:write` and `npm run lint` to make sure your changes follow our style guide, if an error is thrown make sure to correct it and commit again.  

7. Push

```bash
# Push to your forked repo
$ git push -u origin branch_name
```

8. Open a pull request by following our PR format and explain what your PR does in the description. Make sure to have a look at our CONTRIBUTING.md.

If you face **any** problems, feel free to ask our community at [Discord](https://discord.com/invite/aCKem4h8te) (#contribution-help)
