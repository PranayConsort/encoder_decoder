// Type supported

// uint8, uint16LE, uint32LE, string, char_array


let config = {

   "TermGwApiMsgHeader" : {
       "size" : 8,
       //  00..01 :  Length in Byte, including this header (of 8 Byte)
        "MsgLength" : {               
           "offset_start" : 0,
           "size" : 2,
           "type" : "UInt16"
       },
       //  02..03 :  Type as TermGwApiMessageIdEnum
       "MsgId" : {
           "offset_start" : 2,
           "size" : 2,
           "type" : "UInt16"
       },                         
       "MsgHandle" : {
           "offset_start" : 4,
           "size" : 4,
           "type" : "UInt32"
       }
   },

   "TetraSubscriberIdentity" : {
        "size" : 8,
        "Ssi" : {               
            "offset_start" : 0,
            "size" : 4,
            "type" : "UInt32"
        },
        "Mnc" : {
            "offset_start" : 4,
            "size" : 2,
            "type" : "UInt16"
        },                         
        "Mcc" : {
            "offset_start" : 6,
            "size" : 4,
            "type" : "UInt16"
        }
    },
    "UserNumber" : {
        "size" : 28,
        "NumberOfDigits" : {               
            "offset_start" : 0,
            "size" : 1,
            "type" : "UInt8"
        },                      
        "Digit" : {
            "offset_start" : 4,
            "size" : 24,
            "type" : "String"
        }
    },
   "TermGwApiAddress" : {
       "size" : 40,
        "TypeOfAddress" :{               
            "offset_start" : 0,
            "size" : 1,
            "type" : "UInt8"
        },
        "TetraSubscriberIdentity" : {               
            "offset_start" : 4,
            "size" : 8,
            "type" : "TetraSubscriberIdentity"
        },
        "UserNumber" : {               
            "offset_start" : 12,
            "size" : 28,
            "type" : "UserNumber"
        }
    },
   "TermGwApiMsg0001DlGeneralConfirm" : {
       "size" : 20,
        "Header" : {               
            "offset_start" : 0,
            "size" : 8,
            "type" : "TermGwApiMsgHeader"
        },
        "ReturnCode" : {               
            "offset_start" : 8, 
            "size" : 4,
            "type" : "Int32"
        },
        "Spare12" : {               
            "offset_start" : 12,
            "size" : 8,
            "type" : "String",
            "isArray" : true
        }
    },
    "TermGwApiMsg0111UlRegistrationRequest" : {
        "size" : 256,
         "Header" : {               
             "offset_start" : 0,
             "size" : 8,
             "type" : "TermGwApiMsgHeader"
         },
         "InterfaceVersion" : {               
             "offset_start" : 8, 
             "size" : 4,
             "type" : "UInt32"
         },
         "Address" : {               
             "offset_start" : 12,
             "size" : 40,
             "type" : "TermGwApiAddress"
         },
         "CallCount" : {               
             "offset_start" : 52,
             "size" : 1,
             "type" : "UInt8"
         },
         "StreamCount" : {               
            "offset_start" : 53,
            "size" : 1,
            "type" : "UInt8"
        },
        "ConnectionType" : {               
            "offset_start" : 54,
            "size" : 1,
            "type" : "UInt8"
        },
        "TerminalType" : {               
            "offset_start" : 55,
            "size" : 1,
            "type" : "UInt8"
        },
        "TerminalRoamingRef" : {               
            "offset_start" : 56,
            "size" : 4,
            "type" : "UInt32"
        },
        "TerminalTypeDescription" : {               
            "offset_start" : 60,
            "size" : 16,
            "type" : "string"
        },
        "TerminalVersionDescription" : {               
            "offset_start" : 76,
            "size" : 16,
            "type" : "string"
        },
        // "RandomChallenge2" : {               
        //     "offset_start" : 92,
        //     "size" : 10,
        //     "type" : "array_uint8"
        // },
        "TerminalVersionDate" : {               
            "offset_start" : 104, 
            "size" : 4,
            "type" : "UInt32"
        },
        "bit_field1": {
            "offset_start" : 102,
            "size" : 1,
            "type" : "bit_field",
            "fields" :{
                "TerminalIsResponsibleForUAlert" : {
                    "offset" : 0,
                    "size" : 1
                }
            }
        }
    },
    "TermGwApiMsg0112DlRegistrationConfirm" : {
        "size" : 256,
        "Header" : {               
            "offset_start" : 0,
            "size" : 8,
            "type" : "TermGwApiMsgHeader"
        },
        "ConnectionState" : {               
            "offset_start" : 8, 
            "size" : 4,
            "type" : "Int32"
        },
        "ActiveVersionNumber" : {               
            "offset_start" : 12, 
            "size" : 4,
            "type" : "Int32"
        },
        "UserTsi" : {               
            "offset_start" : 16,
            "size" : 40,
            "type" : "TermGwApiAddress"
        },
        "UserNumber" : {               
            "offset_start" : 56, 
            "size" : 4,
            "type" : "UInt32"
        },
        "UserShortNumber" : {               
            "offset_start" : 60, 
            "size" : 4,
            "type" : "UInt32"
        },
        "CallCount" : {               
            "offset_start" : 68,
            "size" : 1,
            "type" : "UInt8"
        },
        "StreamCount" : {               
           "offset_start" : 69,
           "size" : 1,
           "type" : "UInt8"
       },
       "MaximumVersionNumber" : {               
            "offset_start" : 72, 
            "size" : 4,
            "type" : "UInt32"
        },
        "TerminalRoamingRef" : {               
            "offset_start" : 76, 
            "size" : 4,
            "type" : "UInt32"
        },
        "TerminalDescription" : {               
            "offset_start" : 80,
            "size" : 64,
            "type" : "string"
        },
        "StreamUdpPort" : {               
            "offset_start" : 144,
            "size" : 32,
            "type" : "array_uint16"
        },
       
        "bit_field1": {
            "offset_start" : 102,
            "size" : 1,
            "type" : "bit_field",
            "fields" :{
                "TerminalIsResponsibleForUAlert" : {
                    "offset" : 0,
                    "size" : 1
                }
            }
        }  
    },

    "TermGwApiMsg0211DlAuthenticationChallenge":{
        "size" : 128,
        "Header" : {               
            "offset_start" : 0,
            "size" : 8,
            "type" : "TermGwApiMsgHeader"
        },
        "RandomSeed" : {               
            "offset_start" : 8, 
            "size" : 10,
            "type" : "array_uint8"
        },
        "RandomChallenge1" : {               
            "offset_start" : 20, 
            "size" : 10,
            "type" : "array_uint8"
        },
        "bit_field1": {
            "offset_start" : 30,
            "size" : 1,
            "type" : "bit_field",
            "fields" :{
                "UsePinCode" : {
                    "offset" : 0,
                    "size" : 1
                },
                "UseSecretKey" : {
                    "offset" : 1,
                    "size" : 1
                }

            }
        },
        "Response2" : {               
            "offset_start" : 32,
            "size" : 4,
            "type" : "array_uint8"
        }
    },

    "TermGwApiMsg0611DlKeepAliveChallenge" : {
        "size" : 64,
        "Header" : {               
            "offset_start" : 0,
            "size" : 8,
            "type" : "TermGwApiMsgHeader"
        },
        "TimeToNextKeepAlive" : {               
            "offset_start" : 8, 
            "size" : 2,
            "type" : "UInt16"
        },
        "TimeToDeregistration" : {               
            "offset_start" : 10, 
            "size" : 2,
            "type" : "UInt16"
        },
        "SoftwareVersionDate" : {               
            "offset_start" : 12, 
            "size" : 4,
            "type" : "UInt32"
        },
    },

    "TermGwApiMsg0612UlKeepAliveResponse" : {
        "size" : 64,
        "Header" : {               
            "offset_start" : 0,
            "size" : 8,
            "type" : "TermGwApiMsgHeader"
        },
        "Latitude" : {               
            "offset_start" : 16, 
            "size" : 4,
            "type" : "uint32"
        },
        "Longitude" : {               
            "offset_start" : 20, 
            "size" : 4,
            "type" : "uint32"
        },
        "HorizontalVelocity" : {               
            "offset_start" : 24, 
            "size" : 2,
            "type" : "uint16"
        },
        "HorizontalDirection" : {               
            "offset_start" : 26, 
            "size" : 2,
            "type" : "uint32"
        },
        "DateTimeOfLastFix" : {               
            "offset_start" : 28, 
            "size" : 4,
            "type" : "uint32"
        },
        "HorizontalPositionAccuracy" : {               
            "offset_start" : 32, 
            "size" : 4,
            "type" : "uint32"
        },
    }

}

let name_config = {
    1   : "TermGwApiMsg0001DlGeneralConfirm",
    273 : "TermGwApiMsg0111UlRegistrationRequest",
    274 : "TermGwApiMsg0112DlRegistrationConfirm",
    
    529 : "TermGwApiMsg0211DlAuthenticationChallenge",

    1553 : "TermGwApiMsg0611DlKeepAliveChallenge",
    1554 : "TermGwApiMsg0612UlKeepAliveResponse"
}

module.exports = {
    config,
    name_config
}

// TermGwApiMsg0001DlGeneralConfirm