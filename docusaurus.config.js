export default {
    title: '我的文档',
    url: 'https://mengtaolu.github.io', // 如果是项目站点则为 https://<用户名>.github.io
    baseUrl: '/my_learning/', // 如果是主域名访问(如 username.github.io)，这里写 '/'
    organizationName: 'mengtaoLu', // 你的 GitHub 账号
    projectName: 'my_learning', // 你的仓库名称
    deploymentBranch: 'gh-pages', // 部署分支，通常默认为 gh-pages
    trailingSlash: false,
    themeConfig: {
        navbar: {
            title: '我的网站', // 左上角标题
            // logo: {
            //     alt: 'Logo',
            //     src: 'img/logo.svg', // logo 图片路径（在 static/img 下）
            // },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar', // 对应 sidebars.js 里的 ID
                    position: 'left',
                    label: '文档', // 菜单名称
                },
                { to: '/blog', label: '博客', position: 'left' }, // 链接到博客
                {
                    href: 'https://github.com/你的用户名/仓库名',
                    label: 'GitHub',
                    position: 'right', // 显示在右侧
                },
            ],
        },
    },
};