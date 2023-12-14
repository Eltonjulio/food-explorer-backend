const FavoriteService = require('../services/FavoriteService');

class FavoriteController {
    constructor() {
        this.favoriteService = new FavoriteService;
    }

    async getFavorites(req, res) {
        const { id } = req.params;
        const favorites = await this.favoriteService.getFavorites(id);
        return res.json(favorites);
    }


    async createFavorite(req, res) {
        const { id } = req.params;
        const { product_id } = req.body;
        const favorite = await this.favoriteService.createFavorite(id, product_id);
        return res.json(favorite);
    }

    async deleteFavorite(req, res) {
        const { id } = req.params;
        const { product_id } = req.body;
        const favorite = await this.favoriteService.deleteFavorite(id, product_id);
        return res.json(favorite);
    }


};

module.exports = FavoriteController;
    