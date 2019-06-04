# coding-monads-starter

## project sructure

- ./client - frontend side
- ./server - backend side

### to run project

1. npm run install:all // it will install dependencies inside root and client folder
2. npm run start // it will run at the same time server + react-app

### to run project with local mongo and smtp (docker-compose)

1. Install docker
1. Install docker-compose (on windows already installed with docker)
1. npm run install:all
1. npm run dc-up (or dc-up-persist - to persist database entities on localhost)
1. Copy env.docker.template to .env
1. npm run dev

### to run storybook

npm run storybook

### starter which contains

- basic server setup in nodejs/express/mongoose (prepared to connect with mongoDB, at this point it won't connect because there is no mongoURI)
- basic project structure
- setup redux + thunk in index.tsx
- enabled redux-dev-tools "only in development mode" if user have addon installed in browser, in index.tsx
- setup basic routing in App.tsx
- setup GlobalStyles + Theme (thanks to styled-components) for whole App in App.tsx
- eslint with "airbnb"
- styled-components for styling
- react-pose for animating components (integration with styled-components)
- styled-icons for icons (integration with two above)
- styled-spinkit for loaders

updated:

- basic storybook library setup
- example of reusable Button inside storybook
