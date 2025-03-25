import mongoose from 'mongoose'
export interface IUser {
    handle: string
    name: string
    email: string
    password: string
}
const UserSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        trin: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trin: true
    },
    email: {
        type: String,
        required: true,
        trin: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trin: true
    }
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User