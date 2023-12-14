const knex = require("../database/knex");

class FavoriteRepository {

    async getFavorites(id) {
        const favorites = await knex("favorite").where({ user_id: id });

        return favorites;
    }

    async createFavorite(id, dishes_id) {
        const favorite = await knex("favorite").insert({ user_id: id, dishes_id: dishes_id });

        return favorite;
    }

    async deleteFavorite(id, dishes_id) {
        const favorite = await knex("favorite").where({ user_id: id, dishes_id: dishes_id }).del();

        return favorite;
    }
};

module.exports = FavoriteRepository;