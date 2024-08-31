/* eslint-disable node/prefer-global/process -- I dev on a VPS */

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://polyfrost.org',
	adapter: cloudflare(),
	output: 'server',
	integrations: [
		unocss({
			injectReset: true,
		}),
		mdx(),
		sitemap(),
	],
	server: process.env.REDSTONE_IS_DUMB
		? {
				port: 4000,
			}
		: {},
	vite: {
		ssr: {
			noExternal: ['smartypants'],
		},
		server: process.env.REDSTONE_IS_DUMB
			? {
					port: 4000,
					strictPort: true,
					hmr: {
						clientPort: 443,
						port: 4000,
						protocol: 'wss',
					},
				}
			: {},
	},
});
