import express from 'express';
import Account from '../models/account.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/decrypt', async (req, res) => {
    try {
        const {accountId, secretPassword} = req.body;
        const account = await Account.findById(accountId);

        if(!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

    //here you should implement your own decryption logic
    // This is a placeholder and is not secure
    const decryptedPassword = account.encryptedPassword;
    res.json({ decryptedPassword});
} catch (error){
    res.status(500).json({ message: 'Failed to decrypt password', error: error.message });
}
});

export default router;