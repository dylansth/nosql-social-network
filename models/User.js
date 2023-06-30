const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: "Username Required",
        },

        email: {
            type: String,
            required: "Email Required",
            unique: true,
            match: [/.+@.+\..+/],
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false, 
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model ("User", userSchema);

module.exports = User;