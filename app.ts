import express, {Application, Request, Response} from 'express';
import * as fs from 'fs';

const app:Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

let itemCount:number = 0

let itemsCount:number = 0

interface Products {
    title: string,
    price: number,
    thumbnail: string,
    id: number
}

async function fileParser(fileToParse:any):Promise<any>{
    const file: string = await fs.promises.readFile(fileToParse, 'utf-8')
    
    const parsedFile: JSON = await JSON.parse(file);
    
    return parsedFile
}

app.get('/items', async (req: Request, res: Response) => {

    const productos:Array<Products> = await fileParser('./productos.txt')

    const listadoProd: object = {
        items: productos, 
        cantidad: productos.length
    }

    itemsCount++

    res.status(200).send(listadoProd);
})

app.get('/item-random', async (req: Request, res: Response) => {

    const productos:Array<Products> = await fileParser('./productos.txt')

    const randNum:number = Math.ceil(Math.random() * (productos.length));

    const randItem = productos.filter(item => item.id === randNum)

    itemCount++

    res.status(200).json(randItem)
});


app.get('/visitas', (req: Request, res: Response) => {

    res.send({visitas: itemsCount, visita: itemCount})

})

const PORT = 8080;

const server:any = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});

server.on("Error", (error:Error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`)
});