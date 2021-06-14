
const { config, name_config } = require("../config");

let decoderHandler = require("./decoderHandler")

function deSerializer(bufferStream, API_NAME){

    try{
        //Buffer length test

        let buffer_msg_length = bufferStream.readUInt16LE(0);
        console.log("==== ", buffer_msg_length);
        bufferStream = bufferStream.slice(0, buffer_msg_length);
       
        
        const API_NAME1 = name_config[bufferStream.readUInt16LE(2)];

    
        console.log("==== ", API_NAME1,bufferStream.readUInt16LE(2) );

        if(!config && !config.hasOwnProperty(API_NAME)){
           
            throw API_NAME + " is not set for encoding ";
        }

        let bufferData = decoderHandler.serialDecoder(bufferStream, API_NAME1);

        return bufferData
    }catch(err){
        console.log("=== error while decoding buffer", err)
    }
}

module.exports = {
    deSerializer
}