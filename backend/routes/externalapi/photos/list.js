const axios = require("axios");

/**
 * The function `segundoIncisoGet` is an asynchronous function that retrieves data from three different
 * APIs, performs filtering and sorting operations on the data based on the query parameters, and
 * returns the filtered data as a response.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made to the server.
 * @param res - The `res` parameter is the response object that is used to send the HTTP response back
 * to the client.
 */

const segundoIncisoGet = async (req, res) => {
  try {
    const usersPromise = axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.data);

    const albumsPromise = axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((data) => data.data);

    const photosPromise = axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((data) => data.data);

    let usersResponse = await usersPromise;
    let albumsResponse = await albumsPromise;
    let photosResponse = await photosPromise;

    usersResponse = usersResponse.reduce((acc, user) => {
      acc[user.id] = user;

      return acc;
    }, []);

    albumsResponse = albumsResponse.reduce((acc, album) => {
      acc[album.id] = album;
      album.user = usersResponse[album.userId];

      delete album.userId;

      return acc;
    }, []);

    photosResponse.forEach((photo) => {
      photo.album = albumsResponse[photo.albumId];

      delete photo.albumId;
    });

    let arregloFiltrado = photosResponse;

    if (req.query.title !== "") {
      arregloFiltrado = arregloFiltrado.filter((photo) =>
        photo.title.includes(req.query.title)
      );
    }

    if (req.query["album.title"] !== "") {
      arregloFiltrado = arregloFiltrado.filter((photo) =>
        photo.album.title.includes(req.query["album.title"])
      );
    }

    if (req.query["album.user.email"] !== "") {
      arregloFiltrado = arregloFiltrado.filter((photo) =>
        photo.album.user.email.includes(req.query["album.user.email"])
      );
    }

    //TODO: Make another implementation of the slice algorithm

    arregloFiltrado = arregloFiltrado.slice(
      req.query.offset,
      req.query.limit + req.query.offset
    );

    res.status(200).json(arregloFiltrado);
  } catch (error) {
    console.log(error);

    res.status(500).json(err);
  }
};

module.exports = segundoIncisoGet;
