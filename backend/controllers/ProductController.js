const Product = require('../models/ProductModel');

const GetProductReferance = async (req, res) => {
  try {
    const Products = await Product.findAll();
      if (Products.length > 0) {
        res.status(200).json(Products);
      }else{
        res.status(400).json({message: 'No Products found'});
      }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}

module.exports = {
    GetProductReferance,
}