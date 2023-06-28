import { WebSocket } from "ws";

class Turtle {
    // Variables
    private socket: WebSocket;

    // Private functions
    private async sendBoolean(msg: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.socket.send(msg, (err) => {
                if(err !== undefined){
                    resolve(false);
                    return;
                }

                this.socket.once("message", (msg: string) => {
                    resolve(msg == "true");
                });
            });
        });
    }

    // Functions
    constructor(socket: WebSocket){
        this.socket = socket;
    }

    public async forward(){ return this.sendBoolean("turtle.forward"); }
    public async back(){ return this.sendBoolean("turtle.back"); }
    public async up(){ return this.sendBoolean("turtle.up"); }
    public async down(){ return this.sendBoolean("turtle.down"); }
    public async turnLeft(){ return this.sendBoolean("turtle.turnLeft"); }
    public async turnRight(){ return this.sendBoolean("turtle.turnRight"); }

}

export default Turtle;