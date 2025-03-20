import { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"


export const createAccount = async (req: Request, res: Response) => {
    // manejar errores
    
    const { email, password } = req.body
    const userExists = await User.findOne
        ({ email })
    if (userExists) {
        const error = new Error('El usuario con ese email ya existe')
        res.status(409).json({ error: error.message })
        return
    }
    const { default: slug } = await import("slug");
    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne
        ({ handle })
    if (handleExists) {
        const error = new Error('El handle ya existe')
        res.status(409).json({ error: error.message })
        return
    }
    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()

    res.status(201).send('Usuario registrado')
}

export const login = async (req:Request, res:Response) => {
    
   
    const { email, password } = req.body
    const user = await User.findOne({email})
    // revisaar correo si existe
    if (!user) {
        const error = new Error('El usuario no existe')
        res.status(400).json({error:error.message})
        return
    }
    // revisar contrasena
    console.log("Usuario si existe...")
    const passwordCheck = await checkPassword(password,user.password)
    console.log(passwordCheck)
    if (!passwordCheck){
        const error = new Error('Password Incorrecta')
        res.status(401).json({error: error.message})
        return
    } 

    res.send('Autenticado...')
}