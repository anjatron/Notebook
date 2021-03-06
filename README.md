# Notebook
A custom notes application built with:
- [Electron](https://electronjs.org/)
- [React](https://reactjs.org/)
    - [Material UI](https://material-ui.com/)
    - [Redux](https://redux.js.org/) 
    - [Redux Sagas](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with Google Cloud option


The tech stack was specifically picked to work with some new frameworks - Electron, Material UI, and MongoDB in the cloud. Needless to say there were learning curves setting the project up but the experience let me gain fullstack force strength. This took me a couple of hours during the week nights to accomplish.  

### Capablities

In Notebook users can create an account that is stored in the cloud - to connect to your own cluster or localhost simply replace the uri string inside the config file. I have a temp account for the username ```kenobi``` that has existing data to view.

Any notes or folders created are saved with the username information.

Users can create different styles of notes - standalone in their notebook or within folders - as well as tag them. The notebook search filters both tags and names for quick access viewing. 

Note Styles: 
-  Plain Text
-  To Do List
-  Code Snippet
-  Markdown
-  HTML


### Project Overview

The application state is controlled by Redux architecture - firing actions on the page that update the state and render pages accordingly. All async actions that call the service are done by Saga actions that in turn update the state. The service connects to Mongodb created in Mongodb Atlas as a Google Cloud cluster (they have a free cluster deal which serves these purposes unless this suddenly blows up with user activity). Since routing is handles by [React Router](https://www.npmjs.com/package/react-router), the service calls are not as CRUD structured as they should be implementation whys based on paths but the saga actions do fire for route changes based on actions. 

For the data structure of notes and folders I went with as linear as possible so the filtering could be quicker for searching. Each note and folder holds a path that mimics what directories and content in your computer files is like. 

Note empty structure:                       
```
    created_by: '',
    shared: [],
    rootFolder: undefined,
    path: undefined,
    type: 'text',
    content: '',
    name: '',
    tags: ''
```

Folder empty structure:
```
    created_by: '',
    shared: [],
    rootFolder: undefined,
    path: undefined,
    name: ''
```

All content is saved as a string except To Do list which is an array of objects: ```{text: '', done: false}```.

For the markdown style note capablities, after some research I found a great node module that can be embedded called [SimpleMDE](https://www.npmjs.com/package/react-simplemde-editor). Originally I was going to make that option just mark the file as '.md', in the case exporting a file is implemented it would be saved correctly. The other option was creating a real time parser for markdown but with the time restraints of the week I decided that a helper module would give decent functionality. 
Both HTML and Code Snippet styling is brought to you by a handy library called [React-Highlight](https://github.com/akiran/react-highlight). It allows you to specify languages to convert input to the correct syntax. 

Note that changing the note style will remove all previous content that was set. 

Inpsiration for the design came from a mix of Google Drive and Microsoft Note. Material UI provides a lot of room for updating styling.

Sharing was not added but the concept would be - if there are other users logged in, they can be added to the root folder sharing attribute. Then any subfolders or notes would be updated as well. When the Notebook reloads, the user would see all of their creations as well as shared folders marked by an extra shared icon.

### Server

RESTful service in progress. It will run seperately from the electron app and will replace the current MongodbClient calls. 
Tech stack for service so far: 
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

Using mongoose has made connecting to Mongodb easy for updates, but the schema is not working properly so there are no models currently being created with the schema, just used to make calls to the DB.

### Build and Run Notebook

To install package modules, build the application and run it:
```
npm run build
```

To run electron in developer mode i.e. open developer console on start:
```
npm run dev
```

To run the service:
```
npm run server
```

### Improvements

- Features   
    - [ ] Sharing capabilites enabled 
    - [ ] Real time collaboration so users can work on the same page and see changes live
    - [ ] Download/export notes and notebooks 

- App infra 
    - [x] Error handling
    - [ ] Input validation 
    - [ ] Clean up styling; theme in general can be constructed better
    - [ ] Persist session based until app is killed 
    - [ ] All commonly used strings should go in constants file
    - [ ] Prop types
    - [ ] Webpack watch dev mode
    - [ ] Revisit service setup to be more RESTful _**in progress**_
    - [x] Linting
    - [ ] Mocha testing
    - [ ] Add logger to client and server

- Custom tools
    - [ ] Custom HTML real time pareser
    - [ ] Custom Markdown parser
    - [ ] More efficient searching mechanism





