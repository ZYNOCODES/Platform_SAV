const User = require('../models/UserModel');
const Transaction = require('../models/TransactionModel')
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
            await Transaction.create({
                UserID : user.id , Action : 'l\'utilisateur connecté'
              }).then(async () => {
                console.log("Transaction created successfully");
              }).catch((error) => console.log(error));
            //create token
            const token = createToken(user.id);
            var id = user.id;
            var Role = user.Role;
            var Centre = user.Centre;
            //return user
            res.status(200).json({id, Role, Centre, token});
        }
    }catch(err){
        res.status(400).json({message: err.message});
    }
}   

//signup
const Signup = async (req, res) => {
    const { Email, Password, ResetPassword, Nom, Prenom, Telephone, Role, Centre} = req.body;
    try{
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(Password, salt);

        //validation
        if(!Email || !Password || !Nom || !Prenom || !Telephone || !Role || !Centre ){
            return res
              .status(400)
              .json({ message: "Tous les champs doivent être remplis" });
        }
        //check if email is valid
        if(!validator.isEmail(Email)){
            return res.status(400).json({message: "L'Email n'est pas valide"});
        }
        //check if password match
        if(Password != ResetPassword){
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
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
                Role: Role,
                Centre: Centre,
            });
            if(!user){
                return res.status(400).json({ message: "Utilisateur non enregistré" });
            }else{
                await Transaction.create({
                    UserID : user.id , Action : 'l\'utilisateur deconnecté'
                  }).then(async () => {
                    console.log("Transaction created successfully");
                  }).catch((error) => console.log(error));
                //create token
                const token = createToken(user.id);
                //return user
                res.status(200).json({message:"Utilisateur enregistré avec succès"});
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

//get all users by center
const GetAllUsersByCentre = async (req, res) => {
    const {centre} = req.params;
    try {
        const Users = await User.findAll({
            where: {
                Centre: centre
            }
        });
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
        res.status(200).json({user: user});
    }catch (error) {
        console.error(error);
        res.status(500).send('Error getting {user: user}');
    }
    
}

//delete a user
const DeleteUser = async (req, res) => {
    const { id, userID } = req.body;
    try {
        //get user by id
        const user = await User.findByPk(id);
        //check if user exist
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // delete user
        await user.destroy().then(async ()=>{
            await Transaction.create({
                UserID : userID , Action : `supprimer l'utilisateur avec ID = ${id}`
              }).then(async () => {
                console.log("Transaction created successfully");
              }).catch((error) => console.log(error));
        }).catch((err) => console.log(err));
        // return response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
}

//update a user
const UpdateUser = async (req, res) => {
    const { id, Nom, Prenom, Telephone, Role, Centre, Email, Password , ResetPassword, userID} = req.body;
    try {

        if(!Nom && !Prenom && !Telephone && !Role && !Centre && !Email && !Password ){
            return res
              .status(400)
              .json({ message: "remplis au moin un champs pour modifier" });
        }
        //check email 
        if(Email){
            if(!validator.isEmpty(Email)){
                //check if email is valid
                if(!validator.isEmail(Email)){
                    return res.status(400).json({message: "L'email n'est pas valide"});
                }else{
                    //check if email is already used
                    const userexist = await User.findOne({
                    where: {
                        Email: Email
                    }
                    });
                    if(userexist){
                        return res.status(400).json({ message: "Email déjà utilisé" });
                    }
                }
            }     
        }
        //check password 
        if(Password){
            if(!validator.isEmpty(Password)){
                //check if password match
                if(Password != ResetPassword){
                    return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
                }else{
                    //check if password is strong
                    if(!validator.isStrongPassword(Password)){
                        return res
                        .status(400)
                        .json({ message: "Mot de passe pas assez fort" });
                    }
                }
            }        
        }
        //get user by id
        const user = await User.findByPk(id);
        //check if user exist
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // assign user new values
        if (Nom) user.Nom = Nom;
        if (Prenom) user.Prenom = Prenom;
        if (Telephone) user.Telephone = Telephone;
        if (Role) user.Role = Role;
        if (Centre) user.Centre = Centre;
        if (Email) user.Email = Email;
        if (Password){
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(Password, salt);
            user.Password = hash;
        }
        // save user
        await user.save().then(async () => {
            await Transaction.create({
                UserID : userID , Action : `met à jour le profil de l'utilisateur avec ID = ${user.id}`
              }).then(async () => {
                console.log("Transaction created successfully");
              }).catch((error) => console.log(error));
        }).catch((err) => console.log(err));
        // return updated user
        res.json({user: user, message: 'User updated successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
}

module.exports = {
    Login,
    Signup,
    GetAllUsers,
    GetAllUsersByCentre,
    GetUser,
    DeleteUser,
    UpdateUser,
}