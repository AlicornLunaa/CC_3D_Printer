class Chest {
    // Variables
    private x: number;
    private y: number;
    private z: number;
    private itemType: string;

    // Functions
    constructor(x: number, y: number, z: number, itemType: string){
        this.x = x;
        this.y = y;
        this.z = z;
        this.itemType = itemType;
    }

    async parse(data: Buffer){

    }
};

export default Chest;