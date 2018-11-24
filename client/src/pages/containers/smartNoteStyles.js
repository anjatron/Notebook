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
  updateNoteTag
} from 'pages/actions';

import NoteStyles from 'pages/components/noteEditor/noteStyles/noteStyles';

const mapStateToProps = (state) => ({
    user: state.user,
    noteType: state.viewing.type,
    note: state.viewing,
    content: state.viewing.content
});

const mapDispatchToProps = (dispatch) => ({
    onEditNote: (noteId, data) => {
        dispatch(editNote(noteId, data));
    }
});

const NoteStylesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteStyles);

export default NoteStylesContainer;