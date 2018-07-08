'user strict';

import {
  connect 
} from 'react-redux';

import {
  editNote,
  shareNote,
  openNote,
  addNote,
  clearViewingType,
  saveNoteChanges,
  changeNoteName,
  noteTypeChange,
  updateNoteTags,
  codeLanguageChange,
  getNote
} from 'pages/actions';

import NoteEditor from 'pages/components/noteEditor/noteEditor';

const mapStateToProps = (state) => ({
    user: state.user,
    noteType: state.noteType,
    note: state.viewing,
    notes: state.notes,
    folders: state.folders,
    NoteTemplate: state.NoteTemplate,
    viewingType: state.viewingType
});

const mapDispatchToProps = (dispatch) => ({
    onEditNote: (noteId, data) => {
        dispatch(editNote(noteId, data))
    },
    onNoteTypeChange: (noteId, noteType) => {
        dispatch(noteTypeChange(noteId, noteType))
    },
    onShareNote: (sharingWith, noteId) => {
        dispatch(shareNote(sharingWith, noteId))
    },
    clearViewingType: () => {
        dispatch(clearViewingType())
    },
    onSaveChanges: () => {
        dispatch(saveNoteChanges())
    },
    onNameChange: (noteId, name) => {
        dispatch(changeNoteName(noteId, name))
    },
    onAddNote: (noteId) => {
        dispatch(addNote(noteId))
    },
    onOpenNote: (noteData) => {
        dispatch(openNote(noteData, 'note'))
    },
    onUpdateNoteTags: (noteId, tags) => {
        dispatch(updateNoteTags(noteId, tags))
    },
    onCodeLanguageChange: (noteId, language) => {
        dispatch(codeLanguageChange(noteId, language))
    },
    onGetNote: (noteId) =>{
        dispatch(getNote(noteId))
    }
});

const NoteEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteEditor);

export default NoteEditorContainer;