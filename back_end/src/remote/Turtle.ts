import { WebSocket } from "ws";

type Side = "top"|"bottom"|"right"|"left"|"front"|"back";
type InventoryCommands = "size"|"list"|"getItemDetail"|"getItemLimit"|"pushItems"|"pullItems";

type BlockData = {
    name: string;
    state: any;
    tags: any;
}

type ItemDetails = {
    name: string;
    count: number;
}

class Turtle {
    // Variables
    private socket: WebSocket;

    // Private functions
    private async send<Type>(msg: string): Promise<Type> {
        return new Promise((resolve, reject) => {
            this.socket.send(msg, (err) => {
                if(err !== undefined){
                    reject(err);
                    return;
                }

                this.socket.once("message", (msg: string) => {
                    resolve(JSON.parse(msg) as Type);
                });
            });
        });
    }

    // Functions
    constructor(socket: WebSocket){
        this.socket = socket;
    }

    public async craft(limit?: number) {
        if(limit === undefined)
            limit = 64;

        return this.send<boolean>(`turtle.craft ${limit}`);
    }

    public async forward(){ return this.send<boolean>("turtle.forward"); }
    public async back(){ return this.send<boolean>("turtle.back"); }
    public async up(){ return this.send<boolean>("turtle.up"); }
    public async down(){ return this.send<boolean>("turtle.down"); }
    public async turnLeft(){ return this.send<boolean>("turtle.turnLeft"); }
    public async turnRight(){ return this.send<boolean>("turtle.turnRight"); }

    public async dig(side?: "left"|"right"){ return this.send<boolean>((side !== undefined) ? `turtle.dig ${side}` : `turtle.dig`); }
    public async digUp(side?: "left"|"right"){ return this.send<boolean>((side !== undefined) ? `turtle.digUp ${side}` : `turtle.digUp`); }
    public async digDown(side?: "left"|"right"){ return this.send<boolean>((side !== undefined) ? `turtle.digDown ${side}` : `turtle.digDown`); }

    public async place(text?: string){ return this.send<boolean>((text !== undefined) ? `turtle.place ${text}` : `turtle.place`); }
    public async placeUp(text?: string){ return this.send<boolean>((text !== undefined) ? `turtle.placeUp ${text}` : `turtle.placeUp`); }
    public async placeDown(text?: string){ return this.send<boolean>((text !== undefined) ? `turtle.placeDown ${text}` : `turtle.placeDown`); }

    public async drop(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.drop ${count}` : `turtle.drop 64`); }
    public async dropUp(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.dropUp ${count}` : `turtle.dropUp 64`); }
    public async dropDown(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.dropDown ${count}` : `turtle.dropDown 64`); }

    public async select(slot: number){ return this.send<boolean>(`turtle.select ${slot}`); }
    public async getItemCount(slot?: number){ return this.send<number>((slot !== undefined) ? `turtle.getItemCount ${slot}` : `turtle.getItemCount`); }
    public async getItemSpace(slot?: number){ return this.send<number>((slot !== undefined) ? `turtle.getItemSpace ${slot}` : `turtle.getItemSpace`); }

    public async detect(){ return this.send<boolean>("turtle.detect"); }
    public async detectUp(){ return this.send<boolean>("turtle.detectUp"); }
    public async detectDown(){ return this.send<boolean>("turtle.detectDown"); }

    public async compare(){ return this.send<boolean>("turtle.compare"); }
    public async compareUp(){ return this.send<boolean>("turtle.compareUp"); }
    public async compareDown(){ return this.send<boolean>("turtle.compareDown"); }

    public async attack(side?: "left"|"right"){ return this.send<boolean>((side !== undefined) ? `turtle.attack ${side}` : `turtle.attack`); }
    public async attackUp(side?: "left"|"right"){ return this.send<boolean>((side !== undefined) ? `turtle.attackUp ${side}` : `turtle.attackUp`); }
    public async attackDown(side?: "left"|"right"){ return this.send<boolean>((side !== undefined) ? `turtle.attackDown ${side}` : `turtle.attackDown`); }

    public async suck(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.suck ${count}` : `turtle.suck 64`); }
    public async suckUp(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.suckUp ${count}` : `turtle.suckUp 64`); }
    public async suckDown(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.suckDown ${count}` : `turtle.suckDown 64`); }

    public async getFuelLevel(){ return this.send<number>("turtle.getFuelLevel"); }
    public async refuel(count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.refuel ${count}` : `turtle.refuel 64`); }

    public async compareTo(slot: number){ return this.send<boolean>(`turtle.compareTo ${slot}`); }
    public async transferTo(slot: number, count?: number){ return this.send<boolean>((count !== undefined) ? `turtle.transferTo ${slot} ${count}` : `turtle.transferTo ${slot} 64`); }
    public async getSelectedSlot(){ return this.send<number>("turtle.getSelectedSlot"); }

    public async getFuelLimit(){ return this.send<number>("turtle.getFuelLimit"); }

    public async equipLeft(){ return this.send<boolean>("turtle.equipLeft"); }
    public async equipRight(){ return this.send<boolean>("turtle.equipRight"); }

    public async inspect(){ return this.send<BlockData>("turtle.inspect"); }
    public async inspectUp(){ return this.send<BlockData>("turtle.inspectUp"); }
    public async inspectDown(){ return this.send<BlockData>("turtle.inspectDown"); }

    public async getItemDetail(slot?: number, detailed?: boolean){
        if(detailed === undefined)
            detailed = false;

        return this.send<ItemDetails|false>((slot !== undefined) ? `turtle.getItemDetail ${slot} ${detailed}` : `turtle.getItemDetail`);
    }

    public async sleep(ms: number){
        return this.send<void>(`turtle.sleep ${ms / 1000}`);
    }

    public async callInventory(side: Side, cmd: InventoryCommands, ...args: any){
        switch(cmd){
            case "size":
                return this.send<number>(`peripheral.call ${side} ${cmd}`);

            case "list":
                return this.send<ItemDetails[]>(`peripheral.call ${side} ${cmd}`);

            case "getItemDetail":
                return this.send<ItemDetails>(`peripheral.call ${side} ${cmd} ${args[0]}`);

            case "getItemLimit":
                return this.send<number>(`peripheral.call ${side} ${cmd} ${args[0]}`);

            case "pushItems":
                return this.send<number>(`peripheral.call ${side} ${cmd} ${args[0]} ${args[1]} ${args[2]} ${args[3]}`);

            case "pullItems":
                return this.send<number>(`peripheral.call ${side} ${cmd} ${args[0]} ${args[1]} ${args[2]} ${args[3]}`);
        }
    }

}

export type { ItemDetails, BlockData };
export { Turtle };