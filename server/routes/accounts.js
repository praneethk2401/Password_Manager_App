import Account from "../models/account.js";
import express from "express";
import bcrypt from "bcrypt";

const app = express.Router();
//Creating the account and storing the password
app.post('/account', async (req, res) => {
    try{
        const {accountName, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newAccount = new Account({
            userId: req.body.userId,
            accountName: accountName,
            username: username,
            encryptedPassword: hashedPassword
        });
        await newAccount.save();
        res.status(201).json({message: "Account created Successfully"});
    }
    catch(err){
        res.status(500).json({err});
    }
});
// Get al the accounts for a specific user
app.get('/account/user/:userId', async (req, res) => {
    try{
        const accounts = await Account.find({userId: req.params.userId});
        res.status(200).json(accounts);
    }
    catch(err){
        res.status(500).json({err});
    }
});

//Get a specific account by its ID 
app.get('/account/:id', async (req, res) => {
    try{
        const account = await Account.findById(req.params.id);
        if(account) {
            res.status(200).json(account);
        }
        else {
            res.status(404).json({message: "Account not found"});
        }
    }
    catch(err){
        res.status(500).json({err});
    }
});

//Update the account details
app.put('/account/:id', async (req, res) => {
    try{
        const {accountName, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, {
            accountName,
            username,
            encryptedPassword: hashedPassword,
        }, {new: true});
        if(updatedAccount){
            res.status(200).json(updatedAccount);
        }
        else{
            res.status(404).json({message: "Account not found"});
        }
    }
    catch (err){
        res.status(500).json({err});
    }
});

//Delete the account
app.delete('/account/:id', async (req, res) => {
    try{
        const deletedAccount = await Account.findByIdAndRemove(req.params.id);
        if(deletedAccount){
            res.status(200).json({message: 'Account deleted successfully'});
        }
        else{
            res.status(404).json({message: "Account not found"});
        }
    }
    catch (err){
        res.status(500).json({err});
    }
});

// Search for an account based on accountName or username
app.get('/account/search', async (req, res) => {
    try {
      const { accountName, username } = req.query;
      let searchCriteria = {};
  
      if (accountName) {
        searchCriteria.accountName = accountName;
      }
  
      if (username) {
        searchCriteria.username = username;
      }
  
      const accounts = await Account.find(searchCriteria);
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });


  export default app;