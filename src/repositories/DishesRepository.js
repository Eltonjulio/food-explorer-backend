
const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class DishesRepository {
   
    
    async findByName(name) {
        const dishes = await knex("dishes").where({ name }).first();
        return dishes;
    }

    async create({name, category, description, prices, ingredients}) {
        const dishes = await knex("dishes").insert({
            name,
            category,
            description,
            prices
        })

        const dishes_id = dishes[0];

        

        const ingredientsInsert = ingredients.map(name => ({
            dishes_id,
            name,
        }));

        await knex("ingredients").insert(ingredientsInsert);

        await knex("dishes").where({ id: dishes_id }).first();

        const  dishesInfos = await knex("dishes").where({ id: dishes_id }).first();

        return dishesInfos;
      
    }

    async findById(id) {
        const dishes = await knex("dishes").where({ id }).first();
        return dishes;
    }
    
    
    async updated({ id, name, category, description, prices, ingredients }) { 
        const dishes = await this.findById(id);

        if(!dishes){
            throw new AppError("Este prato não existe", 401);
        }

        const dishesExists = await this.findByName(name);

        if(dishesExists && dishesExists.id !== dishes.id){
            throw new AppError("Já existe um prato com este nome", 401);
        }
        

        name = name ?? dishes.name;
        category = category ?? dishes.category;
        description = description ?? dishes.description;
        prices = prices ?? dishes.prices;
        ingredients = ingredients ?? dishes.ingredients;
        

       const dishesUpdated = await knex("dishes").where({ id }).update({
            name,
            category,
            description,
            prices
          
        });

        const dishes_id = id;

        await knex("ingredients").where({ dishes_id }).del();

        const ingredientsInsert = ingredients.map(name => ({        
            dishes_id,
            name,
        }));

        await knex("ingredients").insert(ingredientsInsert);

       return dishesUpdated;

    }

    async delete(id) {
        await knex("dishes").where({ id }).del();
    }

    async index() {
        const dishes = await knex("dishes").select("*");
        const ingredients = await knex("ingredients").select("*")
        

        return dishes.map(dishes => {
            const dishesIngredients = ingredients.filter(ingredient => ingredient.dishes_id === dishes.id);
            return {
                ...dishes,
                ingredients: dishesIngredients,
            };
        });                         
        }   
    
    
    async show(id) {
        const dishes = await knex("dishes").select("*").where({ id }).first();
        const ingredients = await knex("ingredients").select("*").where({ dishes_id: id });

        return {
            ...dishes,
            ingredients
        }                         
        } 


    
        
    }


module.exports = DishesRepository;