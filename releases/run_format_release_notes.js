import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { compile_latest_release, parse_cli_options } from 'obsidian-smart-env/build/compile_latest_release.js';

const __dirname = process.cwd();

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const cli_options = parse_cli_options(process.argv.slice(2));
  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'));

  compile_latest_release({
    version: pkg.version,
    plugin_name: manifest.name,
    releases_dir: path.join(__dirname, 'releases'),
    output_path: path.join(__dirname, 'releases', 'latest_release.md'),
    dry_run: cli_options.dry_run,
  });
}
