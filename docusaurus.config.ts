import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '兔子窝',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mengtaolu.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/my_learning/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mengtaoLu', // Usually your GitHub org/user name.
  projectName: 'my_learning', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/mengtaoLu/my_learning',
            showLastUpdateAuthor: true,
            showLastUpdateTime: true
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/mengtaoLu/my_learning',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

    plugins: [
        [
            '@docusaurus/plugin-content-blog',
            {
                /**
                 * 必须配置唯一的 ID，用于区分不同的博客实例
                 */
                id: 'news-blog',
                /**
                 * 文件的实际存放路径
                 */
                path: 'news',
                /**
                 * 浏览器访问的 URL 路径
                 */
                routeBasePath: 'news',
                /**
                 * 侧边栏标题（可选）
                 */
                blogTitle: '新闻动态',
                blogDescription: '这是我们的第二个博客实例',
            },
        ],
    ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '兔子窝',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
          {
              type: 'dropdown',
              label: 'Blogs',
              position: 'left',
              items: [
                  {
                      label: 'Blog',
                      to: '/blog'
                  },
                  {
                      label: '兔子窝',
                      to: '/news'
                  }
              ]
          },
          {
              type: 'dropdown',
              label: '知识库',
              sidebarId: 'wikiSidebar',
              position: 'left',
              items: [
                  {
                      label: 'Java',
                      to: '/docs/wiki/java/'
                  }
              ]
          },
          {
              type: 'dropdown',
              label: 'Tools',
              sidebarId: 'ToolsSidebar',
              position: 'left',
              items: [
                  {
                      label: 'Linux命令',
                      to: '/docs/category/tools-linux'
                  }
              ]
          },
          {
              type: 'dropdown',
              label: '网站集',
              position: 'left',
              items: [
                  {
                      to: 'https://psprices.com/region-hk/index?platform=PS5',
                      label: 'PS5游戏价格',
                  },
              ]
          },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
