export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.gte) {
        isValid = value >= rules.gte && isValid;
    }

    return isValid;

}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const tradeComparator = (trade, other) => {
    if (trade.startDateTime < other.startDateTime)
        return -1;
    
    if (trade.startDateTime > other.startDateTime)
        return 1;
    
    return 0;
}

export const sessionComparator = (session, other) => {
    if (session.startDateTime < other.startDateTime)
        return -1;
    
    if (session.startDateTime > other.startDateTime)
        return 1;
    
    return 0;
}