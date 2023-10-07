const User = require('../models/user.model');

exports.findAll = async(req, res) => {
    console.log("Find all user's products")
    
    try{
     const results = await User.find({},{ username: 1, products:1 });
     res.status(200).json({ status: true, data: results});
     console.log("Success in reading all user's products");
    } catch (err) {
     res.status(400).json({ status: false, data: err });
     console.log("Problem in reading user's products");
    }
}

exports.findOne = async (req, res) =>{
    const username = req.param.username;
    console.log("find the user's with username", username);

    try{
        const results = await User.findOne({username: username}, {username:1, products:1});
        res.status(200).json({status:true, data:results})
    } catch(err){
        res.status(400).json({status:false, data: err});
        console.log("Problem in reading user's products", username);
    }
}


//edo ousiastika den kanoume create giati o user mas iparxei idi... ousiastika bazoume proionta diladi kanoume update se ena sygkekrimeno document tis basis mas,,,
//auto ton proionton
exports.addProduct = async (req, res) =>{
    const username = req.body.username;
    const products = req.body.products;
    
    console.log("Insert product to username", username);

    try{
        const results = await User.updateOne(
            {username: username },
            {
                $push: {
                    products:products
                }
            }
        );

        res.status(200).json({status:true, data:results});
        console.log("Success in updating the products");

    }catch(err){
        res.status(400).json({status:false, data:err});
        console.log("Problem in saving product", username)
    }
}

exports.updateProduct = async(req, res) => {
    const username = req.params.username;
    const product_id = req.body.product._id;
    const product_quantity = req.body.product.quantity;

    console.log("Update product for username", username);
    
    try{
        const results = await User.updateOne({
            username: username, "products._id": product_id

        },
        {
            //edo to dollario to xrisimopoioume giati etsi xrisimopoiei i mongo db thn entoli gia na kanei update ena pedio...
            $set:{
                //to dollario edo xrisimopoieite gia na paei na psaksei sigkekrimena stin thesi 3 tyo subdocument diladi tou sigkekrimenoy proiontos... 3 thesi poy einai to quantity kai paei kai allazei to sigkekrimeno pedio
                "products.$.quantity": product_quantity
            }
        })
        res.status(200).json({status:true, data:results});
        console.log("Success in updating the product's details", product_quantity);

    }catch(err){
        res.status(400).json({status:false, data:err});
        console.log("Problem in updating product for user", username)
    }

}

exports.deleteProduct = async(req, res)=> {
    const username = req.params.username;
    const product = req.params.products;

    console.log("Deleting product from the user with username", username)

    try{

        const results = await User.updateOne(
            {username: username},
            {
                $pull: {
                    products:{ product: product}
                }

            }
        );

        res.status(200).json({status:true, data:results});
        console.log("Success in deleting the products", this.deleteProduct);
    }catch(err){
        res.status(400).json({status:false, data:err});
        console.log("problem in deleting the product from the user with username", username);
    }
}

exports.stats1 = async(req, res) =>{
    const stats1 = req.params
    console.log("for all users read the sum by product and count");

    try{
        const results = await User.aggregate(
            [
                {
                    $unwind: "$product"
                },
                {
                    $project :{
                        id:1,
                        username:1,
                        products:1
                    }
                },
                {
                    $group: {
                        _id:{
                            username: "$username",
                            product: "$products.product"
                        },
                        totalAmount:{
                            $sum:{
                                $multiply: [ "$products.cost", "products.quantity"]
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]
            
        )
        res.status(200).json({status:true, data:results});
        console.log("Success in stats1");
        //gia kathe subdocument pou exo dimiourgei ena ksexoristo document to $unwind
        //to $project ua svisei ola ta upoloipa pedia kai tha kratisei mono auta pou anaferontai mesa tou diladi id ,username, products
        //to $group tha omoadopoiisei se aneksartita documents ta paidia pou exei epileksei diladi ana username kai ana products.
        //to totalamount tha vriskei to athroisma ton agoron tou sygkekrimenou proiontos kathos kai ta xrhmata pou exoun dapanithei gia thn kathe agora
        //to count fernei mono to sum to opoio exei upologistei 
    }catch(err){
        res.status(400).json({status:false, data:err});
        console.log("Problem in finding the sum and count of the products for the use with username", username)

    }
}
