import { Plugin, ViteDevServer } from 'vite';
import { handleFileRequest } from './fileHandler';
import { ServeStaticOptions } from './types';

export function serveStatic(options: ServeStaticOptions = {}): Plugin {

    const config = options;

    return {
        name: 'vite-serve-static',
        configureServer(server: ViteDevServer) {
            server.middlewares.use((req, res, next) => {
                handleFileRequest(req, res, next, config.routes!);
            });
        }
    };
}
