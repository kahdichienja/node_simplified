import mongoose, { Document } from 'mongoose';

const { Schema, model } = mongoose;

interface DesiredResult extends Document {
    wins: number;
    draws: number;
    losses: number;
    acive: boolean;
}

let desiredResultSchema = new Schema({
    wins: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for field "wins".'
        }
    },
    draws: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for field "draws".'
        }
    },
    losses: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for field "losses".'
        }
    },
    acive: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})



const DesiredResultModel = model<DesiredResult>('DesiredResult', desiredResultSchema);

export default DesiredResultModel;

export { DesiredResult };