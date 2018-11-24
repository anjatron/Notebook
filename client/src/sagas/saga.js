import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import UserService from 'services/userService';
import NotebookService from 'services/notebookService';

import {
    loadContentSucceeded,
    loginUserSucceeded,
    deleteNoteState,
    deleteFolderState,
    addFolder,
    addNote,
    displayBanner
} from 'pages/actions';

function createFolder(folder) {   
    return new Promise((resolve, reject) => {
        NotebookService.createFolder(folder, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function createNote(note) {   
    return new Promise((resolve, reject) => {
        NotebookService.createNote(note, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllNotes(username) {   
    return new Promise((resolve, reject) => {
        NotebookService.getAllNotesByUser(username, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllFolders(username) {
    return new Promise((resolve, reject) => {
        NotebookService.getAllFoldersByUser(username, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getContent(payload) {
    return Promise.all([
        getAllFolders(payload),
        getAllNotes(payload)
    ]).then((results) => {
        return {
            folders: results[0],
            notes: results[1]
        }
    });
}

function* getAllContentByUser(action) {
    try {
        const results = yield call(getContent, action.username);
        console.log(results);
        yield put(loadContentSucceeded(action.username, results.folders, results.notes));
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function getUser(username) {
    return UserService.createUser(username).then((result) => {
        return result;
    });
}

function* loginUser(action) {
    try {
        const result = yield call(getUser, action.username);

        yield put(loginUserSucceeded(action.username));
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function deleteNote(noteId) {
    return NotebookService.deleteNote(noteId);
}

function deleteFolder(folderId) {
    return NotebookService.deleteFolder(folderId);
}

function* deleteNoteInNotebook(action) {
    try {
        const result = yield call(deleteNote, action.note._id);

        yield put(deleteNoteState(action.note));
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function* deleteFolderInNotebook(action) {
    try {
        const result = yield call(deleteFolder, action.folder._id);

        yield put(deleteFolderState(action.folder));
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function loadFolder(folderId) {
    return new Promise((resolve, reject) => {
        NotebookService.getFolder(folderId, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function* getFolder(action) {
    try {
        const result = yield call(loadFolder, action.folderId);
        console.log('got folder data - ', result);

        yield put(addFolder(result));
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function loadNote(noteId) {
    return new Promise((resolve, reject) => {
        NotebookService.getNote(noteId, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function* getNote(action) {
    try {
        const result = yield call(loadNote, action.noteId);
        console.log('got note data - ', result);

        yield put(addNote(result));
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function* updateNote(action) {
    try {
        const result = yield call(createNote, action.note);
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function* updateFolder(action) {
    try {
        const result = yield call(createFolder, action.folder);
    } catch(error) {
        console.error(error);
        yield put(displayBanner('error', error));
    }
}

function* notebookSaga() {
    yield takeEvery("GET_ALL_USER_CONTENT_REQUESTED", getAllContentByUser);
    yield takeEvery("LOGIN_USER_REQUESTED", loginUser);
    yield takeEvery("DELETE_NOTE_REQUESTED", deleteNoteInNotebook);
    yield takeEvery("DELETE_FOLDER_REQUESTED", deleteFolderInNotebook);
    yield takeEvery("GET_FOLDER_REQUESTED", getFolder);
    yield takeEvery("GET_NOTE_REQUESTED", getNote);
    yield takeEvery("CREATE_FOLDER_REQUESTED", updateFolder);
    yield takeEvery("CREATE_NOTE_REQUESTED", updateNote);
}

export {notebookSaga, createFolder, createNote};