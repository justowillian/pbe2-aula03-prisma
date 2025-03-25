const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const cliente = await prisma.cliente.create({
        data: req.body
    });
    res.status(201).json(cliente).end();
}

const read = async (req, res) => {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
}

const update = async (req, res) => {
    try {
        const cliente = await prisma.cliente.update({
            data: req.body,
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(202).json(cliente).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const remove = async (req, res) => {
    try {
        const cliente = await prisma.cliente.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(204).json(cliente).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}