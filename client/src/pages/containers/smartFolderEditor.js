'use strict';

import {
    connect
} from 'react-redux';

import {
    openFolder,
    openNote,
    saveFolderUpdates,
    deleteNote,
    deleteFolder,
    clearViewingType,
    changeFolderName,
    getFolder
} from 'pages/actions';

import FolderEditor from 'pages/components/folderEditor';

const mapStateToProps = (state) => ({
    folders: state.folders,
    notes: state.notes,
    username: state.user.username,
    NoteTemplate: state.NoteTemplate,
    FolderTemplate: state.FolderTemplate,
    viewingType: state.viewingType,
    viewing: state.viewing,
    loggedIn: state.loggedIn,
    loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
    onOpenFolder: (folderData) => {
        dispatch(openFolder(folderData, 'folder'));
    },
    onOpenNote: (noteData) => {
        dispatch(openNote(noteData, 'note'));
    },
    onAddFolder: (data) => {
        dispatch(saveFolderUpdates(data));
    },
    clearViewingType: () => {
        dispatch(clearViewingType());
    },
    onDeleteNote: (item) => {
        dispatch(deleteNote(item));
    },
    onDeleteFolder: (item) => {
        dispatch(deleteFolder(item));
    },
    onNameChange: (folderId, name) => {
        dispatch(changeFolderName(folderId, name));
    },
    onGetFolder: (folderId) => {
        dispatch(getFolder(folderId));
    }
});

const FolderEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FolderEditor);

export default FolderEditorContainer;