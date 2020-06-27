export const getTickValue = ticker => {
    return .2;// FIXME based on asset class
}

export const calculateScore = trade => {
    let score = 0;

    if (trade.side === 'Long') {
        score = + (trade.priceOut - trade.priceIn) * trade.volume;
    } else {
        score = - (trade.priceOut - trade.priceIn) * trade.volume;
    }

    return score;
}

export const calculateProfit = trade => {
    return calculateScore(trade) * getTickValue(trade.ticker);
}

export const calculateOutcome = trade => {
    if (trade.side === 'Long') {
        if (trade.priceOut >= trade.target) {
            return 'FG'
        } else if (trade.priceOut <= trade.stopLoss) {
            return 'FS'
        }
    } else {
        if (trade.priceOut <= trade.target) {
            return 'FG'
        } else if (trade.priceOut >= trade.stopLoss) {
            return 'FS'
        }
    }

    return 'P'
    
}