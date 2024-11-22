
// Chat Controllers
const sendMessage = async (req, res) => {
    try {
      const { content, recipientId } = req.body;
      const message = await Message.create({
        content,
        sender: req.user.id,
        recipient: recipientId,
      });
  
      res.status(201).json({ message: "Mensagem enviada", message });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getMessages = async (req, res) => {
    try {
      const messages = await Message.find({
        $or: [
          { sender: req.user.id, recipient: req.params.userId },
          { sender: req.params.userId, recipient: req.user.id },
        ],
      }).sort({ createdAt: 1 });
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Comment Controllers
  const addComment = async (req, res) => {
    try {
      const { content } = req.body;
      const tweet = await Tweet.findById(req.params.tweetId);
  
      if (!tweet) return res.status(404).json({ message: "Tweet não encontrado" });
  
      const comment = await Comment.create({
        content,
        author: req.user.id,
        tweet: tweet._id,
      });
  
      tweet.comments.push(comment._id);
      await tweet.save();
      res.status(201).json({ message: "Comentário adicionado", comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getComments = async (req, res) => {
    try {
      const comments = await Comment.find({ tweet: req.params.tweetId }).populate(
        "author",
        "username"
      );
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Tweet Controllers

  const createTweet = async (req, res) => {
    try {
      const { content, hashtags } = req.body;
  
      // Validação do conteúdo do tweet
      if (content.length > 280) {
        return res.status(400).json({ message: 'Tweet excede 280 caracteres' });
      }
  
      // Criação do tweet no banco de dados
      const tweet = await Tweet.create({
        content,
        author: req.user.id, // O ID do usuário autenticado
        hashtags,
      });
  
      res.status(201).json({ message: 'Tweet criado com sucesso!', tweet });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getTweets = async (req, res) => {
    try {
      const tweets = await Tweet.find()
        .sort({ createdAt: -1 })
        .populate("author", "username");
      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const likeTweet = async (req, res) => {
    try {
      const tweet = await Tweet.findById(req.params.id);
      if (!tweet) return res.status(404).json({ message: "Tweet não encontrado" });
  
      if (!tweet.likes.includes(req.user.id)) {
        tweet.likes.push(req.user.id);
      } else {
        tweet.likes = tweet.likes.filter(
          (userId) => userId.toString() !== req.user.id
        );
      }
  
      await tweet.save();
      res.status(200).json({ message: "Tweet curtido/descurtido", tweet });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const retweet = async (req, res) => {
    try {
      const tweet = await Tweet.findById(req.params.id);
      if (!tweet) return res.status(404).json({ message: "Tweet não encontrado" });
  
      const retweet = await Tweet.create({
        content: tweet.content,
        author: req.user.id,
        retweetFrom: tweet._id,
      });
  
      res.status(201).json({ message: "Retweet realizado", retweet });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // User Controllers
  const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate(
        "followers following",
        "username"
      );
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const followUser = async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
  
      if (!userToFollow) return res.status(404).json({ message: "Usuário não encontrado" });
  
      if (!currentUser.following.includes(userToFollow._id)) {
        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id);
      } else {
        currentUser.following = currentUser.following.filter(
          (id) => id.toString() !== userToFollow._id.toString()
        );
        userToFollow.followers = userToFollow.followers.filter(
          (id) => id.toString() !== currentUser._id.toString()
        );
      }
  
      await currentUser.save();
      await userToFollow.save();
      res.status(200).json({ message: "Ação de seguir/deixar de seguir realizada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Exporting all controllers
  module.exports = {
    sendMessage,
    getMessages,
    addComment,
    getComments,
    createTweet,
    getTweets,
    likeTweet,
    retweet,
    getUserProfile,
    followUser,
  };
  