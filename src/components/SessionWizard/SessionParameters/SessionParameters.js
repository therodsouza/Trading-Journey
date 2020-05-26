import React, { useState, useEffect } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { checkValidity } from '../../../util/utility';

const SessionParameters = props => {

    useEffect(() => {
        console.log('SESSION_PARAMETERS');
    }, []);

    const [formIsValid, setFormIsValid] = useState(false);

    const [sessionForm, setSessionForm] = useState({
        marketCondition: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'uptrend', displayValue: 'Up Trend' },
                    { value: 'range', displayValue: 'Range' },
                    { value: 'downtrend', displayValue: 'Down trend' }
                ],
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
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '5', displayValue: 'Playing to win' },
                    { value: '4', displayValue: 'Playing to compete' },
                    { value: '3', displayValue: 'Playing to improve' },
                    { value: '2', displayValue: 'Playing to cruise' },
                    { value: '1', displayValue: 'Playing not to lose' },
                ],
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
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '5', displayValue: 'Strong' },
                    { value: '3', displayValue: 'Neutral' },
                    { value: '1', displayValue: 'Weak' },
                ],
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

        props.onComplete({
            marketCondition: sessionForm.marketCondition.value,
            mentalStrength: sessionForm.mentalStrength.value,
            physicalStrength: sessionForm.physicalStrength.value
        });

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