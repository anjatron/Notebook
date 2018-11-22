'use strict';

let NoteTemplate = {
    created_by: '',
    shared: [],
    rootFolder: undefined,
    path: undefined,
    type: 'text',
    content: '',
    name: '',
    tags: ''
};

let FolderTemplate = {
    created_by: '',
    shared: [],
    rootFolder: undefined,
    path: undefined,
    name: ''
};

let initialState = {
    allConent: [],
    allUsers: [],
    loading: false,
    loggedIn: false,
    user: {
        username: '', 
        sharedFolders: undefined // map of folder ids and user permission
    },
    folders: undefined,
    notes: undefined,
    noteType: 'text',
    searchTerm: '',
    viewing: undefined,
    viewingType: undefined,
    NoteTemplate: NoteTemplate,
    FolderTemplate: FolderTemplate,
    searchResults: undefined,
    subFolder: undefined,
    subNote: undefined,
    banner: undefined
};

import utils from 'utils';

const NotebookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER_REQUESTED':
        case 'GET_ALL_USER_CONTENT_REQUESTED': {    
            var newState = _.cloneDeep(state);
            newState.loading = true;

            return newState;
        }
        case 'LOGIN_USER_SUCCEEDED': {
            newState = _.cloneDeep(state);

            newState.user.username = action.username;

            newState.loggedIn = true;
            newState.loading = false;

            return newState;
        }
        case 'GET_ALL_USER_CONTENT_SUCCEEDED': {
            newState = _.cloneDeep(state);

            newState.folders = action.folders;
            newState.notes = action.notes;
            newState.loading = false;
            newState.viewingType = 'home';

            return newState;
        }
        case 'ADD_FOLDER': {
            newState = _.cloneDeep(state);

            let clonedFolders = newState.folders.slice();
            clonedFolders.push(action.folder);

            newState.folders = clonedFolders;

            newState.viewing = action.folder;
            newState.viewingType = 'folder';

            return newState;
        }
        case 'ADD_NOTE': {
            newState = _.cloneDeep(state);
   
            let clonedNotes = newState.notes.slice();
            clonedNotes.push(action.note);

            newState.notes = clonedNotes;
            newState.viewing = action.note;
            newState.viewingType = 'note';

            return newState;
        }
        case 'SHARE_FOLDER': {
            newState = _.cloneDeep(state);

            return newState;
        }
        case 'EDIT_FOLDER': {
            newState = Object.assign({}, state);

            let thisFolder = _.find(newState.folders, (folder) => {
                return action.folderId === folder._id;
            });

            newState.folder = newState.folder;

            newState.viewing = thisFolder;

            return newState;
        }
        case 'EDIT_NOTE': {
            newState = Object.assign({}, state);

            // find note and update data
            let thisNote = _.find(newState.notes, (note) => {
                return action.noteId === note._id;
            });

            thisNote.content = action.data;

            newState.viewing = thisNote;

            return newState;
        }
        case 'OPEN_NOTE':
        case 'OPEN_FOLDER': {
            newState = _.cloneDeep(state);

            newState.viewing = action.data;
            newState.viewingType = action.viewingType;

            return newState;
        }
        case 'NOTE_TYPE_CHANGE': {
            newState = _.cloneDeep(state);

            // find note and update its type
            let thisNote = _.find(newState.notes.slice(), (note) => {
                return action.noteId === note._id;
            });

            // delete language
            if (thisNote.type === 'codesnippet') {
                delete thisNote.language;
            }

            thisNote.type = action.noteType;
            thisNote.content = '';

            // set langauge if code
            if (thisNote.type === 'codesnippet') {
                thisNote.language = 'javascript';
            }

            if (action.noteType === 'todolist') {
                // start with one task
                thisNote.content = [];
                thisNote.content.push({
                    text: '',
                    done: false
                });
            }

            newState.notes = newState.notes;
            newState.noteType = action.noteType;
            newState.viewing = thisNote;

            return newState;
        }
        case 'CLEAR_VIEWING_TYPE': {
            newState = _.cloneDeep(state);

            newState.viewing = undefined;
            newState.viewingType = undefined;

            return newState;
        }
        case 'NOTE_NAME_CHANGE': {
            newState = _.cloneDeep(state);

            let thisNote = _.find(newState.notes.slice(), (note) => {
                return action.noteId === note._id;
            });

            thisNote.name = action.noteName;
            newState.viewing = thisNote;  
            
            return newState;
        }
        case 'FOLDER_NAME_CHANGE': {
            newState = _.cloneDeep(state);

            let thisFolder = _.find(newState.folders.slice(), (folder) => {
                return action.folderId === folder._id;
            });

            thisFolder.name = action.folderName;   
            newState.viewing = thisFolder;  
            
            return newState;
        }
        case 'SEARCH_CONTENT': {
            newState = _.cloneDeep(state);

            // check if folder is open and search inside that folder
            // need to return folder search results
            let newResults = undefined;
            if (action.searchTerm === '') {
                newResults = undefined;
            } else {
                newResults = utils.searchNotes(newState.notes.slice(), action.searchTerm);
            }

            newState.searchTerm = action.searchTerm;
            newState.searchResults = newResults;

            return newState;
        }
        case 'DELETE_NOTE': {
            newState = _.cloneDeep(state);
            let newNotes = utils.deleteItem(newState.notes.slice(), action.note._id);

            newState.notes = newNotes;

            return newState;
        }
        case 'DELETE_FOLDER': {
            newState = _.cloneDeep(state);
            let newFolders = utils.deleteItem(newState.folders.slice(), action.folder._id);

            newState.folders = newFolders;

            return newState;
        }
        case 'UPDATE_NOTE_TAGS': {
            newState = _.cloneDeep(state);

            let thisNote = _.find(newState.notes.slice(), (note) => {
                return action.noteId === note._id;
            });

            thisNote.tags = action.tags;   
            
            newState.notes = newState.notes;

            return newState;
        }
        case 'CODE_LANGUAGE_CHANGE': {
            newState = _.cloneDeep(state);

            let thisNote = _.find(newState.notes.slice(), (note) => {
                return action.noteId === note._id;
            });

            thisNote.language = action.language;      

            newState.notes = newState.notes;

            return newState;
        }
        case 'DISPLAY_BANNER': {
            newState = _.cloneDeep(state);

            newState.banner = {
                type: action.bannerType
            };
            _.extend(newState.banner, action.data);
            return newState;
        }
        case 'DISMISS_BANNER': {
            newState = _.cloneDeep(state);

            newState.banner = undefined;
            return newState;
        }

        default:
            return state;
    }
};

export default NotebookReducer;