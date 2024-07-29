import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'prompt',
			includeAssets: ['vite.svg'],
			manifest: {
				name: 'PowerBI-React-POC',
				short_name: 'powerbi-react-poc',
				description: 'I am a simple POC app',
				theme_color: '#171717',
				background_color: '#f0e7db',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				orientation: 'portrait',
			},
		}),
	],
});
