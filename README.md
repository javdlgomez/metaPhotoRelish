# Getting Started

This is a [Next.js](https://nextjs.org/) and [Express](https://expressjs.com/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`express-generator`](https://github.com/expressjs/generator).
 


First, install the required dependencies in their respective folders:

```bash
cd frontend
npm ci
# and
cd backend
npm ci
```
Now run the back and frontend servers respectively:

```bash
# backend 
npm run start
# frontend
npm run dev
```	

### Interact With API Server
Open [http://localhost:4000/externalapi/photos](http://localhost:4000/externalapi/photos) with your browser to access the REST API. This API shows a database obtained by a middleware filtering and enrichening process. 
The raw data is collected in the following endpoints:
- https://jsonplaceholder.typicode.com/users
- https://jsonplaceholder.typicode.com/albums
- https://jsonplaceholder.typicode.com/photos

You can filter the database by the following queries:
-  title: 
Finds any photo title that contains the value given to query parameter.
- album.title:
Finds any album title that contains the value given to the query parameter.
- album.user.email:
Finds any emails that are equal to the value given to the query parameter.
- limit:
Limits the quantity of database terms that are shown on the loaded page, it's set by default to 25.
- offset:
Offsets the starting database term by its query parameter, it's set by default to 0.
### Interact With The App Server 

Open [http://localhost:4000/externalapi/photos/:id](http://localhost:4000/externalapi/photos/1) with id going from 1 to 5k,  to access a specific photo filtered information from the database.


Open [http://localhost:3000](http://localhost:3000) with your browser to access the SPA MetaPhoto. This application lets you interact with the API with a practical graphical interface that shows the most usefull information and retains the same database filtering capabilities. You can navigate through the database pressing the Prev and Next Page buttons and access to the most relevant single photo information by interacting with the View button.

## WIP

We are currently finishing porting the API from Express to run on Next.js exclusively for a future [Vercel](https://vercel.com/) deployment.

## Dependencies

"daisyui": "^4.6.1",

"eslint": "^8",

"use-debounce": "^10.0.0"

"axios": "^1.6.7",

"cors": "^2.8.5",

"express-joi-validation": "^5.0.1",

"joi": "^17.12.1"

To learn more about Express, take a look at [Expressjs main Page.](https://expressjs.com/)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


