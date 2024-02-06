import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {

        const title = req.nextUrl.searchParams.get('title') ?? ""
        const limit = req.nextUrl.searchParams.get('limit') ?? 25
        const user = req.nextUrl.searchParams.get('album.user.email') ?? ""
        const album = req.nextUrl.searchParams.get('album.title') ?? ""
        const offset = req.nextUrl.searchParams.get('offset') ?? 0

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

        usersResponse = usersResponse.reduce((acc: any[], user: any) => {
            acc[user.id] = user;

            return acc;
        }, []);

        albumsResponse = albumsResponse.reduce((acc: any[], album: any) => {
            acc[album.id] = album;
            album.user = usersResponse[album.userId];

            delete album.userId;

            return acc;
        }, []);

        photosResponse.forEach((photo: any) => {
            photo.album = albumsResponse[photo.albumId];

            delete photo.albumId;
        });

        let arregloFiltrado = photosResponse;

        if (title !== "") {
            arregloFiltrado = arregloFiltrado.filter((photo: any) =>
                photo.title.includes(title)
            );
        }

        if (album !== "") {
            arregloFiltrado = arregloFiltrado.filter((photo: any) =>
                photo.album.title.includes(album)
            );
        }

        if (user !== "") {
            arregloFiltrado = arregloFiltrado.filter((photo: any) =>
                photo.album.user.email.includes(user)
            );
        }

        //TODO: Make another implementation of the slice algorithm

        arregloFiltrado = arregloFiltrado.slice(
            offset,
            Number(limit) + Number(offset)
        );

        return NextResponse.json(arregloFiltrado)
    } catch (error) {
        console.log(error);

        return NextResponse.json(error)
    }
}