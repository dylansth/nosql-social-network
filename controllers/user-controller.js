const { User, Thought, Reaction } = require('../models');

const userController = {
    getAllUsers(req, res) {
        // populate path and exclude __v.
        User.find({})
        .populate({
            path: 'thoughts',
            select: "-__v",
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    
    getUserById(req, res) {
        User.findById(req.params.userId)
          .populate({
            path: 'thoughts',
            select: '-__v',
          })
          .populate({
            path: 'friends',
            select: '-__v',
          })
          .select('-__v')
          .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(500).json(err));
      },
}