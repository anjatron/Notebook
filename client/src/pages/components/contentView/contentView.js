'use strict';

import {
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core';

import utils from '../../../../utils';

import LoadingContent from 'pages/components/common/loading';
import ContentSection from 'pages/components/contentView/contentSection';

class ContentView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.isFolder) {
            this.props.loadContent(this.props.username);
        }
    }

    render() {
        let that = this;
        if (this.props.loading && this.props.loggedIn) {
            return (
                <LoadingContent message="Your notebook is loading..." />
            );
        }


        let FolderSection = '';
        let NotesSection = '';

        if (!_.isEmpty(this.props.folders)) {
            let rootFolders = this.props.folders.slice();
            if (!this.props.isFolder) {
                rootFolders = utils.getRootData(this.props.folders.slice());
            }
            if (rootFolders) {
                FolderSection = (
                    <ContentSection 
                        items={rootFolders} 
                        title="Folders" 
                        type='folder'
                        onOpenItem={this.props.onOpenFolder}
                        history={this.props.history}
                        onDeleteItem={this.props.onDeleteFolder}
                        clearViewingType={this.props.clearViewingType}
                    />);
            }

        }
        if (!_.isEmpty(this.props.notes)) {
            let rootNotes = this.props.notes.slice();
            if (!this.props.isFolder) {
                rootNotes = utils.getRootData(this.props.notes.slice());
            }
            if (rootNotes) {
                NotesSection = (
                    <ContentSection 
                        items={rootNotes} 
                        title="Notes" 
                        type='note'
                        onOpenItem={this.props.onOpenNote}
                        history={this.props.history}
                        onDeleteItem={this.props.onDeleteNote}
                        clearViewingType={this.props.clearViewingType}
                    />
                );
            }
        }

        // logged in but no data yet for this user - folders and notes are empty arrays
        if (!NotesSection && !FolderSection && !this.props.loading && this.props.loggedIn &&
            this.props.folders !== undefined && this.props.notes !== undefined) {
            return (
                <Grid id="content-view-grid-nothing-to-display" container alignItems="center" justify="center" direction="row" style={{paddingTop: '65px'}}>
                    <Typography variant="display1">
                        Welcome, {that.props.username} !
                    </Typography>
                </Grid>
            );
        }

        return (
            <Grid id="content-view-grid" container spacing={16}>
                {FolderSection}
                {NotesSection}
            </Grid>
        );
    }
}

export default ContentView;