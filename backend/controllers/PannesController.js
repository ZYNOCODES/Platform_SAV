const Panne = require('../models/PannesModel');
const Dashboard = require('../models/DashboardModel');
const StatisticsCentre = require('../models/StatisticsCentreModel');
const validator = require('validator');
const multer = require('multer');
const path = require('path');
const { Op, Sequelize } = require('sequelize');


const index = async (req, res) => {
  // Handle request to get all Pannes
  const { Role, CentreDepot } = req.query;
  
  try {
    if(Role === 'Admin'){
      const Pannes = await Panne.findAll({
        where: {
          Progres: {
            [Op.lt]: 5, // Less than 5
          },
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }else{
      const Pannes = await Panne.findAll({
        where: {
          CentreDepot: CentreDepot,
          Progres: {
            [Op.lt]: 5,
          },
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}
const GetAllDelivred = async (req, res) => {
  const { Role, CentreDepot } = req.query;
  
  try {
    if(Role === 'Admin'){
      const Pannes = await Panne.findAll({
        where: {
          Progres: 5,
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }else{
      const Pannes = await Panne.findAll({
        where: {
          CentreDepot: CentreDepot,
          Progres: 5,
        }
      });
      if (Pannes.length > 0) {
        res.json({Pannes: Pannes});
      }else{
        res.json({message: 'No pannes found'});
      }
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}
const GetByID = async (req, res) => {
  // Handle request to get all Pannes whred by ID
  const { id } = req.params;
  try {
    const Pannes = await Panne.findByPk(id);
    if (Pannes) {
      res.json(Pannes);
    } else {
      res.json({ message: 'No panne found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error getting panne by ID');
  }
  
}
const GetByRefProduct = async (req, res) => {
  // Handle request to get all Pannes filtered by ReferanceProduit
  const { Ref, id } = req.params;

  try {
    const currentPanne = await Panne.findOne({
      where: {
        id: id,
      },
    });

    if (!currentPanne) {
      return res.json({ message: 'Panne not found' });
    }

    const allPannes = await Panne.findAll({
      where: {
        ReferanceProduit: Ref,
      },
    });

    const filteredPannes = allPannes.filter((panne) => panne.id !== currentPanne.id);

    if (filteredPannes.length > 0) {
      res.json({ Pannes: filteredPannes });
    } else {
      res.json({ message: 'No panne found without the current panne' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Create = async (req, res) => {
  // Handle request to create a new Panne
  const { Nom, Prenom, Email, Telephone, 
    ReferanceProduit, TypePanne, Wilaya, 
    CentreDepot, DateDepot} = req.body;
try {
    // validation
    if(!Nom || !Prenom || !Email || !Telephone || !ReferanceProduit 
      || !TypePanne || !Wilaya || !CentreDepot || !DateDepot 
      || validator.isEmpty(Nom) || validator.isEmpty(Prenom) || validator.isEmpty(Email) 
      || validator.isEmpty(Telephone) || validator.isEmpty(ReferanceProduit) || validator.isEmpty(TypePanne) 
      || validator.isEmpty(Wilaya) || validator.isEmpty(CentreDepot) || validator.isEmpty(DateDepot)){
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis" });
    }
    if(!validator.isEmail(Email)){
        return res.status(400).json({message: "L'email n'est pas valide"});
    }
    const newPanne = await Panne.create({ Nom, Prenom, Email, Telephone, 
      ReferanceProduit, TypePanne, Wilaya, 
      CentreDepot, DateDepot }).then(async () => {
        const dashboard = await Dashboard.findOne({
          where: {
            createdAt : new Date().toISOString().slice(0, 10),
          }
        });
        const statistics = await StatisticsCentre.findOne({
          where: {
            Centre: CentreDepot,
            createdAt : new Date().toISOString().slice(0, 10),
          }
        });
        // check if dashboard and statistics exist for today
        if (!dashboard && !statistics) {
          // create dashboard
          const newDashboard = await Dashboard.create({
            ProduitEnAttente: 1,
            NbTicketsOuverts: 1,
          });
          await newDashboard.save().then(async () => {
            // create statistics
            const newStatistics = await StatisticsCentre.create({
              Centre: CentreDepot,
              ProduitEnAttente: 1,
              NbTicketsOuverts: 1,
            });
            await newStatistics.save();
            return res.status(200).json({message: 'Panne created successfully'});
          }).catch((err) => {
            console.log("Error while creating dashboard", err);
          });
        }
        if(dashboard && !statistics){
          // create statistics
          const newStatistics = await StatisticsCentre.create({
            Centre: CentreDepot,
            ProduitEnAttente: 1,
            NbTicketsOuverts: 1,
          });
          await newStatistics.save().then(async () => {
            // update dashboard
            dashboard.ProduitEnAttente += 1;
            dashboard.NbTicketsOuverts += 1;          
            await dashboard.save();
            console.log("Dashboard updated successfully");
            return res.status(200).json({message: 'Panne created successfully'});         
          }).catch((err) => {
            console.log("Error while creating statistics", err);
          });
        }
        if(dashboard && statistics){
          // update dashboard
          dashboard.ProduitEnAttente += 1;  
          dashboard.NbTicketsOuverts += 1;        
          await dashboard.save().then(async () => {
            // update statistics where centre = CentreDepot
            await StatisticsCentre.update(
              {
                ProduitEnAttente:  statistics.ProduitEnAttente + 1,
                NbTicketsOuverts: statistics.NbTicketsOuverts + 1,
              },
              {
                where: {
                  Centre: CentreDepot,
                },
              }
            );
            console.log("Dashboard updated successfully");
            // response
            return res.status(200).json({message: 'Panne created successfully'});
          }).catch((err) => {
            console.log("Error while updating dashboard", err);
          });            
        }
      }).catch((err) => {
          console.log("Error while creating panne", err);
      });
} catch (error) {
    console.error(error);
    res.status(500).send('Error creating panne');
}
}
const Update = async (req, res) => {
  // Handle request to update a Panne
  const { id } = req.params;
  const { progres } = req.body;
  try {
    //get user by id
    const panne = await Panne.findByPk(id);
    //check if panne exist
    if (!panne) {
        return res.status(404).json({ error: 'panne not found' });
    }
    const oldProgres = panne.Progres;
    // assign panne new values
    panne.Progres = progres;
    // current date
    const todayDate = new Date().toISOString().slice(0, 10);
    if(progres === 1){
      panne.DateDepot = todayDate;
    }
    // save panne
    await panne.save().then(async () => {
      // update dashboard
      const Date = panne.createdAt;
      const centre = panne.CentreDepot;
      UpdateDashboard(progres, oldProgres, Date, centre);
    }).catch((error) => console.log(error));
    // return updated panne
    res.json({panne: panne, message: 'La panne a été déposée avec succès.'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating panne');
  }
}
const Remove = async (req, res) => {
  // Handle request to delete a Panne
  const { id } = req.params;
  try {
    const panne = await Panne.findByPk(id);

    if (!panne) {
      return res.status(404).json({ error: 'Panne not found' });
    }

    await panne.destroy();
    res.json({ message: 'Panne deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting panne');
  }
}
const GetTop3Product = async (req, res) => {
  try {
    // get all data from dashboard
    const PannesData = await Panne.findAll();
    if (!PannesData || PannesData.length === 0) {
      return res.json({ message: 'No pannes found' });
    }
    // get top 3 repetitive ReferanceProduit
    const top3RepetitiveReferanceProduits = getTop3RepetitiveReferanceProduits(PannesData);
    res.status(200).json({ top3: top3RepetitiveReferanceProduits });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting top 5');
  }
};
const GetTop3Pannes = async (req, res) => {
  try {
    // get all data from dashboard
    const PannesData = await Panne.findAll();
    if (!PannesData || PannesData.length === 0) {
      return res.json({ message: 'No pannes found' });
    }
    // get top 3 repetitive ReferanceProduit
    const top3RepetitiveReferanceProduits = getTop3RepetitiveTypePanne(PannesData);
    res.status(200).json({ top3: top3RepetitiveReferanceProduits });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting top 5');
  }
}
const UplaodIMG = async (req, res) => {
    const id  = req.body.id;
    if(req.file === undefined){
      return res.status(400).json({message: 'No file uploaded'});
    }
    const image = req.file.filename;
    try{
        const panne = await Panne.findByPk(id);
        if (!panne) {
            return res.status(404).json({ error: 'Panne not found' });
        }
        panne.image = image;
        await panne.save();
        res.json({panne: panne, message: 'Image uploaded successfully'});
    }catch(error){
      res.status(500).send('Error uploading image');
    }
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'frontend', 'src', 'Pages', 'Style', 'images'));
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Check the file size limit
  fileFilter: (req, file, cb) => {
    // Check the file types
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files format to upload');
  }
}).single('image');
// add to today date and sub to depot date
const UpdateDashboard = async (progres, oldProgres, todayDate, centre) => {
  if(progres !== 0){
    if(progres === 1){
      // update dashboard
      const dashboard = await Dashboard.findOne({
        where: { createdAt: todayDate },
      });
  
      const sourceStatistics = await StatisticsCentre.findOne({
        where: { Centre: centre, createdAt: todayDate },
      });
  
      if (dashboard) {
        await Dashboard.update(
          { ProduitDeposes: dashboard.ProduitDeposes + 1,
            ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
          { where: { createdAt: todayDate } }
        );
      }
  
      if (sourceStatistics) {
        await StatisticsCentre.update(
          { ProduitDeposes: sourceStatistics.ProduitDeposes + 1,
            ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
          { where: { Centre: centre, createdAt: todayDate } }
        );
      }
    }else if(progres === 2){
      // update dashboard
      const dashboard = await Dashboard.findOne({
        where: { createdAt: todayDate },
      });
  
      const sourceStatistics = await StatisticsCentre.findOne({
        where: { Centre: centre, createdAt: todayDate },
      });
  
      if (dashboard && dashboard.ProduitDeposes > 0) {
        await Dashboard.update(
          { ProduitEnReparation: dashboard.ProduitEnReparation + 1,
            ProduitDeposes: dashboard.ProduitDeposes - 1 },
          { where: { createdAt: todayDate } }
        );
      }
      
      if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
        await StatisticsCentre.update(
          { ProduitEnReparation: sourceStatistics.ProduitEnReparation + 1,
            ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
          { where: { Centre: centre, createdAt: todayDate } }
        );
      }
    }else if(progres === 3){
      // update dashboard
      if(oldProgres === 2){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnReparation > 0) {
          await Dashboard.update(
            { ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnReparation: dashboard.ProduitEnReparation - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnReparation > 0) {
          await StatisticsCentre.update(
            { ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnReparation: sourceStatistics.ProduitEnReparation - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 1){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitDeposes > 0) {
          await Dashboard.update(
            { ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitDeposes: dashboard.ProduitDeposes - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
          await StatisticsCentre.update(
            { ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if (oldProgres === 0){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnAttente > 0) {
          await Dashboard.update(
            { ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnAttente > 0) {
          await StatisticsCentre.update(
            { ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }else if(progres === 4){
      // update dashboard
      if(oldProgres === 3){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitRepares > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitRepares > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 2){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnReparation > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnReparation: dashboard.ProduitEnReparation - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnReparation > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnReparation: sourceStatistics.ProduitEnReparation - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 1){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitDeposes > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitDeposes: dashboard.ProduitDeposes - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 0){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnAttente > 0) {
          await Dashboard.update(
            { EnAttenteDePickup: dashboard.EnAttenteDePickup + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnAttente > 0) {
          await StatisticsCentre.update(
            { EnAttenteDePickup: sourceStatistics.EnAttenteDePickup + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }else if(progres === 5){
      // update dashboard
      if(oldProgres === 4){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.EnAttenteDePickup > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              EnAttenteDePickup: dashboard.EnAttenteDePickup - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.EnAttenteDePickup > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              EnAttenteDePickup: sourceStatistics.EnAttenteDePickup - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 3){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitRepares > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1, },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitRepares > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 2){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitEnReparation > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnReparation: dashboard.ProduitEnReparation - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitEnReparation > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnReparation: sourceStatistics.ProduitEnReparation - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 1){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard && dashboard.ProduitDeposes > 0) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitDeposes: dashboard.ProduitDeposes - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics && sourceStatistics.ProduitDeposes > 0) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitDeposes: sourceStatistics.ProduitDeposes - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }else if(oldProgres === 0){
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
    
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: centre, createdAt: todayDate },
        });
    
        if (dashboard) {
          await Dashboard.update(
            { Produitlivre: dashboard.Produitlivre + 1,
              ProduitRepares: dashboard.ProduitRepares + 1,
              ProduitEnAttente: dashboard.ProduitEnAttente - 1 },
            { where: { createdAt: todayDate } }
          );
        }
        
        if (sourceStatistics) {
          await StatisticsCentre.update(
            { Produitlivre: sourceStatistics.Produitlivre + 1,
              ProduitRepares: sourceStatistics.ProduitRepares + 1,
              ProduitEnAttente: sourceStatistics.ProduitEnAttente - 1 },
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }
  }
}
async function CalculateAverage (Centre) {
  try {
    if(Centre){
      const pannes = await Panne.findAll({
        where: {
          CentreDepot: Centre,
          Progres: 5,
        },
      });
      if (pannes.length === 0) {
        return res.json({ message: 'No pannes found' });
      }
      // Check if the pannes have a start and end date
      if(pannes.FinReparation && pannes.DateDepot){
        // Calculate the average time
        const timeArray = pannes.map((panne) => {
          return calculateTime(panne.createdAt, panne.FinReparation);
        });
        const averageTime = calculateAverageTime(timeArray);
        // get today date
        const todayDate = new Date().toISOString().slice(0, 10);
        // check if dashboard exist
        const sourceStatistics = await StatisticsCentre.findOne({
          where: { Centre: Centre, createdAt: todayDate },
        });
        // update dashboard
        if (sourceStatistics) {
          await StatisticsCentre.update(
            { DelaiMoyenReparation: averageTime},
            { where: { Centre: centre, createdAt: todayDate } }
          );
        }
      }
    }
    if(Centre){
      const pannes = await Panne.findAll({
        where: {
          Progres: 5,
        }
      });
  
      if (pannes.length === 0) {
        return res.json({ message: 'No pannes found' });
      }
      // Check if the pannes have a start and end date
      if(pannes.FinReparation && pannes.DateDepot){
        // Calculate the average time
        const timeArray = pannes.map((panne) => {
          return calculateTime(panne.DateDepot, panne.FinReparation);
        });
        const averageTime = calculateAverageTime(timeArray);
        // get today date
        const todayDate = new Date().toISOString().slice(0, 10);
        // check if dashboard exist
        const dashboard = await Dashboard.findOne({
          where: { createdAt: todayDate },
        });
        // update dashboard
        if (dashboard) {
          await Dashboard.update(
            { DelaiMoyenReparation:averageTime},
            { where: { createdAt: todayDate } }
          );
        }
      }
    }
  }catch(error){
    console.error(error);
    res.status(500).send('Error calculating average time');
  }
}
function calculateTime(startDate, endDate) {
  // Parse the input dates as JavaScript Date objects
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);

  // Calculate the time difference in milliseconds
  const timeDifference = endTime - startTime;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeDifference / 3600000);
  const minutes = Math.floor((timeDifference % 3600000) / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);

  // Format the result as "hour:minute:second"
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
function calculateAverageTime(timeArray) {
  // Convert time strings to seconds
  const timeInSecondsArray = timeArray.map(timeString => {
    const parts = timeString.split(':');
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
  });

  // Calculate the sum of all times in seconds
  const totalTimeInSeconds = timeInSecondsArray.reduce((total, time) => total + time, 0);

  // Calculate the average time in seconds
  const averageTimeInSeconds = totalTimeInSeconds / timeArray.length;

  // Convert the average time back to the HH:mm:ss format
  const hours = Math.floor(averageTimeInSeconds / 3600);
  const minutes = Math.floor((averageTimeInSeconds % 3600) / 60);
  const seconds = Math.floor(averageTimeInSeconds % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function getTop3RepetitiveReferanceProduits(pannesData) {
  // Create an empty object to store the counts of each ReferanceProduit
  const referanceCounts = {};

  // Iterate through the pannesData array and count the occurrences of each ReferanceProduit
  for (const panne of pannesData) {
      const referance = panne.ReferanceProduit;
      if (referanceCounts[referance]) {
          referanceCounts[referance]++;
      } else {
          referanceCounts[referance] = 1;
      }
  }

  // Convert the object into an array of objects with ReferanceProduit and count properties
  const referanceCountArray = Object.entries(referanceCounts).map(([referance, count]) => ({
      ReferanceProduit: referance,
      Count: count,
  }));

  // Sort the array in descending order based on count
  referanceCountArray.sort((a, b) => b.Count - a.Count);

  // Return the top 3 repetitive ReferanceProduits
  return referanceCountArray.slice(0, 3);
}
function getTop3RepetitiveTypePanne(pannesData) {
  // Create an empty object to store the counts of each ReferanceProduit
  const typePanneCounts = {};

  // Iterate through the pannesData array and count the occurrences of each TypePanne
  for (const panne of pannesData) {
      const typePanne = panne.TypePanne;
      if (typePanneCounts[typePanne]) {
          typePanneCounts[typePanne]++;
      } else {
          typePanneCounts[typePanne] = 1;
      }
  }

  // Convert the object into an array of objects with TypePanne and count properties
  const typePanneCountArray = Object.entries(typePanneCounts).map(([typePanne, count]) => ({
      TypePanne: typePanne,
      Count: count,
  }));

  // Sort the array in descending order based on count
  typePanneCountArray.sort((a, b) => b.Count - a.Count);

  // Return the top 3 repetitive TypePannes
  return typePanneCountArray.slice(0, 3);
}
module.exports = {
  index,
  GetAllDelivred,
  GetByID,
  GetByRefProduct,
  Create,
  Update,
  Remove,
  GetTop3Product,
  GetTop3Pannes,
  UplaodIMG,
  upload
};
