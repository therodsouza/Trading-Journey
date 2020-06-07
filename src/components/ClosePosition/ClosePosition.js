import React, { useState, useEffect } from 'react';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import { checkValidity } from '../../util/utility';

const ClosePosition = props => {

    const [formIsValid, setFormIsValid] = useState(false);

    const formBaseState = {
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter closing price'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            label: 'Price:'
        },
        reason: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Professional', displayValue: 'Professional' },
                    { value: 'Cant always win', displayValue: 'Cant aways win' },
                    { value: 'Greed', displayValue: 'Greed' },
                    { value: 'Fear', displayValue: 'Fear' },
                    { value: 'Regreat', displayValue: 'Regreat' },
                    { value: 'Whipsaw', displayValue: 'Whipsaw' }
                ],
                placeholder: 'Reason'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        tags: {
            elementType: 'tagsinput',
            value: [],
            validation: {
                
            },
            valid: false,
            touched: false
        }
    };

    const [closePositionForm, setClosePositionForm] = useState(formBaseState);

    const id = props.id;

    useEffect(() => {
        return () => {
            setClosePositionForm(formBaseState);
        }
    }, [id]);

    const formElementsArray = [];
    for (let key in closePositionForm) {
        formElementsArray.push({
            id: key,
            config: closePositionForm[key]
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedClosePositionForm = {
            ...closePositionForm
        }

        const updatedFormElement = {
            ...updatedClosePositionForm[inputIdentifier]
        }

        updatedFormElement.value = event.target ? event.target.value : event; // fix this
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedClosePositionForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedClosePositionForm) {
            formIsValid = updatedClosePositionForm[inputIdentifier].valid && formIsValid;
        }

        setClosePositionForm(updatedClosePositionForm);
        setFormIsValid(formIsValid);
    };

    const closePositionHandler = (event) => {
        event.preventDefault();
        const closeParameters = {
            id: props.id,
            priceOut: closePositionForm.price.value,
            reason: closePositionForm.reason.value,
            tags: closePositionForm.tags.value
        }
        props.onComplete(closeParameters);
    };

    let form = (
        <form>
            {
                formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        label={formElement.config.label} />
                ))
            }

            <Button btnType="Success"
                disabled={!formIsValid}
                onClick={closePositionHandler}>Close</Button>
        </form>
    );

    return (
        <div>
            <h4>Close Position <strong>{props.id}</strong></h4>
            {form}
        </div>
    );
}

export default ClosePosition;
