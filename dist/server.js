"use strict";
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
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        select: {
            name: true,
            reviews: {
                select: {
                    comment: true,
                    rating: true
                }
            }
        }
    });
    res.json(products);
}));
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const product = yield prisma.product.create({
        data: {
            name: body.name,
            description: body.description,
            price: body.price
        }
    });
    res.json(product);
}));
app.post('/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const review = yield prisma.review.create({
        data: {
            rating: body.rating,
            comment: body.comment,
            product: {
                connect: {
                    id: body.productId
                }
            }
        }
    });
    res.json(review);
}));
app.get('/ping', (req, res) => {
    res.json({ message: 'hello' });
});
const PORT = 3001;
app.listen(PORT);
console.log(`Listening on http://localhost:${PORT}`);
//# sourceMappingURL=server.js.map