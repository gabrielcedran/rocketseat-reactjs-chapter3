# rocketseat-reactjs-chapter3

## NextJS

NextJS is a framework built on top of ReactJS that enables Server Side Rendering (and a hybrid model) opposed to Single Page Application only. In nutshell a node server sits between the client (usually a browser) and the actual backend server. This server process the request executes the react code and returns the content already rendered.

This model primarily benefits indexing mechanisms (as google) and crawlers as they don't usually have javascript enabled and/or wait for the side effects in order to scrape the pages' content. Imagine in an ecommmerce where its content is never indexed by google.

Another secondary benefit, even though most of the cases it is not the case, customers without javascript enabled can also access and use the website normally.

![SPA vs SSR](/docs/spa-ssr.png)


### Creating a nextjs application

Run the command `yarn create next-app {app-name}`.