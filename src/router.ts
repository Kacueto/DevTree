import { Router } from "express";
import { body } from "express-validator"
import { createAccount, getUser, login, updateProfile } from "./handlers";
import { handleInputError } from "./middleware/validation";
import { authenticate } from "./middleware/auth";
const router = Router()

// Autenticacion y registro
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage("El Handle no puede ir vacio"),
    body('name')
        .notEmpty()
        .withMessage("El nombre no puede ir vacio"),
    body('email')
        .isEmail()
        .withMessage("El email no es valido"),
    body('password')
        .isLength({ min: 8 })
        .withMessage("La contraseña no puede ser menor a 8 caracteres"),
    handleInputError,
    createAccount)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage("El email no es valido"),
    body('password')
        .notEmpty()
        .withMessage("El password es obligatorio"),
    handleInputError,
    login
)

router.get('/user', authenticate, getUser)

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage("El Handle no puede ir vacio"),
    body('description')
        .notEmpty()
        .withMessage("La descripcion no puede ir vacio"), 
        handleInputError,
        authenticate, 
        updateProfile
    )
export default router