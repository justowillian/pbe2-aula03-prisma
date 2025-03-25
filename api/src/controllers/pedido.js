const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const listarPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos.' });
  }
};


const create = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
};

const read = async (req, res) => {
  const { clienteId, itens, total } = req.body;
  try {
    const novoPedido = await prisma.pedido.create({
      data: {
        clienteId,
        itens,
        total,
      },
    });
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { clienteId, itens, total } = req.body;
  try {
    const pedidoAtualizado = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: {
        clienteId,
        itens,
        total,
      },
    });
    res.status(200).json(pedidoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido.' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pedido.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir pedido.' });
  }
};

module.exports = {
  create,
  read,
  update,
  remove
};