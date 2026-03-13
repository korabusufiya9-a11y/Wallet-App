const CategoryModel = require('../Models/CategoryModel'); // Adjust paths as needed
const LabelModel = require('../Models/LabelModel');

/**
 * CATEGORY CONTROLLERS
 */
const CategoryController = {
    // Create
    create: async (req, res) => {
        try {
            const category = new CategoryModel(req.body);
            const savedCategory = await category.save();
            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    // Read All (for a specific user)
    getAll: async (req, res) => {
        try {
            const categories = await CategoryModel.find({ userId: req.query.userId });
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Update
    update: async (req, res) => {
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { returnDocument: 'after', runValidator: true }
            );
            if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    // Delete
    delete: async (req, res) => {
        try {
            const deleted = await CategoryModel.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Category not found" });
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

/**
 * LABEL CONTROLLERS
 */

const LabelController = {
    create: async(req,res)=>{
       try{
        const Label = new LabelModel(req.body);
        const savedLabel = await Label.save();
        res.status(201).json(savedLabel);   
    }catch(error){
        res.status(400).json({success:false ,message:error.message});
    }
    },

    getAll: async(req,res)=>{
        try{
            const Label = await LabelModel.Find({userId:req.body.userId})
            res.status(200).json(Label)
        }catch (error){
            res.status(500).json({sucess:false , message: error.message});
        }
    },

    update: async (req,res)=>{
        try{
            const updatedLabel = await LabelModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {returnDocument: 'after', runValidator: true},
            )
             if (!updatedLabel) return res.status(404).json({ message: "Label not found" });
            res.status(200).json(updatedLabel);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
        
    },

    delete: async(req,res) =>{
try {
            const deleted = await LabelModel.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Category not found" });
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}



module.exports = { CategoryController, LabelController };