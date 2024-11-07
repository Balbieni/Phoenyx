// controllers/userController.js
const User = require('../models/User');

// Visualizar perfil do usuário
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers following', 'username');
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seguir ou deixar de seguir usuário
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) return res.status(404).json({ message: "Usuário não encontrado" });

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    } else {
      currentUser.following = currentUser.following.filter(id => id.toString() !== userToFollow._id.toString());
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUser._id.toString());
    }

    await currentUser.save();
    await userToFollow.save();
    res.status(200).json({ message: "Ação de seguir/deixar de seguir realizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
