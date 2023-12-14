const knex = require("../database/knex");
  
  class UserRepository {
    async findByEmail(email) {
      const user = await knex("SELECT * FROM users WHERE email = (?)", [email]);

      return user;
    }

    async create({name, email, password}) {
      const userId = await knex(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
         [name, email, password]
       );

       return { id: userId };
    }
    
  }

  module.exports = UserRepository;