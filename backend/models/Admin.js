import { Schema, model } from 'mongoose';
// import bcrypt from 'bcryptjs';
import Joi from 'joi';


const Admin = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i.test(value);
            },
            message: "Invalid email address"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return value.length >= 8;
            },
            message: "Password must be at least 8 characters long"
        }
    },
}, { timestamps: true })

// Admin.pre('save', async function (next) {
//     const admin = this;
//     if (!admin.isModified('password')) {
//         return next();
//     }
//     try {
//         const salt = await bcrypt.genSalt(10);
//         admin.password = await bcrypt.hash(admin.password, salt);
//     }
//     catch (error) {
//         return next(error);
//     }
//     next();
// });

// Admin.methods.comparePassword = async function (password) {
//     try {
//         const isMatch = await bcrypt.compare(password, this.password);
//         return isMatch;
//     }
//     catch (error) {
//         return error;
//     }
// };

// Admin.methods.generateJWT = function () {
//     // const options = {
//     //     expiresIn: '1h',
//     // };
//     return jwt.sign(_id, process.env.JWT_SECRET);
// };

export const validateCreateAdmin = function (obj) {
    const schema = Joi.object({
        email: Joi.string().trim().required().label("Email is required").email(),
        password: Joi.string().trim().required().label("Password is required").min(8).max(100),
    })
    return schema.validate(obj)
}

export default model('Admin', Admin)