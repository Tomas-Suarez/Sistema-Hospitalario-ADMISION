class InactivePatientException extends Error{
    constructor(message){
        super(message);
        this.name = "InactivePatientException";
        this.status = 409;
    }
}


module.exports = InactivePatientException;