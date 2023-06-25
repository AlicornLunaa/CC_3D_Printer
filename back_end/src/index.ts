import { WebSocketServer } from "ws";
import Schematic from "./Schematic";
import fs from "fs";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
    socket.on("message", (data) => {
        console.log(data.toString());
    });

    socket.on("close", () => {
        console.log("Dropped client");
    });

    socket.on("error", (err) => {
        console.error(err);
    })

    console.log("Found client");
});

wss.on("listening", () => {
    console.log(`Websocket server listening`);
});

async function init(){
    let data = fs.readFileSync("./assets/test_schem.schem");
    let schem = await Schematic.parse(data);

    // console.log(schem.getBlock(5, 3, 7));
}

init();