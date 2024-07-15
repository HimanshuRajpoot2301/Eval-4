const Customer=require("../models/customer");
exports.getAllCustomers=async(req,res)=>{
    try {
        const customers=await Customer.findAll();
        res.jsons(customers)
    } catch (error) {
        res.status(500).json({error})
    }
};

exports.getCustomerById=async(req,res)=>{
    try {
        const customer=await Customer.findByPk(req.params.id);
        if(!customer)return res.status(404).json({message:"Customer not found"});
        res.json(customer)
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.createCustomer=async(req,res)=>{
    try {
        const customer=await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({error})
    }
}