const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require ("../../controllers/user-controller")

router.route("/").get(getAllUsers);

router.route("/:userId").get(getUserById);

router.route("/").post(createUser);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);

module.exports = router