import { connect } from '@planetscale/database';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function POST(request: Request) {
  const res: HiTrackBody = await request.json();
  const conn = connect(config);
  const results = await conn.execute(
    'INSERT INTO hi_view (slug, view_date, qr_scanned) VALUES (?, ?, ?)',
    [res.slug, new Date(), res.qrScanned],
  );

  if (results.rowsAffected !== 1) {
    return new Response('Error!', { status: 500 });
  }

  return new Response('Success!', { status: 200 });
}
