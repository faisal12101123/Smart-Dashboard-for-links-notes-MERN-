const Post = require("../Models/AddressPost");
const { requireSignin } = require("./Auth");

exports.create = (req, res) => {
    
    //console.log(req.body);
    const { title, address, user } = req.body;
    
    //validate
    if ( !title || !address ) {
        return res.status(400).json({
            error: "Title and Website Address is required."
        });
    }
    
    //create post
    Post.create({title, address, user}, (err, post) => {
        if (err) {
            console.log(err)
            res.status(400).json({error: "Duplicate Title"});
        }
        res.json(post);
    });

};


exports.linkList = (req, res) => {
    Post.find({user:req.user.username})
        .limit(20)
        .sort({createdAt: -1})
        .exec((err, addressposts) => {
        if (err) console.log(err);
        res.json(addressposts);
    }); 
};

exports.read = (req, res) => {
    const {_id} = req.params;
    Post.findOne({_id})
        .exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    }); 
};

exports.update = (req, res) => {
    const {_id} = req.params;
    const {title, address, user} = req.body;
    Post.findOneAndUpdate({_id}, {title, address, user}, {new: true})
        .exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    }); 
};

exports.remove = (req, res) => {
    const {_id} = req.params;
    Post.findOneAndRemove({_id})
        .exec((err, post) => {
        if (err) console.log(err);
        res.json({
            message: "Post Deleted"
        });
    }); 
};

