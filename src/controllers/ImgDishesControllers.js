
const ImageProductRepository = require("../repositories/ImageProductRepository");

class ImgDishesControllers {
  async update(request, response) {
    const id = request.params.id;
    const image = request.file.filename;

    const imageProductRepository = new ImageProductRepository();

    const product = await imageProductRepository.update({ id, image });

    return response.json(product);
  }
}

module.exports = ImgDishesControllers;
