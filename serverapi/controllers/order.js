import order from "../models/order";


export const getOrders = async (req, res) => {
 
    try {
        const orders = await order.find()
        return res.json(orders)
    } catch (error) {
        
    }
}

export const getOrder = async (req, res) => {
    try {
        // console.log(req.params.id);
        const orders = await order.findOne({_id: req.params.id})
        return res.json(orders)
    } catch (error) {
        
    }
}

export const delOrder = async (req, res) => {
   
    // console.log(req.params.id);
    try {
        const orders = await order.findOneAndDelete({_id: req.params.id})
       return res.json(orders)

    } catch (error) {
        
    }
}

export const addOrder = async (req, res) => {
    try {
        //console.log(req.body);
        
    }
    catch (err){
        console.log(err);
        return res.status(400).send("Error: try again");
    }   
};


export const editOrder = async (req, res) => {
    try {
        const orders = await order.findOneAndUpdate({_id: req.params.id}, req.body)
        return res.json(orders)
    } catch (error) {
        
    }
}
