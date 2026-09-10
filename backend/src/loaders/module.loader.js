import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logger from '../shared/logger/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const routesLoader = async (app) => {
  const modulesPath = path.join(__dirname, "../modules");
  const moduleFolders = fs.readdirSync(modulesPath);

  for (const folder of moduleFolders) {
    try {
      const module = await import(`../modules/${folder}/index.js`);
      const { basePath, router } = module.default;

      app.use(basePath, router);
      console.log(`✅ Loaded module: ${folder}`);
    } catch (err) {
      console.warn(`⚠️ Skipped module: ${folder}`);
    }
  }
};
