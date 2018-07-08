'use strict';

import {connect} from 'react-redux';

import Account from 'pages/components/user/account';

const mapStateToProps = state => ({
    username: state.user.username
});

const AccountContainer = connect(
    mapStateToProps, 
    null
)(Account);

export default AccountContainer;