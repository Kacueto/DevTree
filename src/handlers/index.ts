import { Request, Response } from "express"
import {validationResult} from "express-validator"
import User from "../models/User"
import { hashPassword } from "../utils/auth"


export const createAccount = async (req: Request, res: Response) => {
    // manejar errores
    let errors  = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
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