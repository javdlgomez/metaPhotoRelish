const axios = require("axios");

/**
 * The function `primerIncisoGet` retrieves data from three different API endpoints, combines the data,
 * and returns a JSON response.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request parameters, and request body. It is used
 * to retrieve data from the request, such as the `id` parameter in this case.
 * @param res - The `res` parameter is the response object that is used to send the HTTP response back
 * to the client. It is an object that contains methods and properties for handling the response, such
 * as setting the status code and sending the response data.
 */

const primerIncisoGet = async (req, res) => {
  try {
    const usersPromise = axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.data);
    const albumsPromise = axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((data) => data.data);
    const photosPromise = axios
      .get("https://jsonplaceholder.typicode.com/photos/" + req.params.id)
      .then((data) => data.data);

    let usersResponse = await usersPromise;
    let albumsResponse = await albumsPromise;
    let photosResponse = await photosPromise;
    let photopage = photosResponse;
    let albumpage = albumsResponse.find((album) => {
      return album.id === photopage.albumId;
    });
    let userpage = usersResponse.find((user) => {
      return albumpage.userId === user.id;
    });
    delete albumpage.userId;
    delete photopage.albumId;

    albumpage.user = userpage;
    photopage.album = albumpage;
    res.status(200).json(photopage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = primerIncisoGet;
