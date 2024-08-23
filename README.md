
# Memories app (Mern stack)

The app is based on [JS Mastery tutorial MERN stack tutorial](https://www.youtube.com/watch?v=VsUzmlZfYNg).

## Lessons Learned

The video tutorial is however severly outdated. Peak with enthusiasm, I take it as a challenge to update all packages and made my own adjustments-- adding a nice touch to the app. In particular, I use React router v6, Redux toolkit, tailwindCSS, latest Material UI, React Dropzone for uploading files, created my own tags component, and more stuff under the hood. 

Overall, I am highly satisfied with the outcome and really enjoyed the journey in building this app.


## Features

- Can Sign in and Sign up
- Can Create, edit, delete, and like a post
- Intuitive and reactive UI
- Mobile responsive


## Tech Stack

**Client:** React, React Router, React Dropzone, Styled Components, Redux, TailwindCSS, Material UI

**Server:** Node, Express


## Demo

[Demo link](https://itumulak-mern-stack.vercel.app/)


## Previewing locally

#### Clone the repository.
```
git clone https://github.com/itumulak/memories-mern-stack.git
```

#### Install the packages.

```bash
  cd ./client &&  npm install
  cd ./server && npm install
```

#### Create and configure the `.env` files for both client and server.

#### For the server
```
cp -a .env.exampe .env
```
Replace the `PORT`, `CONNECTION_URL` with your mongo DB URL, and `JWT_SERET`.

#### For the client
```
cp -a .env.exampe .env
```
Replace the `VITE_SERVER_URL` value. For example, if you assign port `5000` in the server .env, then the server url is `http://localhost:5000`.

#### Run the app.
```
cd ./server && npm run start
cd ./client && npm run dev
```

    
## License

[MIT](https://choosealicense.com/licenses/mit/)

