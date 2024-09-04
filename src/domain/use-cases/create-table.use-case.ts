export interface CreateTableUseCase{
    excecute: (options: CreateTableOptions) => string;
};

export interface CreateTableOptions{
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase{
    constructor(){}

    excecute({base, limit=10}: CreateTableOptions){
        let outputMessage = '';
        for(let i=1; i <=limit; i++){
            outputMessage += `${base} * ${i} = ${base * i}\n`;
        };
        return outputMessage;
    }
}