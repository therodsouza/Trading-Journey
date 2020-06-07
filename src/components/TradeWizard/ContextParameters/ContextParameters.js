import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import { checkValidity } from '../../../util/utility';

const ContextParameter = props => {

    const [formIsValid, setFormIsValid] = useState(false);

    const formBaseState = {
        ticker: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'WIN', displayValue: 'WIN' },
                    { value: 'WDO', displayValue: 'WDO' },
                ],
                placeholder: 'Ticker'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        timeframe: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'M1', displayValue: 'M1' },
                    { value: 'M10', displayValue: 'M10' },
                    { value: 'M60', displayValue: 'M60' }
                ],
                placeholder: 'Timeframe'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        riskReward: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '1R', displayValue: '1R' },
                    { value: '2R', displayValue: '2R' },
                    { value: '3R', displayValue: '3R' }
                ],
                placeholder: 'Risk Reward Ratio'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        pattern: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Breakout', displayValue: 'Breakout' },
                    { value: 'Reversal Bar', displayValue: 'Reversal Bar' },
                    { value: 'B180', displayValue: 'B180' },
                    { value: 'Inside Bar', displayValue: 'Inside Bar' },
                    { value: 'Inside Bar Coil', displayValue: 'Inside Bar Coil' },
                    { value: 'Fakey', displayValue: 'Fakey' },
                    { value: 'Pullback', displayValue: 'Pullback' }
                ],
                placeholder: 'Pattern'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        location: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Lower Band', displayValue: 'Lower Band' },
                    { value: 'Upper Band', displayValue: 'Upper Band' },
                    { value: 'Free Bar', displayValue: 'Free Bar' }
                ],
                placeholder: 'Location'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    };

    const [contextParametersForm, setContextParametersForm] = useState(formBaseState);

    const formElementsArray = [];
    for (let key in contextParametersForm) {
        formElementsArray.push({
            id: key,
            config: contextParametersForm[key]
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedContextParametersForm = {
            ...contextParametersForm
        }

        const updatedFormElement = {
            ...updatedContextParametersForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedContextParametersForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedContextParametersForm) {
            formIsValid = updatedContextParametersForm[inputIdentifier].valid && formIsValid;
        }

        setContextParametersForm(updatedContextParametersForm);
        setFormIsValid(formIsValid);
    }

    const nextPageHandler = (event) => {
        event.preventDefault();

        props.onComplete({
            ticker: contextParametersForm.ticker.value,
            timeframe: contextParametersForm.timeframe.value,
            riskReward: contextParametersForm.riskReward.value,
            pattern: contextParametersForm.pattern.value,
            location: contextParametersForm.location.value
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
                        touched={formElement.config.touched} 
                        label={formElement.config.label} />
                ))
            }

            <Button btnType="Success" disabled={!formIsValid} onClick={nextPageHandler}>Next</Button>

        </form>
    );

    return (
        <div>
            <h4>{props.type}</h4>
            {form}
        </div>
    );
}

export default ContextParameter;