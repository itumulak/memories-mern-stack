import moongoose from 'mongoose';

const authSchema = new moongoose.Schema({
    id: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: ''
    }
})

export default moongoose.model('Users', authSchema)