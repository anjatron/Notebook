'use strict';

import {
    connect
} from 'react-redux';

import {
    openFolder,
    openNote,
    loadContentRequested,
    clearViewingType,
    deleteFolder,
    deleteNote
} from 'pages/actions';

import ContentView from 'pages/components/contentView/contentView';

const mapStateToProps = (state) => ({
    folders: state.folders,
    notes: state.notes,
    username: state.user.username,
    NoteTemplate: state.NoteTemplate,
    FolderTemplate: state.FolderTemplate,
    viewingType: state.viewingType,
    loading: state.loading,
    loggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
    onOpenFolder: (id) => {
        dispatch(openFolder(id, 'folder'))
    },
    onOpenNote: (id) => {
        dispatch(openNote(id, 'note'))
    },
    loadContent: (username) => {
        dispatch(loadContentRequested(username))
    },
    onDeleteNote: (item) => {
        dispatch(deleteNote(item))
    },
    onDeleteFolder: (item) => {
        dispatch(deleteFolder(item))
    },
    clearViewingType: () => {
        dispatch(clearViewingType())
    },
});

const ContentViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentView);

export default ContentViewContainer;