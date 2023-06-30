import { Block } from "prismarine-block";
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

function SchematicComponent({ schematic }: ScheamticProps){
    const getItems = (palette: { [key: string]: number }) => {
        let keys: JSX.Element[] = [];
        let id = 0;

        for(let k in palette){
            keys.push(<li key={id}>{palette[k]} of {k}</li>)
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