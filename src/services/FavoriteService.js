const FavoriteRepository = require('../repositories/FavoriteRepository');

class FavoriteService {
    constructor() {
        this.favoriteRepository = new FavoriteRepository;
    }

    async getFavorites(id) {
        const favorites = await this.favoriteRepository.getFavorites(id);
        return favorites;
    }

    async createFavorite(id, product_id) {
        const favorite = await this.favoriteRepository.createFavorite(id, product_id);
        return favorite;
    }

    async deleteFavorite(id, product_id) {
        const favorite = await this.favoriteRepository.deleteFavorite(id, product_id);
        return favorite;
    }
};

module.exports = FavoriteService;