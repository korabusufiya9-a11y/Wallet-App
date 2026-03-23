const express = require('express');
const router =express.Router();
const {LabelController}= require('../Controllers/CategoryController');

console.log("Checking Controller Methods:", {
    create: typeof LabelController.create,
    getAll: typeof LabelController.getAll
});
router.post('/create',LabelController.create);
router.get('/getAll',LabelController.getAll);
router.put('/update/:id',LabelController.update);
router.delete('/delete/:id',LabelController.delete);

module.exports=router;