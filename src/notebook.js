import React from 'react';
import { withRouter } from 'react-router';
import {
    Grid,
    CssBaseline
} from '@material-ui/core';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HeaderContainer from 'pages/containers/smartHeader';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#64B5F6',
            main: '#2196F3',
            dark: '#0D47A1',
            contrastText: '#fff',
        },
        secondary: {
            light: '#4DB6AC',
            main: '#009688',
            dark: '#004D40',
            contrastText: '#000',
        },
        pageHolder: '#90A4AE'
    },
    typography: {
        fontSize: 12,
    }
});

class Notebook extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('notebook mounted');
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={8}>
                    <CssBaseline/>

                    <HeaderContainer history={this.props.history}/>

                    <Grid item xs={12}>
                        {this.props.children}
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        )
    }
};

export default withRouter(Notebook);
