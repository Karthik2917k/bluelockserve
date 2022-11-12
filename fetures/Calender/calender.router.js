const express = require("express");
const Post = require("./calender.model");
const server = express();

server.post("/", async (req, res) => {
  let { date, text, image } = req.body;
  try {
    let post = await Post.create({ date, text, image });
    res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
server.get("/", async (req, res) => {
  try {
    let post = await Post.find();
    res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
server.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  if (_id.length === 24) {
    const post = await Post.findById(_id);
    if (post) {
      let Delete = await Post.deleteOne({ _id });
      res.status(200).send(`post is deleted successfully`);
    } else {
      res.status(401).send("Id Not found");
    }
  } else {
    res.status(401).send("Please enter a valid ID");
  }
});
module.exports = server;
