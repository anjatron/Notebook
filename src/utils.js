'use strict';

import uuid from 'uuid/v4';

var utils = {
    searchNotes: function (notes, searchTerm) {
        // search tags and names
        let lowerCaseTerm = searchTerm.toLowerCase();

        let searchTags = _.filter(notes, (_note) => {
            if (_note.tags !== '') {
                if (_note.tags.toLowerCase().includes(lowerCaseTerm)) {
                    return _note;
                }
            }
        });

        let searchNames = _.filter(notes, (_note) => {
            return _note.name.toLowerCase().includes(lowerCaseTerm);
        });

        if (searchNames.length === 0 && searchTags.length === 0) {
            return [];
        }

        let results = searchNames.concat(searchTags);
        return _.uniq(results);
    },

    // given an array of data - notes/folder, and the folder we're viewing
    // return data that's a inside the folder
    getDataByPath: function (data, viewing) {
        return _.filter(data, (value) => {
            if (viewing.path !== null && value.path !== null && viewing._id !== value._id) {
                // subfolder path + value id === value path
                return viewing.path + '/' + value._id === value.path;
            }
            else if (viewing.path === null && value.path !== null && value.path.split('/').length === 2 && viewing._id !== value._id) {
                // root folder looking for its data
                return value.path.includes(viewing._id);
            } 
        })
    },

    deleteItem: function (data, _id) {
        let indexToDelete = _.findIndex(data, (value) => { return value._id === _id });

        data.splice(indexToDelete, 1);

        return data;
    },

    createNewDataObj: function (newData, state, prefix) {
        newData._id = prefix + uuid();;
        newData.created_by = {username: state.username};
        newData.path = undefined;

        // we're inside of a folder adding a subfolder
        if (state.viewingType === 'folder') {
            newData.rootFolder = state.viewing;

            // make sure we track path
            let pastPath = state.viewing.path
            if (!pastPath) {
                if (typeof state.viewing._id !== 'string') {
                    pastPath = state.viewing._id.toString();
                } else {
                    pastPath = state.viewing._id;
                }
            }
            newData.path = pastPath + '/' + newData._id;
        }

        return newData;
    },

    getRootData: function (data) {
        return _.filter(data, (item) => {
            if (item.path === null) {
                return true;
            }
        });
    }
}

export default utils;