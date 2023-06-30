const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: "Username Required",
        },
    }
)