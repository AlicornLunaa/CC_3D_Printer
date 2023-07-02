import TurtleManager from "./TurtleManager";
import BuildManager from "./BuildManager";
import Schematic from "./Schematic";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import cors from "cors";
import fs from "fs";

const expressServer = express();
const httpServer = http.createServer(expressServer);
const turtleManager = new TurtleManager(httpServer);

let buildManager: BuildManager|null = null;

// Init server
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(bodyParser.json());
expressServer.use(cors());

expressServer.use("/", express.static("front_end"));

expressServer.get("/turtle/:id/:command", async (req, res) => {
    let id = Number.parseInt(req.params.id);
    let command = req.params.command;
    let turtle = turtleManager.getTurtle(id);

    if(turtle === undefined){
        return;
    }

    switch(command){
        case "forward":
            res.end(JSON.stringify(await turtle.forward()));
            return;

        case "back":
            res.end(JSON.stringify(await turtle.back()));
            return;

        case "up":
            res.end(JSON.stringify(await turtle.up()));
            return;

        case "down":
            res.end(JSON.stringify(await turtle.down()));
            return;

        case "turnLeft":
            res.end(JSON.stringify(await turtle.turnLeft()));
            return;

        case "turnRight":
            res.end(JSON.stringify(await turtle.turnRight()));
            return;

        case "inspect":
            res.end(JSON.stringify(await turtle.inspect()));
            return;

        case "craft":
            res.end(JSON.stringify(await turtle.craft()));
            return;

        case "dig":
            res.end(JSON.stringify(await turtle.dig()));
            return;

        case "place":
            res.end(JSON.stringify(await turtle.place()));
            return;

        default:
            res.status(400).end();
            return;
    }
});

expressServer.get("/build/start/:name", async (req, res) => {
    let schematicName = req.params.name;

    if(buildManager !== null)
        buildManager.stop();

    try {
        let data = fs.readFileSync(`./assets/${schematicName}.schem`);
        let schem = await Schematic.parse(data);
        buildManager = new BuildManager(turtleManager, schem);
        buildManager.start();
        res.end(JSON.stringify(schem));
    } catch(err){
        console.error(err);
        res.end("false");
        return;
    }
});

expressServer.get("/build/stop", async (req, res) => {
    if(buildManager !== null)
        buildManager.stop();

    buildManager = null;
    res.end("true");
});

// Start listener
httpServer.listen(8080, () => {
    console.log("Listening on port 8080");
});