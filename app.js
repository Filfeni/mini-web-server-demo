const express = require('express');
const bp = require("body-parser");
const { text } = require('express');
const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
let nextId =  3;
var messageList = [
    {
        msgId : 1,
        text : "Hola"
    },
    {
        msgId : 2,
        text : "Mundo"
    }
]

//Routes

app.get("/messages", (req, res)=>{
    res.json(messageList);
})

app.post("/messages", (req, res) => {
    let text = req.body.text;
    console.log(req.body);
    messageList.push({
        msgId: nextId,
        text: text
    });
    nextId++;
    res.json(messageList);
})

app.put("/messages/:msgId", (req, res) => {
    if (req.body.msgId == req.params.msgId) {
        let text = req.body.text;
        let id = req.params.msgId;
        let msgIndex = messageList.findIndex( x => x.msgId == id);
        console.log(msgIndex, id);
        messageList[msgIndex].text = text;
        res.json({});
    }
    
})

app.delete("/messages/:msgId", (req, res) => {
    let id = req.params.msgId;
    let newlist = messageList.filter( x => x.msgId != id);
    messageList = newlist;
    res.json({});
})

app.listen(8080, ()=>{
    console.log("Server's up")
})