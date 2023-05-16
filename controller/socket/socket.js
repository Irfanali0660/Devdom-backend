const commentModel = require("../../model/commentModel");

jwt = require("../../helpers/jwt");

module.exports = {
  // comment using socket io

  async chatMessages(io_liveChats) {
    const io = io_liveChats;
    io.use(jwt.verifySocketUserToken);
    io.on("connection", (socket) => {
      socket.on("message", async (message) => {
        const newComment = new commentModel({
          postId: socket?.handshake?.query?.id,
          userId: socket.jwtUSER._id,
          comment: message,
          date: Date.now(),
        });
        (await newComment.save()).populate("userId").then(async (data) => {
          let message = await commentModel
            .find({ postId: socket?.handshake?.query?.id })
            .populate("userId")
            .populate("replay.replayuserId")
            .sort({ date: -1 });
          io.emit("new-message", message);
        });
      });
    });
  },
};
