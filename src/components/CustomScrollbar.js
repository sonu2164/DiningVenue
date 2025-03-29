// CustomScrollbar.js
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
// import './CustomScrollbar.css';

const CustomScrollbar = ({ children }) => {
    return (
        <Scrollbars
            style={{ height: 1000 }}>

            {children}
        </Scrollbars>
    );
};

export default CustomScrollbar;
