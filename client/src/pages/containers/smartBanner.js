'use strict';

import {connect} from 'react-redux';

import {
    dismissBanner
} from 'pages/actions';

import Banner from 'pages/components/common/banners/banner';

const mapStateToProps = state => ({
    banner: state.banner 
});

const mapDispatchProps = (dispatch) => ({
    dismissBanner: () => {
        dispatch(dismissBanner());
    }
});

const BannerContainer = connect(
    mapStateToProps, 
    mapDispatchProps
)(Banner);

export default BannerContainer;