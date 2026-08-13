import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rohan Nandavdekar — Full Stack Developer',
    short_name: 'Rohan N.',
    description: 'Computer Science student and full stack developer building scalable web platforms and fintech products with React, Node.js and PostgreSQL.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0F12',
    theme_color: '#0D0F12',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
