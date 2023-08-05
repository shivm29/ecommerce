// This file contains the functions/controllers  related to authentication and are called when user is on any authentication related route like /register or /login
import { hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = await req.body

        // validation messages 
        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!email) {
            return res.send({ error: 'Email is required' });
        }
        if (!password) {
            return res.send({ error: 'Password is required' });
        }
        if (!phone) {
            return res.send({ error: 'Phone is required' });
        }
        if (!address) {
            return res.send({ error: 'Address is required' });
        }

        // check if user already exists ?
        const existingUser = await userModel.findOne({ email })

        // if user already exists
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'User already registered, please login'
            })
        }

        // register user 
        const hashedPassword = await hashPassword(password);
        // save user in the database 
        const user = new userModel({
            name, email, password: hashedPassword, phone, address
        }).save()

        res.status(201).send({
            success: true,
            message: 'User registered successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registeration',
            error
        })
    }
}
