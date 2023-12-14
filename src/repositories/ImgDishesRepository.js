const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ImgDishesRepository {
  async findById(id) {
    const dishes = await knex("dishes").where({ id }).first();

    if (!dishes) {
      throw new AppError("Prato não existe!", 404);
    }

    return dishes;
  }

  async update({ id, image }) {

    const diskStorage = new DiskStorage();
    const dishes = await this.findById(id);
  

    if (!dishes) {
      throw new AppError("Prato não existe!", 404);
    }

    if (dishes.image) {
      await diskStorage.deleteFile(dishes.image);
    }

    const filename = await diskStorage.saveFile(image);
    dishes.image = filename;

    await knex("dishes").update({ image: filename }).where({ id });

    return dishes;
  }
};

module.exports = ImgDishesRepository;