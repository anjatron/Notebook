'use strict';

import {
    Grid,
    Button
} from '@material-ui/core';


import {
    KeyboardArrowRight,
    KeyboardArrowDown
} from '@material-ui/icons'
// notes & folders 
// current path
class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
    }

    clickedCrumb(item) {
        // on click should this.props.history.push('/{type}/{id}')
        if (item.type === 'note') {
            this.props.history.push('/note/' + item._id);
        } else {
            this.props.history.push('/folder/' + item._id);
        }
    }

    createBreadCrumb(paths) {
        let crumbs = [];

        paths.forEach((path, index) => {
            // if note check notes
            // else its a subfolder
            let item = undefined;
            if (path.includes('FOLDER-')) {
                item = _.find(this.props.folders, (folder) => {
                    return folder._id === path;
                })
            } else {
                item = _.find(this.props.notes, (note) => {
                    return note._id === path;
                })
            }

            let crumb = null;
            let crumbIcon = (<KeyboardArrowRight/>);
            let noClick = false;
                
            if (index === paths.length - 1) {
                // last crum no need for icon 

                crumbIcon = (<KeyboardArrowDown/>);
                noClick = true;
            } 

            let crumbName = (item && item.name) ? item.name : 'No name';
            crumb = (
                <Grid item xs={2} key={'crumb-' + item._id}>
                    <Button onClick={() => { if (!noClick) {this.clickedCrumb(item)}}}> 
                        {crumbName}
                        {crumbIcon}
                    </Button>
                </Grid>
            )

            crumbs.push(crumb);
        });

        return (crumbs);
    }

    render() {
        if (!this.props.path || this.props.path.split('/').length === 1) {
            return '';
        }

        // for every step in the path build a Btn > link 
        let BreadCrumbs = this.createBreadCrumb(this.props.path.split('/').slice());

        return(
            <Grid container direction="row" style={{borderBottomStyle: 'solid', borderBottomWidth: 'thin', borderBottomColor: '#B2DFDB'}}>
               {BreadCrumbs}
            </Grid>
        )
    }
}

export default BreadCrumbs;