import TurtleManager from "./TurtleManager";
import Schematic from "./Schematic";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import fs from "fs";

const expressServer = express();
const httpServer = http.createServer(expressServer);
const turtleManager = new TurtleManager(httpServer);

// Init server
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(bodyParser.json());

expressServer.use("/", express.static("front_end"));

expressServer.get("/turtle/:id/:command", async (req, res) => {
    let id = Number.parseInt(req.params.id);
    let command = req.params.command;
    let turtle = turtleManager.getTurtle(id);

    if(turtle === undefined){
        return;
    }

    let evaluateBool = (v: boolean) => {
        if(v)
            return "true";

        return "false";
    }

    switch(command){
        case "forward":
            res.end(evaluateBool(await turtle.forward()));
            return;

        case "back":
            res.end(evaluateBool(await turtle.back()));
            return;

        case "up":
            res.end(evaluateBool(await turtle.up()));
            return;

        case "down":
            res.end(evaluateBool(await turtle.down()));
            return;

        case "turnLeft":
            res.end(evaluateBool(await turtle.turnLeft()));
            return;

        case "turnRight":
            res.end(evaluateBool(await turtle.turnRight()));
            return;

        default:
            res.status(400).end();
            return;
    }
});

httpServer.listen(8080, () => {
    console.log("Listening on port 8080");
});

// Functions
async function initSchematic(){
    let data = fs.readFileSync("./assets/test_schem.schem");
    let schem = await Schematic.parse(data);
    // console.log(schem.getBlock(5, 3, 7));
}
initSchematic();