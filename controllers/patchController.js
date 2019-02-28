import jsonpatch from 'jsonpatch';

class patchController {
  /**
   * @description - this method patch a req
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - status message and response
   */
  static async patch(req, res) {
    try {
      const { patchRequest, patchObject } = req.body;
      const data = jsonpatch.apply_patch(patchRequest, patchObject);
      return res.send({ status: 200, data, message: 'Success' });
    } catch (err) {
      return res.status(500).send({ status: 500, message: 'Error encounter while processing your request' });
    }
  }
}

export default patchController;
