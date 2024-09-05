import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from '../presentation/server-app';



describe('Server App ', ()=>{

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        fileName: 'test-fileName'
    };
    test('Should create ServerApp Instance',() =>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run).toBe('function')
    });

    test('Should run Server with Options ', () =>{
     
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'excecute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
     
        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server Running...');
        expect(logSpy).toHaveBeenLastCalledWith('File Created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
       
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
 
    });

    test('should run with custom values mocked', () => {
    
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock   = jest.fn().mockReturnValue('1 * 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(false);
    
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.excecute = createMock;
        SaveFile.prototype.execute = saveFileMock;
    
    
        ServerApp.run(options);
    
        expect( logMock ).toHaveBeenCalledWith('Server Running...');
        expect( createMock ).toHaveBeenCalledWith({"base": options.base, "limit": options.limit });
     
        
        expect( logErrorMock ).not.toBeCalledWith();
    
    
      });
    

});