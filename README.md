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

### Styling components

There are many ways of styling components when using next.js:

The traditional way by creating a vanilla global css file and importing it inside the main component (nextjs forces you to import global css in the main app module to try and prevent conflicts):

```
// global.css
h1 {
    color: pink;
}

// _app.tsx
import '../styles/global.css';
...

// index.tsx
export default function Home() {
  return (
    <h1>Hello World</h1>
  )
}
```

Using scoped css to prevent conflict of styles (especially when the project grows). Every css file that ends with `.module.css` nextjs will treat them as scoped out of the box (css modules).

```
// global.module.css - we can never style html components directly. It has to be done via class or id
h1.title { // or .title only
    color: pink;
}

// index.tsx
import styles from '../styles/global.module.css';

export default function Home() {
  return (
    <h1 className={styles.title}>Hello World</h1>
  )
}
```
_install extension `css modules` to enable autocomplete and ctrl + click_


Using sass and scoped css. When sass is installed nextjs will auto configure it for us in order to preprocess sass files into css when building (`yarn add sass`).

```
// global.module.scss - just the file extension that changes
h1.title {
    color: pink;
}

// index.tsx
import styles from '../styles/global.module.scss';

export default function Home() {
  return (
    <h1 className={styles.title}>Hello World</h1>
  )
}
```

_nextjs supports scss and sass out of box_

Using other css in js framework like styled components.

