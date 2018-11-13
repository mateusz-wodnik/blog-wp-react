# Wordpress + React blog site

## Description
This project is using Wordpress as a backend and serves content through customized wordpress REST API. This endpoints are available on `/wp-json/` route.  
Front-end is created with React.js and contains custom FLUX (Redux like) implementation that takes advantage of React Context API to manage internal application state.  

## Live preview
http://wp-react.cba.pl/

## Important files
* `public/functions.php` - main Wordpress theme functions
* `public/theme-client.php` - Wordpress REST API custom routes
* `public/class-theme-{name}-widget.php` - custom Wordpress widgets
* `src/grid.module.sass` - primary application grid/skeleton
* `src/widgets` - Wordpress related widgets
* `src/modules` - reusable, independent, stateless components
* `src/components` - main application components
* `src/Store.js` - main (flux) application store
* `src/_utils` - reusable Actions and Reducers creators

## Build setup
This app was developed using:
* PHP
* Wordpress
* ES6
* CRA
* React.js
* SASS (original syntax)
* CSS Modules
* HTML5

In development project requires to have running server with installed Wordpress.  
Wordpress permalinks settings have to be set to: `%category%postname%`.

```bash
# To install dev-dependencies, just go to the root folder and run
yarn install

# To build server and install Wordpress run
cd server
docker-compose up

# To run dev version run
yarn start

# Before build
You may have to change Wordpress directory credentials to be able to copy build folder into wordpress/wp-content/themes directory.
# To build production version run
yarn build
```
