const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Image = require('../../models/Images')

router.get('/', async (req, res) => {
    const images= await Image.find()
    res.json(images)
 })
 
 router.get('/:id', async (req, res) => {
     const image = await Image.findById(req.params.id)
     res.json(image)
  })
 

router.post('/', (req, res) => {
    const newImage= new Image({
        title: req.body.title,
        img: req.body.img,
        category: req.body.category
    })
    newImage.save().then(image=> res.json(image))
})

module.exports = router;