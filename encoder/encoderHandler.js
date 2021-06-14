const encoding_type = "utf-8"
const { config } = require("../config")

const BIT_MAX = 8;

function serialEncoder(data, API_NAME){
    
    let configData = config[API_NAME];
    
    let buffer = Buffer.alloc(configData["size"]).fill(0)

    for (const [key, value] of Object.entries(data)) {
        if(!configData.hasOwnProperty(key)){
            continue;
        }
        let property_config = configData[key];
        let write_data = value;

        if(typeof write_data === 'object' && write_data !== null){
            if( config && config.hasOwnProperty(property_config["type"])){
                let temp_buffer = serialEncoder(write_data, property_config["type"]);
                temp_buffer.copy(buffer, property_config["offset_start"])
                continue;
            }
        }
       
        switch(property_config["type"].toLowerCase()){
            case "uint8":
                buffer.writeUInt8(write_data, property_config["offset_start"], property_config["size"])
                break;
             
            case "uint16":
                buffer.writeUInt16LE(write_data, property_config["offset_start"], property_config["size"])
                break;

            case "int32":
            case "uint32":
                buffer.writeUInt32LE(write_data, property_config["offset_start"], property_config["size"])
                break;

            case "string":
                let bufferFromString = Buffer.from(write_data);
                ////console.log(" ---------- *(&*(&*( bufferFromString", bufferFromString)
                bufferFromString.copy(buffer, property_config["offset_start"]);
                break;

            case "array_uint8":
                let buf1 = Buffer.alloc(property_config["size"])
                for(let i = 0; i < write_data.length; i++){
                    buf1.writeUInt8(write_data[i], i )
                }
                buf1.copy(buffer, property_config["offset_start"])
                break;
            
            case "array_uint16":
                let buf = Buffer.alloc(property_config["size"]*2)
                for(let i = 0; i < write_data.length; i++){
                    buf.writeUInt16LE(write_data[i], i * 2)
                }
                buf.copy(buffer, property_config["offset_start"])
                break;

            case "array_string":
                let write_data_array = [];
                for(let i = 0; i < write_data.length; i++){
                    write_data_array.push(write_data[i].charAt(0).charCodeAt(0))
                }
                let array_buffer = Buffer.from(write_data_array, encoding_type);                
                array_buffer.copy(buffer, property_config["offset_start"]);
                break;
            
            case "bit_field":
                let write_bit_data = new Array(BIT_MAX).fill("0");
                for (const [key2, value] of Object.entries(property_config["fields"])){
                    
                    let data_to_write = write_data[key2];

                    if(data_to_write > 2 ** value["size"]){
                        break;
                    }

                    // check if bit size is equal to 1 then the given data value for field should be either 0 or 1
                    if(value["size"] == 1 ){
                        write_bit_data[value["offset"]] = data_to_write.toString();
                    }
                    else{
                       let temp_array = data_to_write.toString(2).split("").reverse();
                       for(let i = 0; i < temp_array.length; i++){
                           write_bit_data[value["offset"] + i] = temp_array[i]
                       }
                    }
                }

                write_bit_data = write_bit_data.reverse().join("");

                buffer.writeUInt8(parseInt(write_bit_data, 2), property_config["offset_start"], property_config["size"]);
                break;

            default:
                ////console.log("==== ")
                break;
        }

    }
    return buffer;
}


module.exports = {
    encodeTermGwApiMsgHeader,
    serialEncoder
}