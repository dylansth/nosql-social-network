const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Thought Required",
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: function(value) {
            return value.toLocaleString();
        },
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;