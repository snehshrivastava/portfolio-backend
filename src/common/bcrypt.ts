import * as bcrypt from 'bcrypt';




export const encrypt = async (password:string)=>{
    let saltRounds = parseInt(process.env.SALT_ROUNDS?process.env.SALT_ROUNDS: "10");

    const hash=await bcrypt.hash(password, saltRounds);
    return hash;
}

export const compare = async(plainPass:string,hashPass:string)=>{
    const match: boolean = await bcrypt.compare(plainPass, hashPass);
    return match;
}