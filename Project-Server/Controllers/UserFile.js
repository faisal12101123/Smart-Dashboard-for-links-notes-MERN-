const UserFile = require("../Models/UserFile");

exports.userFile = (req, res) => {
    
    //console.log(req.body);
    const { username, password } = req.body;
    
    //validate
    if ( !username || !password ) {
        return res.status(400).json({
            error: "Username and Password is required."
        });
    }
    
    //create user
    UserFile.create({username, password}, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).json({error: "User is already existed!"});
        }
        res.json(user);
    });

};
