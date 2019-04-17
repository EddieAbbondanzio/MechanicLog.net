# MechanicLog.net

A vehicle maintenance / mpg tracking web app. Track every penny, and log every maintenance job. Provides an easy to use interface for keeping your vehicles up to date with their maintenance. Next time you need to check when / if a service was performed, you'll know with certainty if it was done or not.

[MechanicLog: Vehicle Maintenance Tracking Web App](https://mechaniclog.net)

## Project setup

This repository is for the front end of MechanicLog. It's built on Vue, and uses TypeScript to help with scaling the code. The project will require a `config.ts` file in order to function.

### config.ts

The config file must contain a URL for pointing to the backend. A sample config file is as follows:

```ts
export const config = {
    backendUrl: 'http://localhost:3117',
};
```

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
