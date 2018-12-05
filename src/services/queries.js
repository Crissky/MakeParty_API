'use strict'

function repositories(){

}

repositories.prototype.getQueryLimitAndSkip = (query) => {
    console.log("Validators-repositories: getQueryLimitAndSkip");
    
    var options = {};

    if (query.limit && isFinite(query.limit)) {
        options.limit = parseInt(query.limit);
    }

    if (query.page > 0 && isFinite(query.page) && isFinite(query.limit)) {
        options.skip = query.limit * (query.page - 1);
    }

    return options;
}

repositories.prototype.getPriceArgs = (arrayPrice) => {
    console.log("Validators-repositories: getPriceArgs");
    console.log("arrayPrice: ", arrayPrice);
    
    var priceArgs = { $gte: arrayPrice[0], $lte: arrayPrice[1] };

    if (!arrayPrice[1]) {
        priceArgs = { $gte: arrayPrice[0] };
    }
    
    return priceArgs;
}

module.exports = repositories;