const { response } = require("express");
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const { stringify } = require ("querystring");

const app = express();
const port = 9000;
const fFolder = path.join(`${__dirname}/../frontend`);


/* APP USE */

app.use(express.json());

app.use('/pub', express.static(`${fFolder}/public`));

/* END OF APP USE */

/* APP GET */

app.get("/", (request, response, next)=>{
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});


app.get("/admin/order-view", (request, response, next)=>{
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});


app.get("/kismacska", (request, response, next)=>{
    response.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
});


app.get("/something", (request, response, next)=>{
    console.log("Request received for something endpoint.")
    response.send("Thank you for Your request! This is our response for something endpoint.")
});


app.get("/api/v1/users", (request, response, next)=>{
    console.log("Request received for users endpoint")
    response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
});
    

app.get("/api/v1/users-query", (request, response, next)=>{
    console.dir(request.query)
    console.dir(request.query.apiKey)
    response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
    if (request.query.apiKey === "apple"){
        response.sendFile(path.join(`${__dirname}/../frontend/users.json`))
    } else {
        response.send("Unauthorized request");
    }
});
/* 
app.get("/api/v1/users-params/:key", (request, response, next)=>{
    console.dir(request.params)
    console.log(request.params.key)
    if(request.params.key === "apple"){
        response.send("Azt írtad be, hogy alma.")
    } else{
        response.send("Nem azt írtad be, hogy alma.")
    }
    response.send("Hello");
});


app.get("/api/v1/users/active", (request, response, next)=>{
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            response.send("Error just happened")
        } else {
            const users = JSON.parse(data);
            // const activeUsers = users.filter(user => user.status === "active");
            response.send(users.filter(user => user.status === "active"));
        }
    })
});


app.get("/api/v1/users/passive", (request, response, next)=>{
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            response.send("Error just happened")
        } else {
            const users = JSON.parse(data);
            // const activeUsers = users.filter(user => user.status === "passive");
            response.send(users.filter(user => user.status === "passive"));
        }
    })

});
*/


app.get("/api/v1/users-params/:key", (request, response, next)=>{
    fs.readFile("../frontend/users.json", (error, data) => {
        console.dir(request.params)
        console.log(request.params.key)
        const users = JSON.parse(data);
        if (request.params.key === "active") {
            response.send(users.filter(user => user.status === "active"));
        } 
        if (request.params.key === "passive") {
            response.send(users.filter(user => user.status === "passive"));
        }
    })

});

/* END OF APP GET */

app.post("/users/new", (request, response) => {
    fs.readFile(`${fFolder}/users.json`, (error, data) => {
        if (error){
            console.log("Error")
            response.send("There is an error reading users file.")
        } else {
            const users = JSON.parse(data);
            console.log(request.body);
            users.push(request.body);

            fs.writeFile(`${fFolder}/users.json`, JSON.stringify(users), error => {
                if (error){
                    console.log("Error");
                    response.send("Error writing users file");
                }
            })
            response.send(request.body);
        }
    })
})


app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`)
});