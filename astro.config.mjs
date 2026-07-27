import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ⚠️ 部署前务必替换为你的真实域名（影响 sitemap、canonical、OG 绝对 URL）
  // 见 build/deployment_guide.md 第 4 节
  site: 'https://YOUR-DOMAIN.example',
  integrations: [sitemap()],
});
