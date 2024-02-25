import { createClient } from '@libsql/client';
// import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url:
    process.env.TURSO_DATABASE_URL_PROD ||
    process.env.TURSO_DATABASE_URL_DEV ||
    '',
  authToken:
    process.env.TURSO_AUTH_TOKEN_DEV || process.env.TURSO_AUTH_TOKEN_PROD || '',
});
