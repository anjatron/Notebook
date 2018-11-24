export const loginUserRequested = (username) => ({
    type: 'LOGIN_USER_REQUESTED',
    username: username
});

export const loginUserSucceeded = (username) => ({
    type: 'LOGIN_USER_SUCCEEDED',
    username: username
});

export const loadContentSucceeded = (username, folders, notes) => ({
    type: 'GET_ALL_USER_CONTENT_SUCCEEDED',
    username: username,
    folders: folders,
    notes: notes
});

export const loadContentRequested = (username) => ({
    type: 'GET_ALL_USER_CONTENT_REQUESTED',
    username: username
});

export const addFolder = (folder) => ({
    type: 'ADD_FOLDER',
    folder: folder
});

export const addNote = (note) => ({
    type: 'ADD_NOTE',
    note: note
});

export const shareFolder = (sharingWith, folderId) => ({
    type: 'SHARE_FOLDER',
    data: sharingWith,
    id: folderId
});

export const shareNote = (sharingWith, noteId) => ({
    type: 'SHARE_NOTE',
    data: sharingWith,
    id: noteId
});

export const editNote = (noteId, noteData) => ({
    type: 'EDIT_NOTE',
    noteId: noteId, 
    data: noteData
});

export const openFolder = (folderData,viewingType) => ({
    type: 'OPEN_FOLDER',
    data: folderData,
    viewingType: viewingType
});

export const openNote = (noteId, viewingType) => ({
    type: 'OPEN_NOTE',
    data: noteId,
    viewingType: viewingType
});

export const searchContent = (searchTerm) => ({
    type: 'SEARCH_CONTENT',
    searchTerm: searchTerm
});

export const noteTypeChange = (noteId, noteType) => ({
    type: 'NOTE_TYPE_CHANGE',
    noteId: noteId,
    noteType: noteType
});

export const clearViewingType = () =>({
    type: 'CLEAR_VIEWING_TYPE'
});

export const changeNoteName = (noteId, noteName) => ({
    type: 'NOTE_NAME_CHANGE',
    noteId: noteId,
    noteName: noteName
});

export const changeFolderName = (folderId, folderName) => ({
    type: 'FOLDER_NAME_CHANGE',
    folderId: folderId,
    folderName: folderName
});

export const saveNoteChanges = (noteId) => ({
    type: 'SAVE_NOTE_CHANGE',
    noteId: noteId
});

export const updateNoteTags = (noteId, tags) => ({
    type: 'UPDATE_NOTE_TAGS',
    noteId: noteId,
    tags: tags
});

export const updateFolderTag = (folderId, tag) => ({
    type: 'UPDATE_FOLDER_TAG',
    noteId: noteId,
    tag: tag
});

export const createNote = (noteData) => ({
    type: 'CREATE_NOTE_REQUESTED',
    noteData: noteData,
});

export const createFolder = (folderData) => ({
    type: 'CREATE_FOLDER_REQUESTED',
    folderData: folderData
});

export const saveNoteUpdates = (username, noteData) => ({
    type: 'UPDATE_NOTE_REQUESTED',
    username: username,
    noteData: noteData
});

export const saveFolderUpdates = (username, folderData) => ({
    type: 'UPDATE_FOLDER_REQUESTED',
    username: username,
    folderData: folderData
});

export const deleteNote = (note) => ({
    type: 'DELETE_NOTE_REQUESTED',
    note: note
});

export const deleteFolder = (folder) => ({
    type: 'DELETE_FOLDER_REQUESTED',
    folder: folder
});

export const deleteNoteState = (note) => ({
    type: 'DELETE_NOTE',
    note: note
});

export const deleteFolderState = (folder) => ({
    type: 'DELETE_FOLDER',
    folder: folder
});

export const codeLanguageChange = (noteId, language) => ({
    type: 'CODE_LANGUAGE_CHANGE',
    noteId: noteId,
    language: language
});

export const getFolder = (folderId) => ({
    type: 'GET_FOLDER_REQUESTED',
    folderId: folderId
});

export const getNote = (noteId) => ({
    type: 'GET_NOTE_REQUESTED',
    noteId: noteId
});

export const openSubFolder = (folderData,viewingType) => ({
    type: 'OPEN_SUBFOLDER',
    data: folderData,
    viewingType: viewingType
});

export const openSubNote = (noteId, viewingType) => ({
    type: 'OPEN_SUBNOTE',
    data: noteId,
    viewingType: viewingType
});

export const displayBanner = (bannerType, data) => ({
    type: 'DISPLAY_BANNER',
    data: data,
    bannerType: bannerType
});

export const dismissBanner = () => ({
    type: 'DISMISS_BANNER'
});
