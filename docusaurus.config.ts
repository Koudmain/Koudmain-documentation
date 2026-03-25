import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Koudmain",
  tagline: "The instant reinforcement for hospitality",
  favicon: "img/logo_v1_only_transparant.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.koudmain.fr",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: undefined,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Koudmain", // Usually your GitHub org/user name.
  projectName: "Koudmain-documentation", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },

  themes: ["docusaurus-theme-openapi-docs"],
  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          documentation: {
            specPath: "static/openapi.yaml",
            outputDir: "docs/api",
            sidebarOptions: {
              groupPathsBy: "tag", // Default to tags, but we'll override category names or use another strategy. Wait, if it requires tag/tagGroup... 
              // Actually let's just supply an empty object or just sidebarCollapsible: false if it complains.
            },
          }
        }
      },
    ],
    function () {
      return {
        name: "docusaurus-openapi-webpack-plugin",
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              fallback: {
                path: require.resolve("path-browserify"),
                url: require.resolve("url/"),
                fs: false,
                http: false,
                https: false,
              },
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    languageTabs: [
      {
        highlight: "curl",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "http",
        language: "http",
        logoClass: "http",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
    ],
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Koudmain - Documentation",
      logo: {
        alt: "Logo",
        src: "img/logo_v1_only_transparant.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "documentationSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API",
        },
        {
          href: "https://github.com/Koudmain/Koudmain-documentation",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Documentation",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Github",
              href: "https://github.com/Koudmain",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Koudmain, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
