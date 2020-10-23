# React Accounting Year

v 1.0
 Base init stable application


##  How to install

```bash
# Install dependencies
cd reactaccountingyear
npm install
```

Main plot
 React Accounting Year is an application that uses classical redux pattern, with store and reducers.
 It's main idea to create tasks and view then by Accounting Year Quarter.
 The App also is PWA application which means it can work offline, leave push notifications
  and mobile friendly.


## How to test
Currently using react-scripts build-in test tool based on jest with test help of enzyme.
Tests are commonly spread among component folders
Exm. utils tests are in folder  utils/test this way, in my opinion, is more comfortable for importing
required files

cmd -> npm run test


## How to run

### The client side
Use command: npm run start
Program will start localhost:3000


```bash
 Check the page in desired Browser

 Best viewed in Firefox, Chrome, works desktop and mobile

 # Table libraries
  Uses react-bootstrap-table-next as base and filter react-bootstrap-table2-filter
  CSS  Plain SCSS with CSS Grid as game grid layout

	Plot
   Uses redux pattern.
   Consists of components: lists, calendar graphics
   And actions with reducers

     Libraries:
	  node-sass - sass
	  sass-loader

    Dockerfile - docker container, it's first time for add project to this type of file
      It should work

     Scheme:
	   Contents
	    pages - pages of application
	    actions - redux actions (send signals to get data to server)
	    components - parts, that are required for pages
	    reducers - redux building blocks of handling state change with business logic (gets data from server)
		styles/ - common scss styles
		serviceWorker - to make the app PWA application

		App.js - main page declaration
	    store.js - redux store
	    index.js - starting point whole application
	    setupTests - setup enzyme adapter
		tests are spread among folders

		App ->  entry point application

		  Tasks component -> tasks add, edit, delete logic
		  Quarter component -> shows calendar columns and highlighted tasks

		 You also can adjust number of columns size.

  ### How to use the application
  Just Add some tasks with start, end date
  Swipe to Quarter page and set some close to tasks date
  You will see all blank and task weeks.


  Enjoy the app and do call if you have some feedback.
  Thanks for the task!

