

let encoderHandler = require("./encoderHandler")
let { config, name_config } = require("../config")

function serializer(receivedJson, API_NAME){
    try{
    
        // Convert JSON to js object
        let data =  receivedJson//JSON.parse(receivedJson);

        if(!config && !config.hasOwnProperty(API_NAME)){
            console.log( API_NAME + " is not set for encoding ")
            throw "error"
        }

        const API_NAME_2 = name_config[data['Header']['MsgId']]
        let bufferData = encoderHandler.serialEncoder(data, API_NAME_2);


        // let encoded_buffer_length = bufferData.length;
        // let required_buffer_length = config[API_NAME]["size"];
        // if(encoded_buffer_length !== required_buffer_length){
        //     throw "Message length miss matched" + API_NAME;
        // }
       
        return bufferData
    }catch(err){
        console.log("=== error while decoding buffer", err);
    }
}

module.exports = {
    serializer
}