const Food = require("./../../models/foodModel");


exports.getMenu = async (req, res) => {
  try{
    const menu = await Food.find({}) // pass an empty object to find everything
    res.status(200).json(menu) //Note that I changed items to menu instead of food

  }
  catch (error) {
    response.status(500).json({
      status: "error",
      error: error,
    
  })
}
}

exports.getCategory = async (req, res) => {
  try {
    const { foodCategory } = req.params;
    console.log(foodCategory);
    const category = await Food.find({ category: foodCategory });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  } finally {
    console.log(`returned categories`);
  }
};

exports.getFood = async (req, res) => {
  try{
    const food = await Food.findById(req.params.id)
    res.status(200).json(food)

  }
  catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
  })
}
}

exports.updateFood = async (request, response) => {
  try{
    const updatedFood = await Food.findByIdAndUpdate(request.params.id, {
      name: request.body.name,
      price: request.body.price,
      description: request.body.description,
      category: request.body.category,
    })
    response.status(200).json(updatedFood)
    
  }catch(error){
    console.log(error)
  }finally{
    console.log('Item Updated') //Correct api route.. or.. check if the correct state is being updated. 
  }
}

exports.deleteFood = async (req, res) => {
  try{
    const food = await Food.findByIdAndDelete(req.params.id)
  }
  catch (error){
    response.status(500).json({
      status: "error",
      error: error,
  })
}
}


exports.createFood = async (request, response) => {
  try {
    const newFood = await Food.create({
      name: request.body.name, // ------------
      price: request.body.price, 
      description: request.body.description,
      category: request.body.category,
    });

      response.status(200).json(newFood)
  } catch (error) {
    response.status(500).json({
      status: "error",
      error: error,
    });
  }
};

