'use strict';

import {
  connect
} from 'react-redux';

import {
  addFolder,
  addNote,
  searchContent,
  clearViewingType,
  createNote, 
  createFolder,
  saveNoteUpdates, 
  saveFolderUpdates,
} from 'pages/actions';

import Header from 'pages/components/appHeader/header';

const mapStateToProps = (state) => ({
    searchTerm: state.searchTerm,
    username: state.user.username,
    NoteTemplate: state.NoteTemplate,
    FolderTemplate: state.FolderTemplate,
    viewingType: state.viewingType,
    viewing: state.viewing,
    searchResults: state.searchResults
});

const mapDispatchProps = (dispatch) => ({
    onAddFolder: (data) => {
        dispatch(addFolder(data))
    },
    onAddNote: (data) => {
        dispatch(addNote(data))
    }, 
    onSearchContent: (searchTerm) => {
        dispatch(searchContent(searchTerm))
    },
    clearViewingType: () => {
        dispatch(clearViewingType())
    },
    onCreateNote: (noteData) => {
        dispatch(createNote(noteData))
    },
    onCreateFolder: (folderData) => {
        dispatch(createFolder(folderData))
    },
    onSaveNoteUpdates: (username, noteData) => {
        dispatch(saveNoteUpdates(username, noteData))
    },
    onSaveFolderUpdates: (username, folderData) => {
        dispatch(saveFolderUpdates(username, folderData))
    }
});

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchProps
)(Header);

export default HeaderContainer;