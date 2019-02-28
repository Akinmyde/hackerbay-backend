import cloudinary from '../config/cloudinary';
import { decode } from '../helpers';

class thumbnailController {
  /**
   * @description - this method generate a 50X50 thumbnail
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - status message and response
   */
  static async thumbnail(req, res) {
    try {
      const { imageUrl } = req.body;
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const { userName } = decodedToken;
      const generatedThumbnail = await cloudinary.v2.uploader.upload(imageUrl, {
        resource_type: 'image',
        public_id: `Hackerbay/${userName}`,
        overwrite: true,
        transformation: [{ width: 50, height: 50, crop: 'thumb' }],
      });
      // eslint-disable-next-line camelcase
      const { width, height, secure_url } = generatedThumbnail;
      const data = { width, height, secure_url };
      return res.send({ status: 200, data, message: 'Success' });
    } catch (err) {
      return res.status(500).send({ status: 500, message: 'Error encounter while processing your request' });
    }
  }
}

export default thumbnailController;
