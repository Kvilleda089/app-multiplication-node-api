import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';
const messageAplications = "Aplicación de Consola Multiplicación";

console.log(`¡Bienvenido! a la ${messageAplications}`)
const { b: base, l:limit, showTable} = yarg;

let outputMessage = '';
const headermessage = `
===============================
    Tabla del ${base}
===============================\n
`;

for(let i=1; i <=limit; i++){
    outputMessage += `${base} * ${i} = ${base * i}\n`;
};

outputMessage = headermessage + outputMessage;

if(showTable){
    console.log(outputMessage);
};

const outputPath = `outputs`;

fs.mkdirSync(outputPath, {recursive:true});
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log("FILE Create")