import { Plugin } from 'vite';

interface RouteConfig {
    route: string;
    dir?: string;
    file?: string;
}
interface ServeStaticOptions {
    routes?: RouteConfig[];
}

declare function serveStatic(options?: ServeStaticOptions): Plugin;

export { serveStatic };
