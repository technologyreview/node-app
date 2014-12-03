# Node App Framework
Forked from our internal style guide, this is a stripped down framework for hacking at HTTP API's with Node.js
[Demo](https://mittr-node-app.herokuapp.com/)

## Content
Content templates are located under `/public/views/`, and is powered by GitHub Flavored Markdown and Swig Templating.

## Requirements
1. Home Brew (Mac): `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` then `brew doctor`
1. Node.js: `brew install node` or by downloading an installing from [Nodejs.com](http://www.nodejs.com)
1. Bower for client-side package management: `npm install -g bower`

## Installation (Mac)
1. Open up the command line and change to a directory where you want to install the app: `cd ~/Sites`
1. Clone the repo to your machine: `git clone git@github.com:technologyreview/node-app.git; cd node-app`
1. Install node packages: `npm install`
1. Run the `gulp` command to build the project. This will install package dependencies using `bower`, and then start the local server
1. Open the browser to `http://localhost:9999`

## Systems
More info on the tools and systems used.

* [Gulp](http://gulpjs.com/) is used to automate build and compile processes
* *Node.js* is used for generating a micro HTTP server that serves routes and server-side JavaScript
* [Express](http://expressjs.com/) is a Node web app framework used for MVC routing
* [Nodemon](http://nodemon.io/) will monitor for any changes in your node.js application and automatically restart the server
* *LiveReload* is loaded by Gulp, and is used to for injecting CSS updates into the browser when a `/public/less/*.less` file is saved
* *Backbone.js*
* *Require.js* for AMD
* [Swig](http://paularmstrong.github.io/swig/) templating
* GitHub Flavored Markdown is automatically compiled when used in templates