const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../src/posts');
const shortCodesRegex = /export const shortCodes = (\[[\s\S]*?\])/;

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }
  const shortcodesMap = {};

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (file.endsWith('mdx') && file !== 'template.mdx') {
      fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err) {
          console.error(`Error reading file: ${err.message}`);
          return;
        }

        const shortCodesMatch = contents.match(shortCodesRegex);

        if (shortCodesMatch) {
          const shortCodesArray = JSON.parse(
            shortCodesMatch[1]
              .replace(/'/g, '"')
              .replace(/,(\s*[}\]])/g, '$1')
              .replace(/\s+/g, ' ')
              .trim(),
          );
          shortCodesArray.forEach((shortCode) => {
            if (shortcodesMap[shortCode]) {
              console.log(
                `[DUPLICATE]: ${file} has a duplicate shortCode: ${shortCode}`,
              );
              process.exit(1);
            } else {
              console.log(`[FOUND]: ${file} has a shortCode: ${shortCode}`);
              shortcodesMap[shortCode] = true;
            }
          });
        } else {
          console.log(
            `[NOOP]: File ${file} does not contain the shortCodes line.`,
          );
        }
      });
    }
  });
});
