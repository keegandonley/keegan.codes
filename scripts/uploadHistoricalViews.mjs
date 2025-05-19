import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { connect } from '@planetscale/database';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

const conn = connect(config);

const __dirname = path.resolve();

const content = fs.readFileSync(
  path.join(__dirname, 'scripts', 'countries.csv'),
  'utf8',
);

const records = parse(content, {
  //   columns: true,
  skip_empty_lines: true,
});

for (const record of records) {
  const [code, views] = record;

  const res = await conn.execute(
    'INSERT INTO location_page_views (code, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = views + ?',
    [code, views, views],
  );

  console.log(res.insertId, code, views);
}
