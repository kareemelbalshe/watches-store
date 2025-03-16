import { Schema, model } from 'mongoose';

const Review = new Schema({
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        }
    },
}, { timestamps: true })


export default model("Review", Review);


