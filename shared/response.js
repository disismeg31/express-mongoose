const { response } = require("express")

class Response{
    payload = []
    success = false
    message =''

    setPAyload(payload){
        this.payload = payload
    }

    setSuccess(success){
        this.success = success
    }

    setMessage(message){
        this.message = message
    }
}

module.exports =response;