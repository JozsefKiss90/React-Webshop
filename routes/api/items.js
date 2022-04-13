const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const Item = require('../../models/Item')

router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

router.post('/', (req, res) => {
    const newItem= new Item({
        name: req.body.name
    })
    newItem.save().then(item=> res.json(item))
})

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item=>item.remove().then(()=>res.json({succes:true})))
  .catch(err=>res.status(404).json({succes:false}));
})


module.exports = router;