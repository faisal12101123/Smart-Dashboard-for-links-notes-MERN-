const Post = require("../Models/Post");
const slugify = require("slugify");

exports.create = (req, res) => {
    
    //console.log(req.body);
    const { title, content, user } = req.body;
    const slug = slugify(title);
    
    //validate
    if ( !title || !content ) {
        return res.status(400).json({
            error: "Title and Content is required."
        });
    }
    
    //create post
    Post.create({title, content, user, slug}, (err, post) => {
        if (err) {
            console.log(err)
            res.status(400).json({error: "Duplicate Title"});
        }
        res.json(post);
    });

};


exports.noteList = (req, res) => {
    Post.find({user:req.user.username})
        .limit(20)
        .sort({createdAt: -1})
        .exec((err, posts) => {
        if (err) console.log(err);
        res.json(posts);
    }); 
};


exports.read = (req, res) => {
    const {slug} = req.params;
    Post.findOne({slug})
        .exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    }); 
};

exports.update = (req, res) => {
    const {slug} = req.params;
    const {title, content, user} = req.body;
    Post.findOneAndUpdate({slug}, {title, content, user}, {new: true})
        .exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    }); 
};

exports.remove = (req, res) => {
    const {slug} = req.params;
    Post.findOneAndRemove({slug})
        .exec((err, post) => {
        if (err) console.log(err);
        res.json({
            message: "Post Deleted"
        });
    }); 
};
