
const encoding_type = "utf-8"

const { config } = require("../config")

function serialDecoder(data, API_NAME){
    
    try{

        if(!data){
            return "Didn't received the buffer to decode"
        }
        //Get config data for given struct
        let configData = config[API_NAME];

        let decodedJson = {};
        let readBuffer = data;
        for (const [key, property_config] of Object.entries(configData)) {

          let read_data, splitBuffer;

            if(key === "size") continue;
         
            //Check if property is another struct or not
            if(config && config.hasOwnProperty(property_config["type"])){
                let splitBuffer = readBuffer.slice(property_config["offset_start"], property_config["offset_start"] +property_config ["size"])
                let tempJson = serialDecoder(splitBuffer, property_config["type"])
                
                decodedJson[key] = tempJson;
                continue;
            }

            // Bit manipulation for bit field
            if(property_config["type"] === "bit_field"){
                
                read_data = readBuffer.readUInt8(property_config["offset_start"]);
               
                decodedJson[key] = {};
                for (const [sub_key, sub_value] of Object.entries(property_config["fields"])){

                    let decodeBit = (value, offset, size) => {
                        let mask = ((2 ** size) - 1) << offset;
                        return (value & mask) >> offset;
                    }
                    decodedJson[key][sub_key] = decodeBit(read_data, sub_value["offset"], sub_value["size"]);
                }
               
                continue;
            }
            let length;
         //console.log("kjfvioerjver ", property_config["type"], key)
            switch(property_config["type"].toLowerCase()){
                
                case "uint8":
                    read_data = readBuffer.readUInt8(property_config["offset_start"]);
                    break;
                
                case "uint16":
                case "int16":
                    read_data = readBuffer.readUInt16LE(property_config["offset_start"], property_config["size"]);
                    break;
                
                case "int32":
                case "uint32":
                    read_data = readBuffer.readUInt32LE(property_config["offset_start"]);
                    break;
                
                case "string":
                    splitBuffer = readBuffer.slice(property_config["offset_start"], property_config["offset_start"]+property_config ["size"] +1);
                    read_data = splitBuffer.toString();
                    const null_start = read_data.indexOf("\u0000");
                    read_data = read_data.slice(0, null_start);
                  //console.log("string", read_data);
                    break;

                case "array_uint8":
                    read_data = [];
                    length = property_config["size"];
                    splitBuffer = readBuffer.slice(property_config["offset_start"], property_config["offset_start"]+property_config ["size"] -1);
                    for(let i = 0; i < length; i++){
                        read_data.push(readBuffer.readUInt8(property_config["offset_start"] + i));
                    }
                    break;

                case "array_uint16":
                    read_data = [];
                    length = property_config["size"];
                    splitBuffer = readBuffer.slice(property_config["offset_start"], property_config["offset_start"]+property_config ["size"] -1);
                    // console.log("=== splitBuffer", splitBuffer)
                    for(let i = 0; i < length; i++){
                        read_data.push(readBuffer.readUInt16LE(property_config["offset_start"] + i * 2));
                    }

                    break;

                case "array_char":
                    
                    splitBuffer = readBuffer.slice(property_config["offset_start"], property_config["offset_start"]+property_config ["size"]);
                    console.log("=== kjjacius splitBuffer ", splitBuffer)
      
                    read_data = String.fromCodePoint(...splitBuffer).split("");
                    let slice_index = read_data.indexOf("\u0000");

                    read_data = slice_index > 0 ? read_data.slice(0, slice_index) : read_data;

                    break;
                
                default:
                  //console.log("==== 123")
                    break;
            }

            decodedJson[key] = read_data;
            
        }
        // console.log(decodedJson);
        return decodedJson
    }
    catch(err){
      //console.log("=== err", err);
    }
}

module.exports = {
    serialDecoder
}