import glob from 'glob';
import Mocha from 'mocha';
import path from 'path';

export const run = async (): Promise<void> => {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'bdd',
  });

  const testsRoot = path.resolve(__dirname, '..');

  const files = await glob('**/*.spec.js', { cwd: testsRoot });

  // Add files to the test suite
  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

  // Run the mocha test
  mocha.run((failures) => {
    if (failures > 0) {
      throw new Error(`${failures} tests failed.`);
    }
  });
};
