'use strict';

import {
    Grid,
    TextField,
    Input,
    Typography,
    Divider,
    Select,
    MenuItem
} from '@material-ui/core';

import Highlight from 'react-highlight';

class CodeSnippet extends React.Component {
    constructor(props) {
        super(props);
    }

    languageChange(value) {
        this.props.onCodeLanguageChange(this.props.note._id, value);
    }

    render() {

        return (
            <Grid container>
                <LanguagePicker 
                    language={this.props.note.language} 
                    onLanguageChange={this.languageChange}
                />
                <Grid item xs={6} style={{borderRightStyle: 'solid', borderRightWidth: 'thin', paddingLeft: '10px', paddingRight: '10px'}}>
                    <Typography variant='subheading'>
                        Code Editor
                    </Typography>
                    <Divider/>
                    <TextField 
                        id='note-codesnippet-text'
                        placeholder='Write code'
                        style={{position: 'absolute', height: 'inherit', margin: '10px', width: '45%'}}
                        multiline={true}
                        InputProps={{disableUnderline: true}}
                        defaultValue={this.props.content}
                        onChange={(event) => {this.props.onEditNote(this.props.note._id, event.target.value);}}
                    />
                </Grid>
                <Grid item xs={6} style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <Typography variant='subheading'>
                        Code Preview
                    </Typography>
                    <Divider/>
                    <Highlight id='note-codesnippet-code' language='javascript'>
                        {this.props.content}
                    </Highlight>  
                </Grid>
            </Grid>
        );
    }
}

class LanguagePicker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid item xs={12} style={{paddingBottom: '10px', paddingLeft: '10px'}}>
                <Select
                    autoWidth={true}
                    value={this.props.language}
                    onChange={(value) => this.props.onLanguageChange(value)}
                    inputProps={{
                        name: 'codesnippet-language',
                        id: 'codesnippet-language',
                    }}
                >
                    <MenuItem value='javascript'>javascript</MenuItem>
                    <MenuItem value='java'>java</MenuItem>
                    <MenuItem value='c++'>c++</MenuItem>
                </Select>
            </Grid>
        );   
    }
}

export default CodeSnippet;