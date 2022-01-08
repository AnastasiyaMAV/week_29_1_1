import React, { useState } from 'react';
import { Alert } from 'antd';

function Comment(props) {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            {visible ? (
                <Alert message={props.message} type={props.type} afterClose={handleClose} />
            ) : null}
        </>
    );
}

export default Comment;
