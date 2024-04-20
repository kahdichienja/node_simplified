import mongoose, { Document } from 'mongoose';

const { Schema, model } = mongoose;

interface Team extends Document {
    name: string;
    flagUrl: string;
}

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    flagUrl: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

const TeamModel = model<Team>('Team', teamSchema);

export default TeamModel;

export { Team };
