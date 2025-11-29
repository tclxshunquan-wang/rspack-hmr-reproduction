import { defineConfig } from '@hyperse/hps';
import {
  type EvolveConfigBase,
  type EvolveEntryItemOption,
  type EvolveEntryMap,
  type HpsEvolveOptions,
} from '@hyperse/hps-srv-rspack';

const projectCwd = process.cwd();
const virtualPath = 'hyperse-hub/dashboard';
const pageModules = ['main'];


const getEntryMap = (
  modules: Array<{ name: string; options: EvolveEntryItemOption }>
) => {
  const entryMap: EvolveEntryMap = {};
  modules.forEach((module) => {
    if (pageModules.includes(module.name)) {
      entryMap[`${module.name}`] = {
        entry: [`./src/${module.name}/index`],
        options: {
          ...module.options,
          output:{
          // uniqueName: module.name,
          },
          headScripts: [
            {
              src:'http://dev.hps.com:8002/public/hyperse-hub/dashboard/library/bundle.js',
              id: 'library-bundle.js',
              position: 'end',
              order: 1,
            },
            // {
            //   src: 'http://dev.hps.com:8001/public/runtime~hyperse-hub/dashboard/main/bundle.js',
            //   id: 'runtime.js',
            //   position: 'end',
            //   order: 2,
            // },
          ],
          headStyles: [
            {
              'href':'http://dev.hps.com:8002/public/hyperse-hub/dashboard/library/bundle.css',
              id: 'library-bundle.css',
              position: 'end',
              order: 1,
            },
          ],
        },
      };
      return;
    }
    entryMap[`${module.name}`] = {
      entry: [`./src/${module.name}/index`],
      options: {
        output: {
          library: {
            name: '[name]',
            type: 'var',
          },
          libraryTarget: 'window',
          // uniqueName: module.name,
        },
        
      },
    };
  });
  return entryMap;
};

const getFavicon = (mode: 'serve' | 'build') => {
  return {
    href: mode === 'serve' ? '/admin/favicon.ico' : '/static/favicon.ico',
    rel: 'icon',
    attributes: {
      type: 'image/x-icon',
    },
  };
};

const baseConfig = (
  env: EvolveConfigBase,
  mode: 'serve' | 'build'
): HpsEvolveOptions => {
  return {
    projectCwd,
    projectVirtualPath: virtualPath,
    devServer: {
      webSocketURL: {
        hostname: '0.0.0.0',
      },
      pageProxy: 'admin',
      // liveReload: true,
      mockOptions: {
        port: 8000,
        staticMap: {
          '/static': 'static',
        },
      },
      defaultServeGlobalData: async ({ entry }, hostUrl) => {
        return {}
      },
    },
    rspack: {
      loader: {
        pixelOptions: false,
        postcssOptions: {
          plugins: [env.resolve(import.meta.url, '@tailwindcss/postcss')],
        },
      },
      output: {
        chunkFileVirtualPath: `${virtualPath}/runtime-chunk`,
      },
      plugins: {
        definePlugin: {
          variables: {},
        },
        rsdoctorPlugin: {
          enabled: false,
        },
        tsCheckerPlugin: {
          enabled: true,
        },
        htmlPlugin: {
          htmlCdn: 'https://hps-static.hyperse.net/webapps/',
        },
      },
    },
    inspector: {
      trustedEditor: 'cursor',
    },
    entryMap: getEntryMap([
      { name: 'main', options: { favicon: getFavicon(mode) } },
      { name: 'library', options: { favicon: getFavicon(mode) } },
    ]),
  };
};

export default defineConfig((env) => {
  return {
    'serve.evolve': baseConfig(env, 'serve'),
    'build.evolve': baseConfig(env, 'build'),
  };
});
