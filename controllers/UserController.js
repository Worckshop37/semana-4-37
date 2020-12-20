const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const tokenServices = require('../services/token')

exports.login = async (req, res, next) => {
    try {
        const user = await models.Usuario.findOne({ where: { email: req.body.email } });
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, Usuario.password);
            if (passwordIsValid) {
                const token = await tokenServices.encode(user);
                res.status(200).send({
                    auth: true,
                    tokenReturn: token
                })
            } else {
                res.status(401).json({
                    error: 'Usuario y/o contraseña invalidos'
                })
            }
        } else {
            res.status(404).json({
                error: 'Usuario y/o contraseña invalidos'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        const newUser = await models.Usuario.findOne({ where: { email: req.body.email } });
        if (!newUser) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await models.Usuario.create(req.body);
            res.status(201).send({
                status: 'Usuario creado correctamente!',
                user: user
            })
        } else {
            res.status(405).json({
                error: 'Usuario ya registrado.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.list = async (req, res, next) => {
    try {
        const user = await models.Usuario.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.update = async(req, res, next) => {
    try {
        const user = await models.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            const user = await models.Usuario.update({name: req.body.name},
            {
                where:{
                    email: req.body.email
                },
            });
            res.status(200).json(user);
        }else{
            res.status(404).send({
                message: 'Usuario no existente.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};