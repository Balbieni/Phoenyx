// controllers/chatController.js
const Message = require('../models/Message');

// Enviar mensagem direta
exports.sendMessage = async (req, res) => {
  try {
    const { content, recipientId } = req.body;
    const message = await Message.create({
      content,
      sender: req.user.id,
      recipient: recipientId
    });

    res.status(201).json({ message: "Mensagem enviada", message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar mensagens entre dois usuários
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
