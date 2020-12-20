const models = require('../models');

exports.list = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.findAll();
        if (articulo) {
            res.status(200).json(articulo);
        } else {
            res.status(404).send({
                message: 'No hay categorias existentes.'
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
        const articuloExistente = await models.Articulo.finOne({where: {codigo: req.body.codigo}});
        if(!articuloExistente){
            const nuevoArticulo = await models.Articulo.create(req.body);
            res.status(200).json(nuevoArticulo);
        }else{
            res.status(406).send({
                message: 'Articulo existente.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.update({ 
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo
        },
            {
                where: {
                    id: req.body.id
                },
            });
        res.status(200).json(articulo);
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};

exports.activate = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.update({estado: 1}, {
            where: { id: req.body.id},
        });
        res.status(200).send({ message: 'El articulo ha sido activado.'});
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};

exports.deactivate = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.update({estado: 0}, {
            where: { id: req.body.id},
        });
        res.status(200).send({ message: 'El articulo ha sido desactivado.'});
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};