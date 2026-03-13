const express = require('express');
const router =express.Router();
const {LabelController}= require('../Controllers/CategoryController');

console.log("Checking Controller Methods:", {
    create: typeof LabelController.create,
    getAll: typeof LabelController.getAll
});
router.post('/labelcreate',LabelController.create);
router.get('/labelgetAll',LabelController.getAll);
router.put('/label/:Id',LabelController.update);
router.delete('/labeldelete/:Id',LabelController.delete);

module.exports=router;