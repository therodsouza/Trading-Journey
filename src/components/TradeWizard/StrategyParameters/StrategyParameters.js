import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import { checkValidity } from '../../../util/utility';

const StrategyParameters = props => {
    const [formIsValid, setFormIsValid] = useState(false);

    const baseState = {
        priceIn: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter price in'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            label: 'Price In:'
        },
        stopLoss: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter stop loss'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            label: 'Stop Loss:'
        },
        target: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter target'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            label: 'Target:'
        },
        volume: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter volume'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            label: 'Volume:'
        },
    };

    const [strategyParametersForm, setStrategyParametersForm] = useState(baseState);

    const formElementsArray = [];
    for (let key in strategyParametersForm) {
        formElementsArray.push({
            id: key,
            config: strategyParametersForm[key]
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedStrategyParametersForm = {
            ...strategyParametersForm
        }

        const updatedFormElement = {
            ...updatedStrategyParametersForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedStrategyParametersForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedStrategyParametersForm) {
            formIsValid = updatedStrategyParametersForm[inputIdentifier].valid && formIsValid;
        }

        setStrategyParametersForm(updatedStrategyParametersForm);
        setFormIsValid(formIsValid);
    }

    const previousPageHandler = (event) => {
        event.preventDefault();
        props.previousStep();
    }

    const activateTradeHandler = (event) => {
        event.preventDefault();
        props.onComplete({
           volume: strategyParametersForm.volume.value,
           priceIn: strategyParametersForm.priceIn.value,
           stopLoss: strategyParametersForm.stopLoss.value,
           target: strategyParametersForm.target.value
        });
        setStrategyParametersForm(baseState);
        props.goToStep(1);
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
                        touched={formElement.config.touched}
                        label={formElement.config.label} />
                ))
            }
            <Button btnType="Danger" onClick={previousPageHandler}>Previous</Button>
            <Button btnType="Success" disabled={!formIsValid} onClick={activateTradeHandler}>Activate</Button>

        </form>
    );

    return (
        <div>
            <h4>{props.type}</h4>
            {form}
        </div>
    );

}

export default StrategyParameters;