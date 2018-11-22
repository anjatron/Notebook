'use strict';

import ErrorBanner from './error';

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    dismiss() {
        this.props.dismissBanner();
    }

    render() {
        if (this.props.banner && this.props.banner.type === 'error') {
            return (<ErrorBanner dismiss={this.dismiss.bind(this)} error={this.props.banner} />);
        }
        return '';
    }
}

export default Banner;