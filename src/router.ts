import { Router } from "express";
import { body } from "express-validator"
import { createAccount, login } from "./handlers";
import { handleInputError } from "./middleware/validation";
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

export default router