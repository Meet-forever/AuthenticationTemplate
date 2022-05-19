import crypto from "crypto"

const hashGenerator = (password) =>{
    const salt = crypto.randomBytes(36).toString('hex');
    const key = crypto.pbkdf2Sync(password, salt, 90000, 64, 'sha512').toString('hex');
    return [key, salt]
}

export const isValid = (password, hpass, salt) =>{
    return hpass === crypto.pbkdf2Sync(password,salt, 90000, 64, 'sha512').toString('hex');
}


export default hashGenerator
