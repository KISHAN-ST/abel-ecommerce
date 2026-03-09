import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic route: render at request time (no getPrerenderParams needed)
  {
    path: 'product/:id',
    renderMode: RenderMode.Server
  },
  // All other routes can be prerendered
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
