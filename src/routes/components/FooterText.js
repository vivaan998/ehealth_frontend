import React from 'react';
import PropTypes from 'prop-types';

const FooterText = (props) => (
	<React.Fragment>
		(C) { props.year } All Rights Reserved. This application is incorporated with eHealth.my
	</React.Fragment>
)
FooterText.propTypes = {
    year: PropTypes.node,
	name: PropTypes.node,
	desc: PropTypes.node,
};
FooterText.defaultProps = {
    year: "2021",
    name: "",
    desc: ""
};

export { FooterText };
