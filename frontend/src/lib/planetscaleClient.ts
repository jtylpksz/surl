import { connect } from '@planetscale/database';

const config = {
  host: process.env.NEXT_PUBLIC_DATABASE_HOST,
  username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
  password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
};

export const db = connect(config);
