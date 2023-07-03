const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    getThoughtById(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json({ message: "Thought created successfully!" });
            })
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
            new: true,
            runValidators: true,
        })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json({ message: "Thought updated successfully!" });
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findByIdAndRemove(req.params.thoughtId)
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                return User.findByIdAndUpdate(
                    thoughtData.userId,
                    // Pull Operator: Pull thoughtID from thoughts field.
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json({ message: "Thought deleted successfully!" });
            })
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            //push Operator: Push new thoughtId to a users reactions field.
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json({ message: "Reaction created successfully!" });
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            // Pull Operator: Pull from reactions field.
            // Object in reactions field array must match reactionId
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json({ message: "Reaction deleted successfully!" });
            })
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;