import { spawnSync } from 'child_process';
import * as path from 'path';

const args = process.argv.slice(2);
const command = args[0];

if (!command || !['generate', 'run', 'revert', 'create'].includes(command)) {
  console.error('❌ Please provide a valid command: generate, run, revert, or create');
  console.error('Usage:');
  console.error('  npm run migration:generate -- <name>');
  console.error('  npm run migration:run');
  console.error('  npm run migration:revert');
  console.error('  npm run migration:create -- <name>');
  process.exit(1);
}

const env = {
  ...process.env,
  NODE_OPTIONS: '--require tsconfig-paths/register'
};

let cmd: string[] = [];

if (command === 'generate') {
  const name = args.slice(1).join('_');
  if (!name) {
    console.error('❌ Please provide a migration name for generate command.');
    process.exit(1);
  }

  cmd = [
    'migration:generate',
    '-d',
    'src/core/database/data-source.ts',
    `src/core/database/migrations/${name}`
  ];

  console.log('🧱 Generating migration:', name);
} else if (command === 'run') {
  cmd = ['migration:run', '-d', 'src/core/database/data-source.ts'];
  console.log('🚀 Running migrations...');
} else if (command === 'revert') {
  cmd = ['migration:revert', '-d', 'src/core/database/data-source.ts'];
  console.log('⏪ Reverting last migration...');
} else if (command === 'create') {
  const name = args.slice(1).join('_');
  if (!name) {
    console.error('❌ Please provide a migration name for create command.');
    process.exit(1);
  }

  cmd = ['migration:create', `src/core/database/migrations/${name}`];
  console.log('🧱 Creating migration:', name);
}

const binExt = process.platform === 'win32' ? '.cmd' : '';
const typeormBin = path.resolve(
  process.cwd(),
  'node_modules',
  '.bin',
  `typeorm-ts-node-commonjs${binExt}`
);

// ✅ On Windows: run .cmd via cmd.exe /c to avoid EINVAL
const result =
  process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/c', typeormBin, ...cmd], {
        stdio: 'inherit',
        env
      })
    : spawnSync(typeormBin, cmd, {
        stdio: 'inherit',
        env
      });

if (result.error) {
  console.error('❌ Failed to run TypeORM CLI:', result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);