const Panne = require('../models/PannesModel');
const validator = require('validator');

class PanneController {
  static async index(req, res) {
    // Handle request to get all Pannes
    const { Role, CentreDepot } = req.query;
    
    try {
      if(Role === 'Admin'){
        const Pannes = await Panne.findAll();
        if (Pannes.length > 0) {
          res.json({Pannes: Pannes});
        }else{
          res.json({message: 'No pannes found'});
        }
      }else{
        const Pannes = await Panne.findAll({
          where: {
            CentreDepot: CentreDepot,
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
  static async GetByID(req, res) {
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
  static async GetBySAV(req, res) {
    // Handle request to get all Pannes whred by SAV
    const { CentreDepot } = req.body;
    try {
      const Pannes = await Panne.findAll({
        where: {
            CentreDepot: CentreDepot,
        }
      });
      if (Pannes.length > 0) {
        res.json(Pannes);
      }else{
        res.json({message: 'No panne found'});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting panne whred by SAV');
    }
  }
  static async GetByRefProduct(req, res) {
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
  
  
  static async Create(req, res) {
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
            CentreDepot, DateDepot });
        res.status(200).json({message: 'Panne created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating panne');
    }
  }

  static async Update(req, res) {
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
      // assign panne new values
      panne.Progres = progres;
      // save panne
      await panne.save();
      // return updated panne
      res.json({panne: panne, message: 'La panne a été déposée avec succès.'});
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating panne');
    }
  }

  static async Remove(req, res) {
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
}

module.exports = PanneController;
