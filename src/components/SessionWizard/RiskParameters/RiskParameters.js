import React, { useState } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { checkValidity } from '../../../util/validation';

const RiskParameters = props => {

    const [formIsValid, setFormIsValid] = useState(false);

    const [riskForm, setRiskForm] = useState({
        profitTarget: {
            elementType: 'currency',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter a presumable profit target for this session'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
            },
            valid: false,
            touched: false,
            label: 'Profit target:'
        },
    
        maxLoss: {
            elementType: 'currency',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter maximum loss allowed for this session'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
            },
            valid: false,
            touched: false,
            label: 'Max loss:'
        },
    
        stopLosses: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter consecutive stop losses allowed for this session'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
            },
            valid: false,
            touched: false,
            label: 'Consecutive stop losses:'
        },
        
        maxDrawdown : {
            elementType: 'currency',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter maximum drawdown'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
            },
            valid: false,
            touched: false,
            label: 'Max drawdown:'
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
                        label={formElement.config.label}
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