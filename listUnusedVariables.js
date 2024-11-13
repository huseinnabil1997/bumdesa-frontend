const { ESLint } = require('eslint');
const path = require('path');

async function findUnusedVariables(directory) {
  const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        'no-unused-vars': ['error'],
      },
    },
  });

  const results = await eslint.lintFiles([directory]);
  const unusedVariables = [];

  results.forEach((result) => {
    if (result.messages.length > 0) {
      result.messages.forEach((message) => {
        if (message.ruleId === 'no-unused-vars') {
          const filePath = path.resolve(result.filePath);
          const line = message.line;
          const column = message.column;
          unusedVariables.push(`${filePath}:${line}:${column}`);
        }
      });
    }
  });

  return unusedVariables;
}

(async () => {
  const directoryPath = path.resolve(__dirname, 'src');
  const unusedVars = await findUnusedVariables(directoryPath);

  unusedVars.forEach((file) => {
    console.log(`\x1b[36m%s\x1b[0m`, file); // This will print the file path in cyan color
  });
})();
