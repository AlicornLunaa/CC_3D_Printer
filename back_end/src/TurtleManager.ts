import { WebSocketServer } from "ws";
import { Server } from "http";
import Turtle from "./remote/Turtle";
import BuilderTurtle from "./BuilderTurtle";

class TurtleManager {
    // Variables
    private socketServer: WebSocketServer;
    private turtles: BuilderTurtle[];

    // Functions
    constructor(server: Server){
        // Init variables
        this.socketServer = new WebSocketServer({ server: server });
        this.turtles = [];

        // Connection handler
        this.socketServer.on("connection", async (socket) => {
            // Vars
            const turtleIndex = this.turtles.length;
        
            // Events
            socket.on("message", (data) => {});
        
            socket.on("close", () => {
                console.log("Dropped client");
                this.turtles.splice(turtleIndex, 1);
            });
        
            socket.on("error", (err) => {
                console.error(err);
            })
        
            // Initializer
            console.log("Found client");
            this.turtles.push(new BuilderTurtle(socket));
        });
    }

    public getTurtleCount(): number {
        return this.turtles.length;
    }

    public getTurtle(index: number): BuilderTurtle {
        return this.turtles[index];
    }

    public forEach(callback: (index: number, turtle: BuilderTurtle) => void){
        for(let i = 0; i < this.getTurtleCount(); i++){
            callback(i, this.getTurtle(i));
        }
    }
}

export default TurtleManager;