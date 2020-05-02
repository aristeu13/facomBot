declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string
        PORT: string
        AUTH_DISCORD: string
        DB_USER: string
        DB_PASSWORD: string
        DB_HOST: string
    }
}
