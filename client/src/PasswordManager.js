import React, { useState, useEffect } from "react";
import axios from 'axios';

const PasswordManager = () => {
    // This line defines a functional component called PasswordManager
    const [passowrds, setPasswords] = useState([]);
    // This line creates a state variable 'passsowrds' (note the typo) and its setter function
    // It's initialized as an empty array, likely to store a list of passwords
    const [secretPassword, setSecretPassword] = useState('');
    // This creates a state variable 'secretPassword' and its setter
    // It's initialized as an empty string, possibly for user input of a master password
    const [selectedPassword, setSelectedPassword] = useState(null);
    // This creates a state variable 'selectedPassword' and its setter
    // It's initialized as null, likely to store a password selected by the user from the list
    const [decryptedPassword, setDecryptedPassword] = useState('');
    // This creates a state variable 'decryptedPassword' and its setter
    // It's initialized as an empty string, probably to store a decrypted version of a password
    const [showDecrypted, setShowDecrypted] = useState(false);
    // This creates a state variable 'showDecrypted' and its setter
    // It's initialized as false, likely used to control whether to display decrypted passwords


//fetching the passwords for the server
useEffect(() => {
    fetchPasswords();
}, []);

const fetchPasswords = async () => {
    try {
        const response = await axios.get('/api/accounts/account/user/' + localStorage.getItem('userId'));
        setPasswords(response.data);
    }
    catch (error) {
        console.error('Error fetching passwords:', error);
    }
};

const handlViewPassword = (passwordId) => {
    setSelectedPassword(passwordId);
    setSecretPassword('');
    setShowDecrypted(false);
};

const handleDecrypt = async () => {
    try {
        const response = await axios.post('/api/accounts/decrypt', {
            accountId: selectedPassowrd,
            secretPassword: secretPassword
        });
        setDecryptedPassword(response.data.decryptedPassword);
        setShowDecrypted(true);
        setTimeout(() => {
            setShowDecrypted(false);
            setDecryptedPassword('');
        }, 30000); // hide after 30 seconds
    } catch (error) {
        console.error('Error decrypting password:', error);
        alert('Incorrect secret password');
    }
};
 return (
    <div>
        <h1>Password Manager</h1>
        <ul>
            {passowrds.map(password => (
                <li key={password._id}>
                    {password.accountName}: {showDecrypted && selectedPassowrd === password._id ? decryptedPassword : '••••••••'}
                    <buttonn onClick={() => handleViewPassword(password._id)}>Reveal</buttonn>
                </li>
            ))}
        </ul>
        {selectedPassowrd && (
            <div>
                <input
                    type="password"
                    value={secretPassword}
                    onChanging={(e) => setSecretPassword(e.target.value)}
                    placeholder="Enter the Secret Password"
                />
                <button onClick={handleDecrypt}>Decrypt</button>
            </div>
        )}
    </div>
);
};

export default PasswordManager;
