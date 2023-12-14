const DishesService = require("../services/DishesService");   
const DishesRepository = require("../repositories/ProductRepository");


class DishesController { 


    async create(request, response){    
        const { name, category, description, prices, ingredients} = request.body;


        const dishesRepository = new dishesRepository();
        const dishesService = new dishesService(dishesRepository);

        const dishes = await dishesService.executeCreate({ name, category, description, prices, ingredients});

        return response.status(201).json(dishes);

    }


    async update(request, response){    
        const {id} = request.params;
      
        const { name, category, description, prices, ingredients } = request.body;

        const dishesRepository = new dishesRepository();  
        const dishesService = new dishesService(dishesRepository); 

         await dishesService.executeUpdate({ id, name, category, description, prices, ingredients });

        return response.status(201).json("Produto atualizado com sucesso!");
    }

    async delete(request, response){
        const { id } = request.params;

        const dishesRepository = new dishesRepository();  
        const dishesService = new dishesService(dishesRepository); 

        await dishesService.executeDelete(id);

        return response.status(201).json();
    }

    async showAll(request, response){
        const dishesRepository = new dishesRepository();  
        const dishesService = new dishesService(dishesRepository); 

        const dishes = await dishesService.executeFindAll();

        return response.status(200).json(dishes);
    }

    async showOne(request, response){
        const { id } = request.params;

        const dishesRepository = new dishesRepository();  
        const dishesService = new dishesService(dishesRepository); 

        const dishes = await dishesService.executeShowOne(id);

        return response.status(200).json(dishes);
    }

};
    module.exports = DishesController;