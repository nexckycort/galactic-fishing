import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const colors = {
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

function processFile(content: string) {
  const templateLiteralPattern = /`([\s\S]*?)`/g;

  return content.replace(templateLiteralPattern, (_, htmlBlock) => {
    const compactHtml = htmlBlock
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    return `\`${compactHtml}\``;
  });
}

async function processFolder(folderPath: string) {
  try {
    const files = await readdir(folderPath);

    const tsFiles = files.filter((file) => file.endsWith('.ts'));

    for (const file of tsFiles) {
      const filePath = path.join(folderPath, file);
      const fileContent = await readFile(filePath, 'utf-8');
      const processedContent = processFile(fileContent);
      await writeFile(filePath, processedContent, 'utf-8');
      console.log(
        `${colors.green}${colors.bold}✅ String literals minified in: ${colors.cyan}${file}${colors.reset}`,
      );
    }
  } catch (error) {
    console.error('Error al procesar la carpeta:', error);
  }
}

const folderPath = `${process.cwd()}/src/components`;
processFolder(folderPath);
