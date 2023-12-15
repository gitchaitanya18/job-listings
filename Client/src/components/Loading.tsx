import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
    return (
        <div className="transparent-loader-overlay">
            <Spinner color="primary" />
        </div>
    );
};

export default Loader;
