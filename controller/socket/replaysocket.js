const commentModel = require("../../model/commentModel");
jwt = require("../../helpers/jwt");

module.exports = {
  // comment using socket io

  async chatMessages(replay) {
    const io = replay;
    io.use(jwt.verifySocketUserToken);
    io.on("connection", (socket) => {
      socket.on("replay", async (replay) => {
        let newreplay = {
          replayuserId: socket.jwtUSER._id,
          message: replay.message,
          date: Date.now(),
        };
        commentModel
          .updateOne(
            { _id: replay.commentId },
            { $push: { replay: { $each: [newreplay], $position: 0 } } }
          )
          .then(async (data) => {
            let replay = await commentModel
              .find({ postId: socket?.handshake?.query?.id })
              .populate("userId")
              .populate("replay.replayuserId")
              .sort({ date: -1 });
            io.emit("new-replay", replay);
          });
      });
    });
  },
};
