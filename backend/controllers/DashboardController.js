const Dashboard = require('../models/DashboardModel');
const StatisticsCentre = require('../models/StatisticsCentreModel');
const validator = require('validator');

//login
const Create = async (req, res) => {
    const { ProduitEnAttente, ProduitDeposes, ProduitRepares
        , ProduitEnReparation, Produitlivre, DelaiMoyenReparation } = req.body;
    try{
        const newDashboard = new Dashboard({
            ProduitEnAttente, ProduitDeposes, ProduitRepares
            , ProduitEnReparation, Produitlivre, DelaiMoyenReparation
        });
        await newDashboard.save();
        res.status(201).json({message: "Dashboard created successfully"});
    }catch(err){
        console.log(err);
    }
}   

//signup
const Update = async (req, res) => {
    
}

//get all users
const GetAll = async (req, res) => {
    
}

//get a specific user
const GetAllByCentre = async (req, res) => {
    
}

module.exports = {
    
}