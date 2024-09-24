import path from 'path';
import fs from 'fs';
import { mimeTypes } from './mimeTypes';
import { RouteConfig } from './types';

export function handleFileRequest(req: any, res: any, next: any, routes: RouteConfig[]) {
    if (!req.url) {
        return next();
    }

    for (const route of routes) {
        if (req.url.startsWith(route.route)) {
            let filePath: string | undefined;

            try {
                // Handle the directory or file path
                if (route.dir) {
                    const relativePath = decodeURIComponent(req.url.replace(route.route, ''));
                    filePath = path.resolve(path.join(route.dir, relativePath));
                } else if (route.file) {
                    filePath = path.resolve(route.file);
                }

                // Path Traversal Protection
                if (filePath && !filePath.startsWith(path.resolve(route.dir || ''))) {
                    console.error(`Illegal path access attempt: ${filePath}`);
                    res.statusCode = 403; // Forbidden
                    res.end('Forbidden');
                    return;
                }

                // Check file existence
                if (filePath && fs.existsSync(filePath)) {
                    const ext = path.extname(filePath);
                    const mimeType = mimeTypes[ext] || 'application/octet-stream';
                    res.setHeader('Content-Type', mimeType);

                    const stream = fs.createReadStream(filePath);
                    stream.on('error', (err) => {
                        console.error(`Stream error: ${err.message}`);
                        res.statusCode = 500; // Internal Server Error
                        res.end('Internal Server Error');
                    });
                    stream.pipe(res);
                    return;
                } else {
                    console.error(`File not found: ${filePath}`);
                    res.statusCode = 404;
                    res.end('File not found');
                    return;
                }
            } catch (error) {
                console.error(`Error processing request for ${req.url}: ${error.message}`);
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }
        }
    }

    next();
}
