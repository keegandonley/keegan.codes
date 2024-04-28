import { NextRequest } from 'next/server';
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';

export async function POST(request: NextRequest) {
  const res: { html?: string } = await request.json();

  const html = res.html;

  if (!html) {
    return new Response('Error! Missing html', { status: 400 });
  }

  const result = await postcss([
    tailwindcss({
      content: [{ raw: html, extension: 'html' }],
    }),
  ]).process(`@tailwind components;@tailwind utilities; .__{}`);

  return Response.json({ css: result.css });
}
