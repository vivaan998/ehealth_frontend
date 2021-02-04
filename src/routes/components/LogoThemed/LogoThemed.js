import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '../../../components/Theme';

const logos = {
    'white': './../../../images/logos/eHealth.png',
    'primary': './../../../images/logos/eHealth.png',
    'success': './../../../images/logos/logo-success.svg',
    'warning': './../../../images/logos/logo-warning.svg',
    'danger': './../../../images/logos/logo-danger.svg',
    'info': './../../../images/logos/logo-info.svg',
    'indigo': './../../../images/logos/logo-indigo.svg',
    'purple': './../../../images/logos/logo-purple.svg',
    'pink': './../../../images/logos/logo-pink.svg',
    'yellow': './../../../images/logos/logo-yellow.svg'
}

const getLogoUrl = (style, color) => {
    return logos[color];
}

// Check for background
const getLogoUrlBackground = (style, color) => {
    if (style === 'color') {
        return logos['white'];
    } else {
        return getLogoUrl(style, color);
    }
}

const LogoThemed = ({ checkBackground, className, ...otherProps }) => (

    <ThemeConsumer>
    {
        
        ({ style, color }) => (
            <img
                src={
                    checkBackground ?
                        getLogoUrlBackground(style, color) :
                        getLogoUrl(style, color)
                }
                className={ classNames('d-block', className) }
                alt="eHealth Logo"
                { ...otherProps }
                height="120px"
            />
        )
    }
    </ThemeConsumer>
   
);
LogoThemed.propTypes = {
    checkBackground: PropTypes.bool,
    className: PropTypes.string,
};

export { LogoThemed };
