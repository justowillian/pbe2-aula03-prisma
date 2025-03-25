const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { numero, clienteId } = req.body;
    try {
        const novoTelefone = await prisma.telefone.create({
            data: {
                numero,
                clienteId,
            },
        });
        res.status(201).json(novoTelefone);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar telefone.' });
    }
};

const read = async (req, res) => {
    try {
        const telefones = await prisma.telefone.findMany();
        res.status(200).json(telefones);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar telefones.' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { numero, clienteId } = req.body;
    try {
        const telefoneAtualizado = await prisma.telefone.update({
            where: { id: parseInt(id) },
            data: {
                numero,
                clienteId,
            },
        });
        res.status(200).json(telefoneAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar telefone.' });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.telefone.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir telefone.' });
    }
};

module.exports = {
    create,
    read,
    update,
    remove
};