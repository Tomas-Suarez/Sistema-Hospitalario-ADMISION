const { INTERNAL_SERVER_ERROR } = require("../constants/ErrorConstants");

function errorHandler(err, req, res, next){
    console.error(err);

    let status = 500;
    let message = INTERNAL_SERVER_ERROR;

    if(err.name === "DuplicatedResourceException") {
        status = err.status;
        message = err.message;
    }

    else if(err.name === "ResourceNotFoundException") {
        status = err.status;
        message = err.message;
        
    }else if(err.name === "InactivePatienteException") {
        status = err.status;
        message = err.message;
    }
    
    else if(err.name === "CreatinFailedException") {
        status = err.status;
        message = err.message;
    }

    return res.status(status).render("error", {
        status,
        message,
    });
}

module.exports = errorHandler;