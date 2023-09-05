const Dashboard = require('../models/DashboardModel');
const StatisticsCentre = require('../models/StatisticsCentreModel');
const validator = require('validator');

// get all data from dashboard
const GetAll = async (req, res) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    try {
        const dashboard = await Dashboard.findAll({
            where: {
                createdAt: todayDate
            }
        });
        if (dashboard) {
          res.status(200).json({Dashboard : dashboard});
        }else{
          res.json({message: 'No dashboard found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting dashboard');
    }
}   

//get a specific user
const GetAllByCentre = async (req, res) => {
    const { centre } = req.params;
    const todayDate = new Date().toISOString().slice(0, 10);
    try {
        const dashboard = await StatisticsCentre.findAll({
            where: {
                createdAt: todayDate,
                Centre : centre
            }
        });
        if (dashboard) {
          res.status(200).json({Dashboard : dashboard});
        }else{
          res.status(500).json({message: 'No dashboard found'});
        }
    }catch(e) {
        console.error(error);
        res.status(500).send('Error getting dashboard by centre');
    }
}

module.exports = {
    GetAll,
    GetAllByCentre
}