import React, { useState } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { checkValidity } from '../../../util/validation';

const SessionParameters = props => {

    const [formIsValid, setFormIsValid] = useState(false);

    const [sessionForm, setSessionForm] = useState({
        marketCondition: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Overall market condition'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },

        mentalStrength: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Mental strength'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },

        physicalStrength: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Physical strength'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    });

    const formElementsArray = [];
    for (let key in sessionForm) {
        formElementsArray.push({
            id: key,
            config: sessionForm[key]
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedSessionForm = {
            ...sessionForm
        }

        const updatedFormElement = {
            ...updatedSessionForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedSessionForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedSessionForm) {
            formIsValid = updatedSessionForm[inputIdentifier].valid && formIsValid;
        }

        setSessionForm(updatedSessionForm);
        setFormIsValid(formIsValid);
    }

    const nextPageHandler = (event) => {
        event.preventDefault();
        props.nextStep();
    }

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
                        touched={formElement.config.touched} />
                ))
            }
            <Button btnType="Success" disabled={!formIsValid} onClick={nextPageHandler}>Next</Button>

        </form>
    );

    return (
        <div>
            {form}
        </div>

    );
};

export default SessionParameters;