const express = require('express');
const router = express.Router(); //auti i methodos kanei to routing olis tis efarmogis mou diladi xeirizete ta ap, get, post, put, delete klp

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll ); //diadikasia find
router.get('/:username', userController.findOne ); //diadikasia find one
router.post('/', userController.create);
router.patch('/:username', userController.update);
router.delete('/:username', userController.delete );

module.exports = router 

//path parameter me to / kai query parameter me to ?