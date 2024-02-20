import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import * as mongoose from './configs/mongoose';
import bodyParser from 'body-parser';
import TestModel from './models/test';
import { errorHandler } from './middlewares/errorHandler';
import { indexRouter } from './routes/indexRouter';
import cors from 'cors';
let db: any;
export const server = async () => {

    db = await mongoose.DBConnection();
    if (!global.customvar) {
        global.customvar = {};
    }
    global.customvar.db = db;
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use('/api/v1/', UserRouter);
    app.use('/api/v1', indexRouter);
    // app.use('/roles/',RoleRouter);

    app.get('/', async (req: Request, res: Response) => {
        const testDataNew = new TestModel();
        testDataNew.name = 'sne';
        testDataNew.age = 27;
        testDataNew.val = '2';
        const savedData = await testDataNew.save();
        res.status(200).send({
            message: "success",
            data: savedData
        });
    });
    app.use(errorHandler);
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

}
export default db;