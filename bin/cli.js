#!/usr/bin/env node

/**
 * google-maps-lead-generation CLI
 * Cross-platform installer for AI coding assistants and IDEs.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');
const PKG = require(path.join(ROOT_DIR, 'package.json'));

// Terminal color helpers
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  dot: '\x1b[32m●\x1b[0m',
};

function printBanner() {
  console.log(`\n${c.cyan}${c.bold}Google Maps Lead Generation & Website Opportunity Skill${c.reset} ${c.dim}v${PKG.version}${c.reset}`);
  console.log(`${c.dim}Powered by ScrapeGraphAI · Compatible with all Agentic AI IDEs & CLIs${c.reset}\n`);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function installSkill(targetDir, targets = ['all']) {
  console.log(`${c.bold}Installing into:${c.reset} ${c.cyan}${path.resolve(targetDir)}${c.reset}\n`);

  const results = [];
  const shouldInstallAll = targets.includes('all');

  // 1. Install Canonical Agent Skill directory (.agents/skills/google-maps-lead-generation)
  const canonicalDir = path.join(targetDir, '.agents', 'skills', 'google-maps-lead-generation');
  fs.mkdirSync(canonicalDir, { recursive: true });

  const skillFiles = ['SKILL.md', 'requirements.txt'];
  skillFiles.forEach((f) => {
    const src = path.join(ROOT_DIR, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(canonicalDir, f));
    }
  });

  const subdirs = ['references', 'assets'];
  subdirs.forEach((d) => {
    const src = path.join(ROOT_DIR, d);
    if (fs.existsSync(src)) {
      copyRecursiveSync(src, path.join(canonicalDir, d));
    }
  });
  results.push(`Canonical Agent Skill   -> .agents/skills/google-maps-lead-generation/`);

  // 2. Claude Code (CLAUDE.md)
  if (shouldInstallAll || targets.includes('claude')) {
    const dest = path.join(targetDir, 'CLAUDE.md');
    const src = path.join(ROOT_DIR, 'CLAUDE.md');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push(`Claude Code Directives  -> CLAUDE.md`);
    }
  }

  // 3. Google Antigravity & Universal Agents (AGENTS.md)
  if (shouldInstallAll || targets.includes('antigravity')) {
    const dest = path.join(targetDir, 'AGENTS.md');
    const src = path.join(ROOT_DIR, 'AGENTS.md');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push(`Antigravity Directives  -> AGENTS.md`);
    }
  }

  // 4. Cursor IDE (.cursorrules & .cursor/rules/)
  if (shouldInstallAll || targets.includes('cursor')) {
    const cursorRulesDest = path.join(targetDir, '.cursorrules');
    const cursorRulesSrc = path.join(ROOT_DIR, '.cursorrules');
    if (fs.existsSync(cursorRulesSrc)) {
      fs.copyFileSync(cursorRulesSrc, cursorRulesDest);
      results.push(`Cursor Legacy Rules     -> .cursorrules`);
    }

    const mdcDest = path.join(targetDir, '.cursor', 'rules', 'google-maps-lead-generation.mdc');
    const mdcSrc = path.join(ROOT_DIR, '.cursor', 'rules', 'google-maps-lead-generation.mdc');
    if (fs.existsSync(mdcSrc)) {
      fs.mkdirSync(path.dirname(mdcDest), { recursive: true });
      fs.copyFileSync(mdcSrc, mdcDest);
      results.push(`Cursor v0.40+ MDC Rule  -> .cursor/rules/google-maps-lead-generation.mdc`);
    }
  }

  // 5. Windsurf IDE (.windsurfrules)
  if (shouldInstallAll || targets.includes('windsurf')) {
    const dest = path.join(targetDir, '.windsurfrules');
    const src = path.join(ROOT_DIR, '.windsurfrules');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push(`Windsurf Cascade Rules  -> .windsurfrules`);
    }
  }

  // 6. VS Code / GitHub Copilot (.github/copilot-instructions.md)
  if (shouldInstallAll || targets.includes('copilot')) {
    const dest = path.join(targetDir, '.github', 'copilot-instructions.md');
    const src = path.join(ROOT_DIR, '.github', 'copilot-instructions.md');
    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      results.push(`GitHub Copilot Rules    -> .github/copilot-instructions.md`);
    }
  }

  // 7. Gemini CLI (GEMINI.md)
  if (shouldInstallAll || targets.includes('gemini')) {
    const dest = path.join(targetDir, 'GEMINI.md');
    const src = path.join(ROOT_DIR, 'GEMINI.md');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push(`Gemini CLI Directives   -> GEMINI.md`);
    }
  }

  // 8. Cline / Roo Code (.clinerules)
  if (shouldInstallAll || targets.includes('cline')) {
    const dest = path.join(targetDir, '.clinerules');
    const src = path.join(ROOT_DIR, '.clinerules');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push(`Cline / Roo Code Rules  -> .clinerules`);
    }
  }

  results.forEach((msg) => console.log(`  ${c.green}✓${c.reset} ${msg}`));
  console.log(`\n${c.green}${c.bold}Successfully installed!${c.reset}`);
  console.log(`${c.dim}Your AI coding agent will now automatically activate when you ask to find leads, scrape Google Maps, or identify website opportunities.${c.reset}`);
  console.log(`\n${c.bold}Try asking your agent:${c.reset}`);
  console.log(`  ${c.cyan}"Find all physiotherapists in Lahore and identify businesses without websites"${c.reset}\n`);
}

const MENU_OPTIONS = [
  { key: '1', targets: ['all'], label: 'All Platforms (Claude, Antigravity, Cursor, Windsurf, Copilot, Gemini) - [Recommended]' },
  { key: '2', targets: ['claude'], label: 'Claude Code CLI (CLAUDE.md)' },
  { key: '3', targets: ['antigravity', 'gemini'], label: 'Google Antigravity & Gemini CLI (AGENTS.md & GEMINI.md)' },
  { key: '4', targets: ['cursor'], label: 'Cursor IDE (.cursorrules & .cursor/rules/*.mdc)' },
  { key: '5', targets: ['windsurf'], label: 'Windsurf IDE (.windsurfrules)' },
  { key: '6', targets: ['copilot'], label: 'VS Code / GitHub Copilot (.github/copilot-instructions.md)' },
  { key: '7', targets: null, label: 'Export Standalone Prompt for Web LLMs (ChatGPT, Claude.ai)' },
];

function promptInteractive(targetDir) {
  printBanner();

  if (!process.stdin.isTTY) {
    installSkill(targetDir, ['all']);
    return;
  }

  console.log(`${c.bold}Select your AI platform or IDE:${c.reset} ${c.dim}(Use ↑/↓ arrows, Enter to select, or press 1-7)${c.reset}\n`);

  let selectedIndex = 0;
  process.stdout.write('\x1b[?25l');

  function renderMenu(isInitial) {
    if (!isInitial) {
      readline.moveCursor(process.stdout, 0, -MENU_OPTIONS.length);
    }
    MENU_OPTIONS.forEach((opt, idx) => {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      if (idx === selectedIndex) {
        process.stdout.write(`  ${c.dot} ${c.bold}[${idx + 1}] ${opt.label}${c.reset}\n`);
      } else {
        process.stdout.write(`    ${c.dim}[${idx + 1}] ${opt.label}${c.reset}\n`);
      }
    });
  }

  renderMenu(true);

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();

  function cleanup() {
    process.stdin.removeListener('keypress', onKeypress);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    process.stdout.write('\x1b[?25h');
  }

  function onKeypress(str, key) {
    if (key && key.ctrl && key.name === 'c') {
      cleanup();
      process.exit(0);
    }

    if (key && (key.name === 'q' || key.name === 'escape')) {
      cleanup();
      console.log(`\n${c.dim}Installation cancelled.${c.reset}\n`);
      process.exit(0);
    }

    if (key && (key.name === 'up' || key.name === 'k')) {
      selectedIndex = (selectedIndex - 1 + MENU_OPTIONS.length) % MENU_OPTIONS.length;
      renderMenu(false);
    } else if (key && (key.name === 'down' || key.name === 'j')) {
      selectedIndex = (selectedIndex + 1) % MENU_OPTIONS.length;
      renderMenu(false);
    } else if (key && (key.name === 'return' || key.name === 'enter' || key.name === 'space')) {
      cleanup();
      confirmChoice(selectedIndex);
    } else if (str && ['1', '2', '3', '4', '5', '6', '7'].includes(str)) {
      selectedIndex = parseInt(str, 10) - 1;
      cleanup();
      confirmChoice(selectedIndex);
    }
  }

  function confirmChoice(idx) {
    console.log('');
    const chosenOption = MENU_OPTIONS[idx];
    if (chosenOption.key === '7') {
      const promptFile = path.join(ROOT_DIR, 'adapters', 'system-prompt', 'prompt.md');
      const destPrompt = path.join(targetDir, 'lead-gen-prompt.md');
      fs.copyFileSync(promptFile, destPrompt);
      console.log(`  ${c.green}✓${c.reset} Standalone prompt exported to: ${c.bold}${destPrompt}${c.reset}`);
      console.log(`  ${c.dim}Copy and paste into ChatGPT, Claude.ai, or any web LLM instructions.${c.reset}\n`);
      process.exit(0);
      return;
    }

    installSkill(targetDir, chosenOption.targets);
  }

  process.stdin.on('keypress', onKeypress);
}

// Parse Command Line Arguments
const rawArgs = process.argv.slice(2);
let command = 'init';
let targetDir = process.cwd();
let isNonInteractive = false;

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '-v' || arg === '--version') {
    console.log(`v${PKG.version}`);
    process.exit(0);
  } else if (arg === '-y' || arg === '--yes' || arg === '--all' || arg === '-a' || arg === 'all') {
    isNonInteractive = true;
  } else if (arg === '-d' || arg === '--dir' || arg === '--target') {
    targetDir = path.resolve(rawArgs[++i] || '.');
  } else if (arg === 'init') {
    command = 'init';
  } else if (arg === 'prompt' || arg === '--prompt') {
    command = 'prompt';
  } else if (arg === '--help' || arg === '-h' || arg === 'help') {
    command = 'help';
  } else if (!arg.startsWith('-') && i === 0) {
    command = arg;
  }
}

if (!process.stdin.isTTY && command === 'init') {
  isNonInteractive = true;
}

if (command === 'help') {
  printBanner();
  console.log(`Usage:
  npx google-maps-lead-generation              Interactive setup wizard
  npx google-maps-lead-generation init         Interactive setup wizard
  npx google-maps-lead-generation init -y      Automated install for all platforms
  npx google-maps-lead-generation prompt       Export standalone prompt to ./lead-gen-prompt.md
  npx google-maps-lead-generation -v           Display version number
  npx google-maps-lead-generation -h           Display help message
`);
} else if (command === 'prompt') {
  printBanner();
  const promptFile = path.join(ROOT_DIR, 'adapters', 'system-prompt', 'prompt.md');
  const destPrompt = path.join(targetDir, 'lead-gen-prompt.md');
  fs.copyFileSync(promptFile, destPrompt);
  console.log(`  ${c.green}✓${c.reset} Exported standalone prompt to: ${c.bold}${destPrompt}${c.reset}`);
  console.log(`  ${c.dim}Copy and paste into ChatGPT, Claude.ai, or any web LLM instructions.${c.reset}\n`);
} else if (isNonInteractive) {
  printBanner();
  installSkill(targetDir, ['all']);
} else {
  promptInteractive(targetDir);
}
