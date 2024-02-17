import mongoose from 'mongoose';
const url: string = process.env.MONGO_URL ? `${process.env.MONGO_URL}` : '';
let db: any;
export const connectToDb = async () => {
    console.log(url);
    try {
        const _db = await mongoose.connect(url);
        return _db
        // console.log(db);
    } catch (e) {
        console.log('failed to connect to db', e);

    }
}

export const DBConnection = async () => {
    if (!db) {
        db = await connectToDb();
    }
    return db;
}
// export default db;

// export connectToDb;

// export function connectToDb() {
//   throw new Error('Function not implemented.');
// }
