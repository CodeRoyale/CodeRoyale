# CodeRoyale-Frontend

This is the frontend for **CodeRoyale**.

## Setup and run

To setup the project locally follow the instructions:

#### Fork

_**Note**_: _This is only needed if you want to contribute to the project._

If you want to contribute to the project you will have to create your own copy of the project on GitHub. You can do this by clicking the Fork button that can be found on the top right corner of the [landing page](https://github.com/CodeRoyale/codeRoyale-frontend) of the repository.

#### Clone

_**Note**_: _For this you need to install git on your machine. You can download the git tool from [here](https://git-scm.com/downloads)._

- If you have forked the project, run the following command -

  `git clone https://github.com/YOUR_GITHUB_USER_NAME/codeRoyale-frontend`

  where `YOUR_GITHUB_USER_NAME` is your GitHub handle.

- If you haven't forked the project, run the following command -

  `git clone https://github.com/CodeRoyale/codeRoyale-frontend`

#### Remote

_**Note**_: _This is only needed if you want to contribute to the project._

When a repository is cloned, it has a default remote named `origin` that points to your fork on GitHub, not the original repository it was forked from. To keep track of the original repository, you should add another remote named upstream. For this project it can be done by running the following command -

`git remote add upstream https://github.com/CodeRoyale/codeRoyale-frontend`

You can check that the previous command worked by running `git remote -v`. You should see the following output:

```
$ git remote -v
origin  https://github.com/YOUR_GITHUB_USER_NAME/codeRoyale-frontend (fetch)
origin  https://github.com/YOUR_GITHUB_USER_NAME/codeRoyale-frontend (push)
upstream        https://github.com/CodeRoyale/codeRoyale-frontend (fetch)
upstream        https://github.com/CodeRoyale/codeRoyale-frontend (push)
```

### Run app

Download the latest stable version of NodeJs [here](https://nodejs.org/en/download/) and install it. Run `node --version` to verify successful installation.

To get the frontend running locally:

- Clone this repository
- `npm install` to install all required dependencies
- `npm start` to start the local server

## Contributing

**This project is under active development**

Please read our [Contributing Guidelines](CONTRIBUTING.md)

## Branches

- **master**: This branch contains the code running at production.
- **develop**: This contains the latest code. All the contributing PRs must be sent to this branch.
