import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

export const checkPassword = async (password: string, dbpassword:string) => {
    const result = await bcrypt.compare(password, dbpassword)
    return(result)
    
    
}