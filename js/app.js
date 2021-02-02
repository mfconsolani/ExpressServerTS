"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
let itemCount = 0;
let itemsCount = 0;
function fileParser(fileToParse) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield fs.promises.readFile(fileToParse, 'utf-8');
        const parsedFile = yield JSON.parse(file);
        return parsedFile;
    });
}
app.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield fileParser('./productos.txt');
    const listadoProd = {
        items: productos,
        cantidad: productos.length
    };
    itemsCount++;
    res.status(200).send(listadoProd);
}));
app.get('/item-random', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield fileParser('./productos.txt');
    const randNum = Math.ceil(Math.random() * (productos.length));
    const randItem = productos.filter(item => item.id === randNum);
    itemCount++;
    res.status(200).json(randItem);
}));
app.get('/visitas', (req, res) => {
    res.send({ visitas: itemsCount, visita: itemCount });
});
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`);
});
