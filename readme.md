# vite-proxy-serve-static-plugin

A Vite plugin for serving static files with customizable routes and MIME type support. This plugin allows you to easily serve static assets from specified directories and files within your Vite project.


This approach is particularly beneficial during development, as it helps you avoid copying data with every installation or project run. Instead, you can serve the assets directly, saving you time and effort. Additionally, you can use the public folder for similar purposes, which is often sufficient in many cases.
## Installation

You can install the package via npm or yarn:

```bash
npm install vite-proxy-serve-static

yarn add vite-proxy-serve-static
```

## Usage

Add `serveStatic` plugin to `vite.config.js` / `vite.config.ts`.

```js
// vite.config.js / vite.config.ts
import { defineConfig } from 'vite'
import commonConfig from './vite.config.common'
import {serveStatic} from "vite-proxy-serve-static";

export default defineConfig({
    ...commonConfig,
    root: './',
    build: {
        sourcemap: true,
    },
    server: {
        open: true,
        port: 5000,
    },
    plugins: [
        ...commonConfig.plugins,
        serveStatic({
            routes: [
                { route: '/assets/images', dir: 'node_modules/pckg/images' },  // Serving images from the public/images directory
                { route: '/assets/styles', dir: 'src/styles' },      // Serving stylesheets from the src/styles directory
                { route: '/assets/scripts', file: 'src/scripts/app.js' } // Serving a specific JavaScript file
            ]
        })
    ],
});
```
```text
http://localhost:5000/assets/images/aloe.jpg — This will proxy the request and return images from the `node_modules` folder based on the path we specified.
```
```text
http://localhost:5000/assets/scripts — You can also specify a direct file instead of a folder, which will return the specified file.
```


