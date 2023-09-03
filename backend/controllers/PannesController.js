const Panne = require('../models/PannesModel');
const validator = require('validator');
const multer = require('multer');
const path = require('path');

const index = async (req, res) => {
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
          CentreDepot, DateDepot });
      res.status(200).json({message: 'Panne created successfully'});
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
const UplaodIMG = async (req, res) => {
    const id  = req.body.id;
    if(req.file === undefined){
      return res.status(400).json({message: 'No file uploaded'});
    }
    const image = req.file.path;
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
      cb(null,'images');
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
module.exports = {
  index,
  GetByID,
  GetByRefProduct,
  Create,
  Update,
  Remove,
  UplaodIMG,
  upload
};
