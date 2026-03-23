const express = require('express');
const router = express.Router();

const RecordController = require('../Controllers/RecordController');

router.post('/create', RecordController.createRecord);
router.get('/getAll', RecordController.getAllRecords);
router.get('/getOne/:id', RecordController.getRecordById);


router.put('/update/:id', RecordController.updateRecord); 

router.delete('/delete/:id', RecordController.deleteRecord);

module.exports = router; 