import * as jwt from 'jsonwebtoken';
const jwtSecretKey = process.env.JWT_SECRET_KEY?process.env.JWT_SECRET_KEY:'';
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY?process.env.JWT_REFRESH_SECRET_KEY:'';
const tokenExpiry = process.env.TOKEN_EXPIRY;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;


export const generateToken = (data:any)=>{
    // data.time = new Date().getTime(); // returned value is in ms 
    const token = jwt.sign(data, jwtSecretKey,{
        algorithm: 'HS512',
        expiresIn: tokenExpiry
    });
    
    return token;
}

export const generateRefreshToken = (data: any)=>{
    const refreshToken = jwt.sign(data,jwtRefreshSecretKey,{
        algorithm: 'HS512',
        expiresIn: refreshTokenExpiry
    })
    return refreshToken;
}

// return decoded value
export const validateJwtToken = (token: string): Object=>{
    const check = jwt.verify(token,jwtSecretKey,{
        algorithms:['HS512']
    });
    return check;
}

