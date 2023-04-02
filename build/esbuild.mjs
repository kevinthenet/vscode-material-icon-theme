import * as esbuild from 'esbuild';
import glob from 'glob';
import minimist from 'minimist';

/** @type {{prod?: boolean, web?: boolean}} */
const argv = minimist(process.argv.slice(2));

const files = glob.sync('src/i18n/**/lang-*.ts');
console.log(files);

const sharedConfig = {
  entryPoints: ['./src/extension.ts', ...files],
  bundle: true,
  inject: files,
  external: ['vscode'],
  format: 'cjs',
  minify: !!argv.prod,
  platform: 'node',
};

if (!!argv.web) {
  await esbuild.build({
    ...sharedConfig,
    outfile: './dist/web/extension.js',
  });
} else {
  await esbuild.build({
    ...sharedConfig,
    outfile: './dist/extension.js',
    sourcemap: 'external',
  });
}

console.log('✅ Build done');
