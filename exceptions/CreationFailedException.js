class CreationFailedException extends Error{
    constructor(message){
        super(message);
        this.name = "CreationFailedException";
        this.status = 400;
    }
}


module.exports = CreationFailedException;