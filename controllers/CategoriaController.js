const models = require('../models');

exports.list = async (req, res, next) => {
    try {
        const categoria = await models.Categoria.findAll();
        if (categoria) {
            res.status(200).json(categoria);
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
        const nombreExistente = await models.Categoria.findOne({where: {nombre: req.body.nombre}});
        if(!nombreExistente){
            const nuevaCategoria = await models.Categoria.create(req.body);
            res.status(200).json({categoria: nuevaCategoria, status: 'Categoria creada correctamente.'});
        }else{
            res.status(406).send({
                message: 'Categoria existente.'
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
        const categoria = await models.Categoria.update({ nombre: req.body.nombre, descripcion: req.body.descripcion },
            {
                where: {
                    id: req.body.id
                },
            });
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};

exports.activate = async (req, res, next) => {
    try {
        const categoria = await models.Categoria.update({estado: 1}, {
            where: { id: req.body.id},
        });
        res.status(200).send({ message: 'La categoria ha sido activada.'});
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};

exports.deactivate = async (req, res, next) => {
    try {
        const categoria = await models.Categoria.update({estado: 0}, {
            where: { id: req.body.id},
        });
        res.status(200).send({ message: 'La categoria ha sido desactivada.'});
    } catch (error) {
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};