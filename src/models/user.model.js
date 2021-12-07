import mongoose from 'mongoose';


const { Schema } = mongoose;

const userSchema = new Schema({
    email : {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },

    timestamps: true,
});

export default mongoose.model('User', userSchema);