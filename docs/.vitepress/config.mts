import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '胡琨的学习笔记',
  description: '记录研究生阶段的学习、科研与求职成长',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '学习复盘', link: '/diary/' },
      { text: '科研成长', link: '/research/' },
      { text: '求职准备', link: '/job/' },
      { text: '周复盘', link: '/weekly/' },
      { text: '关于我', link: '/about' }
    ],

    sidebar: {
      '/diary/': [
        {
          text: '学习复盘',
          items: [
            { text: '学习日记总览', link: '/diary/' },
            { text: '2026年6月学习日记', link: '/diary/2026-06' }
          ]
        }
      ],

      '/research/': [
        {
          text: '科研成长',
          items: [
            { text: '项目总览', link: '/research/' }
          ]
        },
       {
          text: '无人机无线电地图与路径规划',
          items: [
            { text: '项目介绍与技术路线', link: '/research/uav-radio-map/' },
            { text: '阶段性总结', link: '/research/uav-radio-map/summary' },
            { text: '实验数据汇总', link: '/research/uav-radio-map/results' },
            { text: '参考文献与资料', link: '/research/uav-radio-map/references' }
          ]
        }
      ],

      '/job/': [
        {
          text: '求职准备',
          items: [
            { text: '求职准备总览', link: '/job/' },
            { text: '算法刷题', link: '/job/algorithm' },
            { text: '深度学习', link: '/job/deep-learning' },
            { text: 'Linux 与 Git', link: '/job/linux-git' },
            { text: '面试复盘', link: '/job/interview' }
          ]
        }
      ],

      '/weekly/': [
        {
          text: '周复盘',
          items: [
            { text: '周复盘总览', link: '/weekly/' },
            { text: '2026年第1周', link: '/weekly/2026-week-01' }
          ]
        }
      ]
    },

    footer: {
      message: '慢慢学，慢慢写，慢慢变强。',
      copyright: 'Copyright © 2026 胡琨'
    }
  }
})