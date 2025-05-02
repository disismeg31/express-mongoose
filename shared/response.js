class Response{
    payload = []
    success = false
    message =''

    setPayload(payload){
        this.payload = payload
    }

    setSuccess(success){
        this.success = success
    }

    setMessage(message){
        this.message = message
    }
}

module.exports = Response;