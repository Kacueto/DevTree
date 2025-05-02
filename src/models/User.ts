import mongoose, {Document} from 'mongoose'
export interface IUser extends Document {
    handle: string
    name: string
    email: string
    password: string
    description: string
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
    },
    description:{
        type: String,
        default: ''
    }
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User