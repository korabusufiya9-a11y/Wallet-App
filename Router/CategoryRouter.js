const express = require ('express');
const router = express.Router();
const{ CategoryController} =require('../Controllers/CategoryController');


///Categories router
router.post('/create',CategoryController.create);
router.get('/getAll',CategoryController.getAll);
router.put('/update/:id',CategoryController.update);
router.delete('/delete/:id',CategoryController.delete);

module.exports=router;