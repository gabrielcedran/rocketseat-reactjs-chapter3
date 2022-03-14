# rocketseat-reactjs-chapter3

## NextJS

NextJS is a framework built on top of ReactJS that enables Server Side Rendering (and a hybrid model) opposed to Single Page Application only. In nutshell a node server sits between the client (usually a browser) and the actual backend server. This server process the request executes the react code and returns the content already rendered.

This model primarily benefits indexing mechanisms (as google) and crawlers as they don't usually have javascript enabled and/or wait for the side effects in order to scrape the pages' content. Imagine in an ecommmerce where its content is never indexed by google.

Another secondary benefit, even though most of the cases it is not the case, customers without javascript enabled can also access and use the website normally.

![SPA vs SSR](/docs/spa-ssr.png)


### Creating a nextjs application

Run the command `yarn create next-app {app-name}`. 

The folder `pages` can only be in two places - either in the root directory or inside src and cannot be renamed. Each file inside the pages folder become a route in the application (aka file system routing).

#### Adding typescript

Run the command `yarn add typescript @types/react @types/node -D` and rename `.js` files to `.tsx`. Next identifies that typescript has been added and automatically generates the `tsconfig.json` file.