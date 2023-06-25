import { Block } from "prismarine-block";
import nbt from "prismarine-nbt";

interface ISchematic {
    PaletteMax: number;
    Palette: { [key: string]: number };
    Version: number;
    Length: number;
    Height: number;
    Width: number;
    Metadata: {
        WEOffsetX: number;
        WEOffsetY: number;
        WEOffsetZ: number;
    },
    DataVersion: number;
    BlockData: number[];
    BlockEntities: Block[];
    Offset: number[];
}

class Schematic implements ISchematic {
    PaletteMax: number = 0;
    Palette: { [key: string]: number; } = {};
    Version: number = 2;
    Length: number = 0;
    Height: number = 0;
    Width: number = 0;
    Metadata: { WEOffsetX: number; WEOffsetY: number; WEOffsetZ: number; } = { WEOffsetX: 0, WEOffsetY: 0, WEOffsetZ: 0 };
    DataVersion: number = 0;
    BlockData: number[] = [];
    BlockEntities: Block[] = [];
    Offset: number[] = [];

    static async parse(data: Buffer){
        let schemData: ISchematic = nbt.simplify((await nbt.parse(data, "big")).parsed);
        let schem = new Schematic();

        schem.PaletteMax = schemData.PaletteMax;
        schem.Palette = schemData.Palette;
        schem.Version = schemData.Version;
        schem.Length = schemData.Length;
        schem.Height = schemData.Height;
        schem.Width = schemData.Width;
        schem.Metadata = schemData.Metadata;
        schem.DataVersion = schemData.DataVersion;
        schem.BlockData = schemData.BlockData;
        schem.BlockEntities = schemData.BlockEntities;
        schem.Offset = schemData.Offset;

        return schem;
    }

    getBlock(x: number, y: number, z: number): string | null {
        let index = (y * this.Length + z) * this.Width + x;
        let id = this.BlockData[index];
        let blockID: string | null = null;

        let count = 0;
        for(let key in this.Palette){
            if(count == id){
                blockID = key;
            }

            count++;
        }

        return blockID;
    }

    getWidth(){ return this.Width; }
    getLength(){ return this.Length; }
    getHeight(){ return this.Height; }
}

export default Schematic;