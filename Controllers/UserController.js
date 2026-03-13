const UserController = require('../Models/UserModel');
const UserController = {

    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            res.status(201).json({ message: "User created successfully", data: req.body });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error: error.message });
        }
    },

    
    updateUser: async (req, res) => {
        try {
            const { id, ...updateData } = req.body;
            
            res.status(200).json({ message: `User ${id} updated`, data: updateData });
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error: error.message });
        }
    },


    deleteUser: async (req, res) => {
        try {
            const { id } = req.body;
            res.status(200).json({ message: `User ${id} deleted` });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    },


    getUser: async (req, res) => {
        try {
            
            res.status(200).json({ message: "User data retrieved", data: [] });
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", error: error.message });
        }
    }
};

module.exports = UserController;