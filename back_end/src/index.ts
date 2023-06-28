import { WebSocketServer } from "ws";
import Schematic from "./Schematic";
import fs from "fs";
import Turtle from "./Turtle";

const wss = new WebSocketServer({ port: 8080 });
let turtles: Turtle[] = [];

wss.on("connection", async (socket) => {
    // Vars
    const turtleIndex = turtles.length;

    // Events
    socket.on("message", (data) => {});

    socket.on("close", () => {
        console.log("Dropped client");
        turtles.splice(turtleIndex, 1);
    });

    socket.on("error", (err) => {
        console.error(err);
    })

    // Initializer
    console.log("Found client");
    turtles.push(new Turtle(socket));
});

wss.on("listening", () => {
    // Ready-up
    console.log(`Websocket server listening`);
});

async function init(){
    let data = fs.readFileSync("./assets/test_schem.schem");
    let schem = await Schematic.parse(data);

    // console.log(schem.getBlock(5, 3, 7));
}

init();