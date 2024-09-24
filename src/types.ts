export interface RouteConfig {
    route: string;
    dir?: string;
    file?: string;
}

export interface ServeStaticOptions {
    routes?: RouteConfig[];
}
