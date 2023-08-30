import user from "../models/user";


export const getUsers = async (req, res) => {
    console.log("Hello");
    try {
        const users = await user.find()
        return res.json(users)
    } catch (error) {
        
    }
}

export const getUser = async (req, res) => {
    try {
        // console.log(req.params.id);
        const users = await user.findOne({_id: req.params.id})
        return res.json(users)
    } catch (error) {
        
    }
}

export const delUser = async (req, res) => {
    console.log("Hello");
    // console.log(req.params.id);
    try {
        const users = await user.findOneAndDelete({_id: req.params.id})
       return res.json(users)

    } catch (error) {
        
    }
}

export const AddUser = async (req, res) => {
    try {
        //console.log(req.body);
        const { name, email, password } =  req.body;
        if (!name) return res.status(400).send("Name is required");
        if(!password || password.length < 5) {
            return res.status(400).send("Password is required and should be min 5 characters long");
        }   
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email is already taken by some other user");

        
        /* hash passsword */
        const hashedPassword = await hashPassword(password);

        /* register new user */
        const user = new User({
                name,
                email,
                password: hashedPassword,
        });
        await user.save();
        
        //console.log("New user created:", user);
        return res.json({ ok: true });
    }
    catch (err){
        console.log(err);
        return res.status(400).send("Error: try again");
    }   
};

export const editUser = async (req, res) => {
    try {
        const users = await user.findOneAndUpdate({_id: req.params.id}, req.body)
        return res.json(users)
    } catch (error) {
        
    }
}
