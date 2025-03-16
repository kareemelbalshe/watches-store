import { Schema, model } from 'mongoose';
import Joi from 'joi';

const Category = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        }
    },
}, { timestamps: true })

export const validateCreateCategory = function (obj) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label("Title is required")
    })
    return schema.validate(obj)
}

export default model('Category', Category)