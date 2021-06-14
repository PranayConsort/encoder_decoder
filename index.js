const fs = require('fs');

const { serializer } = require("./encoder/encoder");

const { deSerializer } = require("./decoder/decoder");

const net = require('net');

// const client = new net.Socket();

const address = {
    po : 42381,
    ip : "3232235786"
}
let TermGwApiMsg0111UlRegistrationRequest = {
    "Header": {
        "MsgLength" : 256,
        "MsgId"     : 273,      
        "MsgHandle" : 1
    },
    "InterfaceVersion" : 20210112,
    "Address": {
        "TypeOfAddress" : 0,
        "TetraSubscriberIdentity" :{
            "Ssi" : 1008,
            "Mnc" : 0,
            "Mcc" : 0
        }
    },
    "CallCount" : 15,
    "StreamCount" :  15,
    "ConnectionType" : 1,
    "TerminalType" : 5,
    "TerminalRoamingRef" : 0,
    "TerminalTypeDescription" : "Tg Handheld",
    "TerminalVersionDescription" : "1.0",
    "TerminalVersionDate" : 20210112,
    "bit_field1" : {
        "TerminalIsResponsibleForUAlert" : 0
    }
}



// const server = net.createServer((socket) => {
//     socket.end(`${new Date()}\n`);
//   });
  
//   server.listen(59090);


const client = net.createConnection({ port: 42381, host: "192.168.1.10" }, () =>{
        console.log("connectd to server");
        // client.on("data", data => {
        //     // received += data
        //     console.log(data);
        //     read_data.push(data);
        //     fs.appendFile('message.txt', data, function (err) {
        //         if (err) throw err;
        //         console.log('Saved!');
        //     });
        //     fs.appendFile('message.txt', "Data Append", function (err) {
        //         if (err) throw err;
        //         console.log('Append Saved!');
        //     });
    
        //     let deSerializeBufferData2 = deSerializer(data)
            
        //     // console.log("=== deSerializeBufferData", JSON.stringify(deSerializeBufferData))
        //     console.log("=== deSerializeBufferData", JSON.stringify(deSerializeBufferData2))
        // });

        // let serializeBufferData1 = serializer(TermGwApiMsg0111UlRegistrationRequest, "TermGwApiMsg0111UlRegistrationRequest")
        // console.log("=== ", serializeBufferData1)
        // client.write(serializeBufferData1);
    });
    client.on("read", (read) => {
        console.log("=== ", read)
    })
    client.on("error", data  =>{
        console.log("nckjdnc ", data)
    })
    setTimeout(()=>{
        let serializeBufferData = serializer(TermGwApiMsg0111UlRegistrationRequest, "TermGwApiMsg0111UlRegistrationRequest")
        console.log("=== ", serializeBufferData)
       fs.open("path.dat", 'w', function(err, fd) {
            if (err) {
                throw 'could not open file: ' + err;
            }

            // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
            fs.write(fd, serializeBufferData, 0, serializeBufferData.length, null,function(err) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, function() {
                    console.log('wrote the file successfully');
                });
            });
        });
        client.write(serializeBufferData);
    }, 2000)
    let read_data = [];

    client.on("data", (data) => {
        console.log("=== data received", data)
        fs.open("path12.dat", 'w', function(err, fd) {
            if (err) {
                throw 'could not open file: ' + err;
            }

            // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
            fs.write(fd, data, 0, data.length, null,function(err) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, function() {
                    console.log('wrote the file successfully');
                });
            });
        });
        let jsonP = deSerializer(data);
        console.log("nsdd ", jsonP)
    })
    client.on('end', () => {
        console.log('disconnected from server');
    });
    // client.on("data", data => {
    //     // received += data
    //     console.log(data);
    //     read_data.push(data);
    //     fs.appendFile('message.txt', data, function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });
    //     fs.appendFile('message.txt', "Data Append", function (err) {
    //         if (err) throw err;
    //         console.log('Append Saved!');
    //     });

    //     let deSerializeBufferData2 = deSerializer(data)

    //     // console.log("=== deSerializeBufferData", JSON.stringify(deSerializeBufferData))
    //     console.log("=== deSerializeBufferData", JSON.stringify(deSerializeBufferData2))
    // })
    // client.on('end', () => {
    //     console.log('disconnected from server');
    //   });
    // client.on("close", () => {
    //     console.log("connection closed")
    // })

   
    // // let serializeBufferData = serializer(TermGwApiMsg0112DlRegistrationConfirm, "TermGwApiMsg0112DlRegistrationConfirm")

    // // client.write(serializeBufferData);

    // let serializeBufferData1 = serializer(TermGwApiMsg0111UlRegistrationRequest, "TermGwApiMsg0111UlRegistrationRequest")
    // console.log("=== ", serializeBufferData1)
    // client.write(serializeBufferData1);
    // // let serializeBufferDataTest2 = serializer(TermGwApiAddress, "TermGwApiAddress")


// // console.log("dytyt ", serializeBufferData)
// console.log("cklhwiufchiwuefiuewf ",serializeBufferData1)
// fs.appendFile('write.txt', serializeBufferData1, function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });
// //Writing data to file
//  path = "12.dat";

// fs.open(path, 'w', function(err, fd) {
//     if (err) {
//         throw 'could not open file: ' + err;
//     }

//     // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
//     fs.write(fd, serializeBufferData, 0, serializeBufferData.length, null,function(err) {
//         if (err) throw 'error writing file: ' + err;
//         fs.close(fd, function() {
//             console.log('wrote the file successfully');
//         });
//     });
// });
// let data
// try {
//     data = fs.readFileSync("test.dat")
//     console.log(data)
//   } catch (err) {
//     console.error(err)
// //   }

// console.log("==== Reader ",data);
// let deSerializeBufferData = deSerializer(serializeBufferData, "TermGwApiMsg0112DlRegistrationConfirm")
// TermGwApiMsg0111UlRegistrationRequest

// let deSerializeBufferData2 = deSerializer(serializeBufferData1, "TermGwApiMsg0111UlRegistrationRequest")

// // console.log("=== deSerializeBufferData", JSON.stringify(deSerializeBufferData))
// console.log("=== deSerializeBufferData", JSON.stringify(deSerializeBufferData2))
