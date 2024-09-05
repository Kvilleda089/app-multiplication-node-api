
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import fs from 'fs';



describe('SaveFileUseCase', () =>{
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
      }
    
      const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
   
    afterEach(()=>{
        const outputFolderExists = fs.existsSync('outputs');
        if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });
          
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if ( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true });
    })


    test('Should save file with default values', ()=>{
        const filePath = 'outputs/table.txt'
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        };
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    

    test('should return false if directory could not be created', () =>{
        const saveFile = new SaveFile();
        const mkdirMock= jest.spyOn(fs, 'mkdirSync').mockImplementation(
            ()=>{throw new Error('This is a custom error message from testing')});
        const result = saveFile.execute(customOptions);
        

        expect(result).toBe(false);
        mkdirMock.mockRestore();
    });

    test('should return false if file could not be create', () =>{
        const saveFile = new SaveFile();
        const writeFileMock= jest.spyOn(fs, 'writeFileSync').mockImplementation(
            ()=>{throw new Error('This is a custom writing error message')});
      
        const result = saveFile.execute({fileContent: 'test'});
        

        expect(result).toBe(false);
        writeFileMock.mockRestore();
    });
    

});