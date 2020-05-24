import React, { useState } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { checkValidity } from '../../../util/validation';

const RiskParameters = props => {

    const [formIsValid, setFormIsValid] = useState(false);

    const [riskForm, setRiskForm] = useState({
        profitTarget: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Profit target'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    
        maxLoss: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Max loss'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    
        stopLosses: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Consecutive stop losses'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        
        maxDrawdown : {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Max drawdown'
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
    for (let key in riskForm) {
        formElementsArray.push({
            id: key,
            config: riskForm[key]
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedRiskForm = {
            ...riskForm
        }

        const updatedFormElement = {
            ...updatedRiskForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedRiskForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedRiskForm) {
            formIsValid = updatedRiskForm[inputIdentifier].valid && formIsValid;
        }

        setRiskForm(updatedRiskForm);
        setFormIsValid(formIsValid);
    }

    const startSessionHandler = (event) => {
        event.preventDefault();
        alert('New trading session started. Good trade!')
    }

    const previousPageHandler = (event) => {
        event.preventDefault();
        props.previousStep();
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
            <Button btnType="Danger" onClick={previousPageHandler}>Previous</Button>
            <Button btnType="Success" disabled={!formIsValid} onClick={startSessionHandler}>Start</Button>

        </form>
    );

    return (
        <div>
            {form}
        </div>
    );
};

export default RiskParameters;