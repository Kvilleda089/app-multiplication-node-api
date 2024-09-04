import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

//console.log(yarg.b); 
//funcion anonima auto invocada 
(async()=>{
    await main();
    
})();

async function main(){
    const {b: base, l:limit, s:showTable, n:fileName, d: destinationFile} = yarg;
    ServerApp.run({base, limit, showTable, fileName, destinationFile});
}
