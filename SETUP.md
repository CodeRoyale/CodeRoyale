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
 git clone https://github.com/CodeRoyale/codeRoyale-Question-api
 cd codeRoyale-Question-api
 npm install

```

2. Run development server command `npm run dev`

3. Test by sending requests at `localhost:3000`

## Testing

1. To run all the tests with mocha:

```
 npm run test

```

# Development

## Before starting to make changes

1. Create a new branch

```
git checkout -b branch_name

```

2. Make your relevant changes

3. Make appropriate changes in test if have changed the API or created new API

4. Make sure to document the changes in code by commenting it. Make relevant changes in swagger documentation if required.

5. To run all the tests with mocha before commiting it:

```
 npm run test

```

## Before Commiting / Pushing to repo

- Format all files supported by Prettier in the current directory and its subdirectories
```
npm run prettier:write
```
- Check that all files match prettier code style
```
npm run prettier:check 
```
- Run eslint to check whether all files follow the lint rules
```
npm run lint
```
- Run eslint to handle the simple fixes automatically
```
npm run lint:fix

```
