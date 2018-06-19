const mongoose = require("mongoose");
const Comment = require("../schema/comment");

exports.get_all_comments = (req, res, next) => {
  
  Comment.find()
  .select("email msg _id createdAt")
  .exec()
  .then(docs => {
    res.status(200).json({
      
      comments: docs.map(doc => {
          const {_id, email, msg, createdAt}=doc
          return {
            _id,
            email,
            msg,
            createdAt,
            request: {
              type: "GET",
              url: `http://${req.headers.host}/comments${_id}`
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create_comment = (req, res, next) => {
  const { email, msg } = req.body;
  if (!email || !msg) {
    return res.status(400).json({
      message: 'Missing Email or Message!'
    });
  }
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    email,
    msg
  });
  return comment.save()
    .then(result => {
      
      const { email, msg, _id, createdAt } = result
      res.status(201).json({
        message: "Comment stored",
        createdComment: { _id, email, msg, createdAt },
        request: {
          type: "GET",
          url: `http://${req.headers.host}/comments/${_id}`
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.get_comment = (req, res, next) => {
  
  Comment.findById(req.params.commentId)
    .exec()
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          message: "Comment not found"
        });
      }
      res.status(200).json({
        comment,
        request: {
          type: "GET",
          url: `http://${req.headers.host}/comments`
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_comment = (req, res, next) => {
  
  Comment.findOneAndRemove({ _id: req.params.commentId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Comment Removed Successfuly",
        request: {
          type: "POST",
          url: `http://${req.headers.host}/comments`,
          body: { email: "some@mail.com", msg: "String" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
