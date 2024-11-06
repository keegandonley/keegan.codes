import { NextRequest } from 'next/server';
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';

const defaultCSS = '.__{}';

export async function POST(request: NextRequest) {
  const res: { html?: string } = await request.json();

  const html = res.html;

  if (!html) {
    return Response.json({ css: defaultCSS });
  }

  const result = await postcss([
    tailwindcss({
      content: [{ raw: html, extension: 'html' }],
      corePlugins: { preflight: false },
    }),
  ]).process(`@tailwind components;@tailwind utilities; ${defaultCSS}`, {
    from: 'api',
  });

  return Response.json({ css: result.css });
}
