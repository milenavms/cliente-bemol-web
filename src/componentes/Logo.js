import React from 'react';
import img from '../logo.png'
const Logo = (props) => {

    return (
        <div class="media center text-center">
            <img src={img} class="mr-3 img rounded mx-auto d-block" alt="..." />
        </div>
    );
}

export default Logo;