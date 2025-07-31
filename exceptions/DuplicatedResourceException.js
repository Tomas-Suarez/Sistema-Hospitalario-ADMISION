class DuplicatedResourceException extends Error{
    constructor(message){
        super(message);
        this.name = "DuplicatedResourceException";
        this.status = 409;
    }
}


module.exports = DuplicatedResourceException;