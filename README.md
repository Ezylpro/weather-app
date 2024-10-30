# Weather example project
This project uses Vue 3, TypeScript and Vite. Tailwind for styling.

## Project requirements
- Node.js
- Yarn

## Project setup ( run on dev mode )
```
cp .env.example .env
yarn install
yarn dev
open the browser on link provided by the terminal
```

> **Note**: This project uses [Bugsnag](https://www.bugsnag.com/) for error tracking. Please make sure add you own `VITE_BUGSNAG_API_KEY` inside the `.env` file., or comment the bugsnag related code inside `main.ts`.

To make the access simpler, you can access the project on the following link: [https://weather-app.ezylpro.com](https://weather-app.ezylpro.com).
Also, node modules are included in the repository, but would be great to run `yarn install` before running the project.

All the features in the document are implemented, but there are some improvements that can be made.
One example of it is the testing case: We could cover some cases using `cypress` to ensure the application is working as expected.

I didn't use many packages/libraries to keep the project simple and easy to understand. We could add more packages in case we need it in the future.
Components used are under the `components` folder, and the main component is the `App.vue` file.
