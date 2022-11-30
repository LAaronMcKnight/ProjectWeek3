// import express to use routers
const express = require('express')

// import foodController

const foodController = require('../../controllers/api/foodController')

const router = express.Router()

// use router to redirect to different controller depending on method
router.route('/').get(foodController.getMenu)
// router.route('/admin').post(foodController.createFood)
router.route('/').post(foodController.createFood)
router.route('/:id').get(foodController.getFood)
// router.route('/:id/edit').get(foodController.getFood)
router.route("/:id").delete(foodController.deleteFood);
router.route('/category/:foodCategory').get(foodController.getCategory)
router.route("/:id/edit").post(foodController.updateFood)

module.exports = router