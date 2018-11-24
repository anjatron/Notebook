'use strict';

import {
    Link
} from 'react-router';

import {
    Grid,
    Card,
    CardContent,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemIcon,
    List,
} from '@material-ui/core';

import {
    Description,
    Folder,
    Delete
} from '@material-ui/icons';


class CardsView extends React.Component {
    constructor(props) {
        super(props);
    }

    openCard(item) {
        if (this.props.type === 'folder') {
            this.props.history.push('/folder/' + item._id);
        } else {
            this.props.history.push('/note/' + item._id);
        }
    }

    deleteCard(item) {
        // delete whatever the card is
        this.props.onDeleteItem(item);
    }

    render() {
        // let items = [];
        if (this.props.items.length > 0) {
            let CardIcon =  (<Folder />);
            let cardIconColor = {
                colorPrimary: '#00E676'
            };
            if (this.props.type === 'note') {
                CardIcon = (<Description />);
                cardIconColor.colorPrimary = '#FFEB3B';
            }

            return this.props.items.map((item, index) => {
                let cardName = (item.name) ? item.name : 'No name';
                return (
                    <Grid item xs={4} key={'card-' + index} style={{paddingTop: '15px'}}>
                        <Card raised={true}>
                            <CardContent>
                                <List dense={true}>
                                    <ListItem button onClick={() => {this.openCard(item);}} classes={{focusVisible: false}}>
                                        <ListItemIcon>
                                            {CardIcon}
                                        </ListItemIcon>
                                        <ListItemText primary={cardName}/>
                                        <ListItemSecondaryAction onClick={() => {this.deleteCard(item);}}>
                                            <IconButton aria-label="Delete">
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            });
        }
        return (null);
    }
}

export default CardsView;