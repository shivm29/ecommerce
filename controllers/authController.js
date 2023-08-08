// This file contains the functions/controllers  related to authentication and are called when user is on any authentication related route like /register or /login
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken';

// POST || Register

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = await req.body

        // validation messages 
        if (!name) {
            return res.send({ message: 'Name is required' });
        }
        if (!email) {
            return res.send({ message: 'Email is required' });
        }
        if (!password) {
            return res.send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' });
        }

        if (!address) {
            return res.send({ message: 'Address is required' });
        }

        // check if user already exists ?
        const existingUser = await userModel.findOne({ email })

        // if user already exists
        if (existingUser) {
            return res.status(200).send({
                success: false,
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

// POST || Login 

export const loginController = async (req, res) => {
    try {
        const { email, password } = await req.body;

        if (!email) return res.status(404).send({ error: 'Invalid email or password' })
        if (!password) return res.status(404).send({ error: 'Invalid email or password' })

        const existingUser = await userModel.findOne({ email })

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User do not exist register to signin'
            })
        }

        const match = await comparePassword(password, existingUser.password)

        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // JWT token  
        const token = await JWT.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.status(201).send({
            success: true,
            message: 'Logged in successfully',
            user: {
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                address: existingUser.address
            },
            token,
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}