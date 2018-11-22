'use strict';

import {
    TextField,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@material-ui/core';

class SearchNotebook extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch(event) {
        // search entire notebook & inside folders - tags, name of folders and notes 
        // if viewing note - disable it
        let searchTerm = event.target.value;
        this.props.onSearchContent(searchTerm);
    }

    searchSelected(note) {
        this.props.openNote(note);
    }

    searchItems() {
        if (this.props.searchResults && this.props.searchResults.length > 0) {
            return (
                <List style={{zIndex: '99999', position: 'absolute', backgroundColor: '#ECEFF1', widows: '38%'}}>
                    {this.props.searchResults.map((note) => (
                        <ListItem key={'searchItem-' + note._id} style={{borderBottom: '1px'}} button onClick={() => this.searchSelected(note)}>
                            <ListItemText
                                primary={note.name}
                            />
                        </ListItem>
                    ))}
                </List>
            );
        }
        else {
            return '';
        }
    }

    render() {
        const SearchResultsList = this.searchItems();

        return (
            <div id="searchcomponent-wrapper"> 
                <TextField
                    id="search-notebook"
                    label="Search Notebook"
                    type="search"
                    margin="normal"
                    style={{color: '#ffff'}}
                    fullWidth={true}
                    onChange={(event) => this.handleSearch(event)}
                />
                <Paper>
                    {SearchResultsList}
                </Paper>
            </div>
        );
    }
}

export default SearchNotebook;