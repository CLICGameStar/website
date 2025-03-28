# TODO

- In [docker-compose.yaml](docker-compose.yaml), change the name of the compose.

# NextJS App Template

This is a template for app using [NextJS](https://nextjs.org) along with a [Directus](https://directus.io) CMS

## Content

### App

The website's code is located in the `/src` directory. It uses [NextJS](https://nextjs.org/), a [React](https://react.dev/)-based framework to provide a single page application, coupled with [SCSS](https://sass-lang.com/documentation/syntax/#scss) for styling.

To fetch data from Directus, it should be done on server-side, using the [`directus()`](./app/src/directus.ts) to generate a handle to call Directus' API (<https://docs.directus.io/guides/sdk/getting-started.html>) object in `directus.ts`. As NextJS's app router allow [server side components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), you can directly fetch from directus from those.

### Directus

To store and provide dynamic content, we use the service [Directus](https://directus.io/), which acts as a content management server.It is ran separately from the website in the infrastructure. See its [documentation](directus/README.md).

### Internationalization (i18n)

```
TODO
```

## Setup

It is recommended to use VSCode, with the following extensions:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

You will also need:

- [Docker](https://www.docker.com/).
- [Node Package Manager](https://www.npmjs.com/)
- [Node Package Executor](https://www.npmjs.com/package/npx)

After installing all dependencies, you need to run:

```sh
npm install
npm run prepare
```

Important note: If your UID/GID is not `1000`, you need to export them as `USER_ID`/`GROUP_ID` environment variables for the containers to work. See [`.env.example`](.env.example).

Afterwards, refer to this [document](directus/README.md) to setup a local Directus instance.

## Development

The development is done in the `/app` directory for the website, or from Directus admin UI, on `http://localhost/directus`.

In order to run the server, use docker and run the compose file at the root of the project:

```sh
docker compose up
```

**Note:** For VSCode users, there are two tasks, under `Terminal > Run tasks...`, to both start and stop the server. The start task is automatically ran when you open the directory.

When editing the website, modifications will immediately be visible, without reloading the page or restarting the server.

All services are ran behind a [Caddy](https://caddyserver.com/) reverse proxy, mounted on port 80. The config is [Caddyfile.dev](Caddyfile.dev) (note: this is not the production config).

### Code conventions

The code must be formatted with Prettier (using `npx prettier --write <directory>`). This will be checked by a hook upon commit.

The commit message must follow [conventional commits convention](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13). This is both checked by a local hook and by the CI.

Style scss must be imported into code files and classnames must not be referenced in clear.

## Deployment

After a push on the main branch, the website is automatically built into a docker image, and pushed to [GHRC](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry). When opening or pushing to a pull-request on the main branch, the images are also built, but not pushed, for sanity check.

The rest of the deployment is done by a dedicated [repository](https://github.com/clicepfl/clic-website-v2-infra).
