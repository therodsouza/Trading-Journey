import React, { useState } from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Wrapper from '../../hoc/WrapperAux/WrapperAux';

const CloseSession = props => {

    const [comments, setComments] = useState(null);

    const inputChangedHandler = event => {
        setComments(event.target.value);
    }

    return (
        <Wrapper>
            <Input
                label='Comments'
                elementType='textarea'
                changed={(event) => inputChangedHandler(event)} />

            <Button btnType="Danger" onClick={() => props.onSessionClosed(comments)}>End</Button>
        </Wrapper>)

};

export default CloseSession;