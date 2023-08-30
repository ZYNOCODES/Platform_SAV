const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
//jwt secret
const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: '7d'});
}
//login
const Login = async (req, res) => {
    const {Email, Password} = req.body;
    try{
        if(!Email || !Password){
            return res
                .status(400)
                .json({ message: "Tout les champs doivent etre remplis" });

        }
        const user = await User.findOne({
                where: {
                    Email: Email
                }
        });
        //check if user exist
        if(!user){
            return res.status(400).json({ message: "Email non trouvé" });
        }
        //check if password is correct
        const match = await bcrypt.compare(Password, user.Password);
        if(!match){
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }else{
            //create token
            const token = createToken(user.id);
            var id = user.id;
            var CentreDepot = user.CentreDepot;
            //return user
            res.status(200).json({id, CentreDepot, token});
        }
    }catch(err){
        res.status(400).json({message: err.message});
    }
}   

//signup
const Signup = async (req, res) => {
    const { Email, Password, Nom, Prenom, Telephone, Wilaya, CentreDepot} = req.body;
    try{
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(Password, salt);

        //validation
        if(!Email || !Password || !Nom || !Prenom || !Telephone || !Wilaya || !CentreDepot ){
            return res
              .status(400)
              .json({ message: "Tous les champs doivent être remplis" });
        }
        //check if email is valid
        if(!validator.isEmail(Email)){
            return res.status(400).json({message: "L'Email n'est pas valide"});
        }
        //check if password is strong
        if(!validator.isStrongPassword(Password)){
            return res
              .status(400)
              .json({ message: "Mot de passe pas assez fort" });
        }
        //check if user exist already
        const userexist = await User.findOne({
            where: {
                Email: Email
            }
        });
        if(userexist){
            return res.status(400).json({ message: "Email déjà utilisé" });
        }else{
            //create new user
            const user = await User.create({
                Email: Email,
                Password: hash,
                Nom: Nom,
                Prenom: Prenom,
                Telephone: Telephone,
                Wilaya: Wilaya,
                CentreDepot: CentreDepot,
            });
            if(!user){
                return res.status(400).json({ message: "Utilisateur non enregistré" });
            }else{
                //create token
                const token = createToken(user.id);
                //return user
                var id = user.is;
                res.status(200).json({id, CentreDepot, token, 
                    message:"Connecté avec succès"});
            }
        }
        
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

//get all users
const GetAllUsers = async (req, res) => {
    try {
        const Users = await User.findAll();
        if (Users.length > 0) {
          res.status(200).json(Users);
        }else{
          res.json({message: 'No users found'});
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Error getting users');
      }
}

//get a specific user
const GetUser = async (req, res) => {
    const {id} = req.params;
    try{
        //get user by id
        const user = await User.findByPk(id);
        //check if user exist
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // return user
        res.status(200).json(user);
    }catch (error) {
        console.error(error);
        res.status(500).send('Error getting user');
    }
    
}

//delete a user
const DeleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        //get user by id
        const user = await User.findByPk(id);
        //check if user exist
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // delete user
        await user.destroy();
        // return response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
}

//update a user
const UpdateUser = async (req, res) => {
    const { id, Nom, Prenom, Telephone, Wilaya, CentreDepot} = req.body;
    try {
        //get user by id
        const user = await User.findByPk(id);
        //check if user exist
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // assign user new values
        user.Nom = Nom;
        user.Prenom = Prenom;
        user.Telephone = Telephone;
        user.Wilaya = Wilaya;
        user.CentreDepot = CentreDepot;
        // save user
        await user.save();
        // return updated user
        res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
}

module.exports = {
    Login,
    Signup,
    GetAllUsers,
    GetUser,
    DeleteUser,
    UpdateUser,
}