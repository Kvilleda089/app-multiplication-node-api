import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions{
    base: number;
    limit: number;
    showTable: boolean;
    fileName?: string;
    destinationFile?: string;
}


export class ServerApp{

    static run({base, limit, showTable, fileName, destinationFile}: RunOptions){
        console.log("Server Running...")
        const table = new CreateTable().excecute({base,limit});
        const wasCreated  = new SaveFile().execute({fileContent: table, fileName: fileName, destination:destinationFile});
        if (showTable) console.log(table);
        (wasCreated)
        ? console.log("File Created!")
        : console.error("File Not Created")
    }
}