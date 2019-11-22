const Post = require('../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    req.body.post = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.post.title,
        description: req.body.post.description,
        content: req.body.post.content,
        imageUrl: url + '/images/' + req.file.filename


    });
    post.save().then(() => {
        res.status(201).json({ message: 'Post saved successfully' }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    });

}

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then((post) => {
        res.status(200).json(post);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });

}

exports.modifyPost = (req, res, next) => {
    let post = new Post({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);
        post = {
            _id: req.params.id,
            title: req.body.post.title,
            description: req.body.post.description,
            content: req.body.post.content,
            imageUrl: url + '/images/' + req.file.filename,

        }
    } else {
        post = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            imageUrl: req.body.imageUrl,

        };
    }

    Post.updateOne({ _id: req.params.id }, post).then(() => {
        res.status(201).json({
            message: 'Post updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
            Post.deleteOne({ _id: req.params.id }).then(() => {
                res.status(200).json({
                    message: 'Post Deleted successfully'
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        });
    });

}

exports.getAllPosts = (req, res, next) => {
    Post.find().then((posts) => {
        res.status(200).json(posts);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
}