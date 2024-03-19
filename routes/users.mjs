import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../domain/ModelConnection.mjs'
import authVerification from '../middleware/authVerification.mjs';

export const users = express.Router();

users.get('/api/v1/get-all', authVerification('USER'), asyncHandler(
    async(req, res) => {
        const users = await User.findAll();
        res.send(users);
        console.log('existing data from the db: ', users.map(user => {
            return {
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        }
    ))
    }
))

users.get('/api/v1/get-user/:id', authVerification('USER'), asyncHandler(
    async(req, res) => {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404);
            throw `employee with id ${req.params.id} doesn't exist`
        }
        res.send(user);
        console.log(`concerning your get request to id: ${req.params.id} user is: `, 
            {
                name: user.dataValues.name,
                email: user.dataValues.email,
                phone: user.dataValues.phone
            }
        
        )
    }))
    
users.post('/api/v1/add-user', authVerification('USER'), asyncHandler(
    async(req, res) => {
        const {id, name, email, phone} = req.body;
        const existingUser = await User.findOne({where: {id}})
        if (existingUser) {
            throw `user with id: ${id} already exists`
        }
        const user = await User.create({
            id, name, email, phone
        });
        
    res.send(user);
    console.log(`user with id: ${id} was added: ` , {
                name: user.dataValues.name,
                email: user.dataValues.email,
                phone: user.dataValues.phone
    });
    }
))