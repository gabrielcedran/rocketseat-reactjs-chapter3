# rocketseat-reactjs-chapter3

## NextJS

NextJS is a framework built on top of ReactJS that enables Server Side Rendering (and a hybrid model) opposed to Single Page Application only. In nutshell a node server sits between the client (usually a browser) and the actual backend server. This server process the request executes the react code and returns the content already rendered.

This model primarily benefits indexing mechanisms (as google) and crawlers as they don't usually have javascript enabled and/or wait for the side effects in order to scrape the pages' content. Imagine in an ecommmerce where its content is never indexed by google.

Another secondary benefit, even though most of the cases it is not the case, customers without javascript enabled can also access and use the website normally.

![SPA vs SSR](/docs/spa-ssr.png)


### Creating a nextjs application

Run the command `yarn create next-app {app-name}`. 

The folder `pages` can only be in two places - either in the root directory or inside src and cannot be renamed. Each file inside the pages folder become a route in the application (aka *file system routing*).

#### Adding typescript

Run the command `yarn add typescript @types/react @types/node -D` and rename `.js` files to `.tsx`. Next identifies that typescript has been added and automatically generates the `tsconfig.json` file.

### Styling components with sass

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

### Adding custom fonts

Add the font tags in the _document.tsx file. Refer to section [prevent reloading resources unnecessarily multiple times](#Prevent-reloading-resources-unnecessarily-multiple-times) for more information.


#### Notes

##### Prevent reloading resources unnecessarily multiple times

Every time a user changes the page the application is reloaded from the `_app.tsx`. If you need something to repeat across the application (a header for instace) you have to include it in the `_app.tsx` file. 

Another important concept is when you don't want something to reload multiple times. E.g when you download a font you don't want it to redownload everytime the user changes the page. In this cases you have to use the `_document.tsx` file - _document.tsx file works similarly to _app.tsx however it is loaded only once (at some extend it is like the index.html that only loads the react app entry point).

_refer to the commit_

##### Defining custom headers per route (page)

Nextjs has a component named Head that can be included anywhere within a route and allows custom head tags definition (title, metatags, etc).

Refer to commit to check implementation details.

##### Consuming API data from the nextjs not the browser

It is possible to consume API in the react traditional way using useEffect (and useState). However it will not return a page ready from the "backend" and will be executed on the browser - falling in the indexing issues and not taking full advantage of the SSR model.

API calls only work on nextjs "native" pages not on "regular" reactjs components. If a component needs access information provided by an api on the server side, that piece of information has to be provided by the page via props.

To consume an api from the backend use the component `GetServerSideProps`. For an example of implementation check commit.

```
// the function MUST have this name
export const getServerSideProps: GetServerSideProps = async () => {
  // fetch data from an api
  return {
    props: { // this props will be passed down to the page component
      product: 'abc'
    }
  }
}
```

##### Static Site Generation

There might be instances where the generated html will be the same for all users (or parts of it). A million users would cause the same processing a million times. Static Site Generation closes this gap and cache the generated html (or api's result) to simply return it in further requests dismissing all the processing.

To use the static site generation mechanism, use the component `GetStaticProps` (it is used in the same way** as GetServerSideProps the only difference is that it is only executed once while instead of every time a request is made to the server).

** the only difference is the property `revalidate` that is used to set a refresh of the generated content in seconds.

Refer to commit for further details.

```
// the function MUST have this name
export const getStaticProps: GetStaticProps = async () => {
  // fetch data from an api
  return {
    props: { // this props will be passed down to the page component
      product: 'abc'
    },
    revalidate: 60 * 60 * 24
  }
}
```

Summary of the three ways of consuming APIs with NextJS:

 - Client Side - when there is no need for SEO indexing or the page is loaded based on an action of the user
 - Server Side Rendering - when there is user specific information but indexing is still necessary
 - Static Site Generation - for everything that is irrespective of user (html shared among all the people accessing the application e.g posts of a blog, page of a product) 

 Blog:
 - Posts could be SSG
 - Comments SSR or Client Side (SSR would hold the page loading not allowing the client to start reading the post while the comments are loaded. But it is an architectural decision)