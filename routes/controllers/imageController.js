const Image = require('../../models/Images')
const asyncHandler = require("express-async-handler")

const getImages = asyncHandler(async (req, res) => {
    const images= await Image.find()
    res.json(images)
})

const getImageById = asyncHandler(async(req, res) => {
    const image = await Image.findById(req.params.id)
    res.json(image)
})

module.exports = getImages, getImageById

