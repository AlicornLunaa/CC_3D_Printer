import { Block } from "prismarine-block";
import Localization from "../assets/en_us.json";
import "./SchematicComponent.css";

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

interface ScheamticProps {
    schematic: ISchematic;
}

interface ILocalization {
    [key: string]: string;
}

function SchematicComponent({ schematic }: ScheamticProps){
    const getBlockName = (id: string) => {
        let index1 = id.indexOf(":");
        let index2 = id.indexOf("[");

        let provider = id.substring(0, index1);
        let block = id.substring(index1 + 1, (index2 == -1) ? undefined : index2);
        let name: string|undefined = (Localization as ILocalization)[`block.${provider}.${block}`];

        if(name === undefined)
            return block;

        return name;
    };

    const getItems = (palette: { [key: string]: number }) => {
        let keys: JSX.Element[] = [];
        let id = 0;

        for(let k in palette){
            keys.push(<li key={id}>0/{palette[k]} {getBlockName(k)}</li>)
            id++;
        }

        return keys;
    };

    return (
        <div id="schematic-component">
            <div className="card">
                <div className="card-title">Palette</div>
                <div className="card-body"><ul>{getItems(schematic.Palette)}</ul></div>
            </div>
        </div>
    );
}

export type { ISchematic };
export { SchematicComponent }