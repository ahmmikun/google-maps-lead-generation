#!/usr/bin/env node

/**
 * google-maps-lead-generation CLI
 * The Autonomous Lead Generation & Website Opportunity Skill for AI Agents
 * https://github.com/ahmmikun/google-maps-lead-generation
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');
const PKG = require(path.join(ROOT_DIR, 'package.json'));

// Terminal Color & Styling Utilities
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',

  // Foreground Colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Bright Colors
  brightGreen: '\x1b[92m',
  brightCyan: '\x1b[96m',
  brightYellow: '\x1b[93m',
  brightMagenta: '\x1b[95m',
  brightWhite: '\x1b[97m',

  // Background
  bgCyan: '\x1b[46m\x1b[30m',
  bgMagenta: '\x1b[45m\x1b[37m',
  bgDark: '\x1b[100m\x1b[37m',
};

function printBanner() {
  const logo = `
${c.brightCyan}${c.bold}  ██████╗ ███╗   ███╗ █████╗ ██████╗ ███████╗
 ██╔════╝ ████╗ ████║██╔══██╗██╔══██╗██╔════╝
 ██║  ███╗██╔████╔██║███████║██████╔╝███████╗
 ██║   ██║██║╚██╔╝██║██╔══██║██╔═══╝ ╚════██║
 ╚██████╔╝██║ ╚═╝ ██║██║  ██║██║     ███████║
  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝${c.reset}
  ${c.brightMagenta}${c.bold}LEAD GENERATION & WEBSITE OPPORTUNITY ENGINE${c.reset}
  ${c.dim}Core Powered by ScrapeGraphAI · v${PKG.version}${c.reset}
`;
  console.log(logo);
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
  const resolvedTarget = path.resolve(targetDir);
  console.log(`\n${c.bold}Target Workspace:${c.reset} ${c.brightCyan}${resolvedTarget}${c.reset}\n`);

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
  results.push({ name: 'Canonical Agent Skill', path: '.agents/skills/google-maps-lead-generation/' });

  // 2. Claude Code (CLAUDE.md)
  if (shouldInstallAll || targets.includes('claude')) {
    const dest = path.join(targetDir, 'CLAUDE.md');
    const src = path.join(ROOT_DIR, 'CLAUDE.md');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push({ name: 'Claude Code Directives', path: 'CLAUDE.md' });
    }
  }

  // 3. Google Antigravity & Universal Agents (AGENTS.md)
  if (shouldInstallAll || targets.includes('antigravity')) {
    const dest = path.join(targetDir, 'AGENTS.md');
    const src = path.join(ROOT_DIR, 'AGENTS.md');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push({ name: 'Antigravity / Universal Agent', path: 'AGENTS.md' });
    }
  }

  // 4. Cursor IDE (.cursorrules & .cursor/rules/)
  if (shouldInstallAll || targets.includes('cursor')) {
    const cursorRulesDest = path.join(targetDir, '.cursorrules');
    const cursorRulesSrc = path.join(ROOT_DIR, '.cursorrules');
    if (fs.existsSync(cursorRulesSrc)) {
      fs.copyFileSync(cursorRulesSrc, cursorRulesDest);
      results.push({ name: 'Cursor Legacy Rules', path: '.cursorrules' });
    }

    const mdcDest = path.join(targetDir, '.cursor', 'rules', 'google-maps-lead-generation.mdc');
    const mdcSrc = path.join(ROOT_DIR, '.cursor', 'rules', 'google-maps-lead-generation.mdc');
    if (fs.existsSync(mdcSrc)) {
      fs.mkdirSync(path.dirname(mdcDest), { recursive: true });
      fs.copyFileSync(mdcSrc, mdcDest);
      results.push({ name: 'Cursor v0.40+ MDC Rule', path: '.cursor/rules/google-maps-lead-generation.mdc' });
    }
  }

  // 5. Windsurf IDE (.windsurfrules)
  if (shouldInstallAll || targets.includes('windsurf')) {
    const dest = path.join(targetDir, '.windsurfrules');
    const src = path.join(ROOT_DIR, '.windsurfrules');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push({ name: 'Windsurf Cascade Rules', path: '.windsurfrules' });
    }
  }

  // 6. VS Code / GitHub Copilot (.github/copilot-instructions.md)
  if (shouldInstallAll || targets.includes('copilot')) {
    const dest = path.join(targetDir, '.github', 'copilot-instructions.md');
    const src = path.join(ROOT_DIR, '.github', 'copilot-instructions.md');
    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      results.push({ name: 'GitHub Copilot Directives', path: '.github/copilot-instructions.md' });
    }
  }

  // 7. Gemini CLI (GEMINI.md)
  if (shouldInstallAll || targets.includes('gemini')) {
    const dest = path.join(targetDir, 'GEMINI.md');
    const src = path.join(ROOT_DIR, 'GEMINI.md');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push({ name: 'Gemini CLI Instructions', path: 'GEMINI.md' });
    }
  }

  // 8. Cline / Roo Code (.clinerules)
  if (shouldInstallAll || targets.includes('cline')) {
    const dest = path.join(targetDir, '.clinerules');
    const src = path.join(ROOT_DIR, '.clinerules');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      results.push({ name: 'Cline / Roo Code Rules', path: '.clinerules' });
    }
  }

  // Render stylized installation summary box
  console.log(`╭${'─'.repeat(66)}╮`);
  results.forEach((item) => {
    const label = `${item.name.padEnd(28)}`;
    const line = `  ${c.brightGreen}✔${c.reset}  ${c.bold}${label}${c.reset} ${c.dim}→ ${item.path}${c.reset}`;
    console.log(`│ ${line.padEnd(76)} │`);
  });
  console.log(`╰${'─'.repeat(66)}╯\n`);

  console.log(`${c.brightGreen}${c.bold}🎉 Setup Complete! Skill successfully activated.${c.reset}`);
  console.log(`${c.dim}Your AI coding assistant will now automatically recognize Google Maps lead generation and website audit tasks.${c.reset}\n`);

  console.log(`${c.bold}⚡ Quick Test Prompt:${c.reset}`);
  console.log(`  ${c.brightCyan}"Find all physiotherapists in Lahore and generate a CSV of businesses without websites"${c.reset}\n`);
}

const MENU_OPTIONS = [
  { key: '1', targets: ['all'], label: '🚀 All Platforms (Claude, Antigravity, Cursor, Windsurf, Copilot, Gemini)' },
  { key: '2', targets: ['claude'], label: '🤖 Claude Code CLI (CLAUDE.md)' },
  { key: '3', targets: ['antigravity', 'gemini'], label: '🪐 Google Antigravity & Gemini CLI (AGENTS.md & GEMINI.md)' },
  { key: '4', targets: ['cursor'], label: '⚡ Cursor IDE (.cursorrules & .cursor/rules/*.mdc)' },
  { key: '5', targets: ['windsurf'], label: '🌊 Windsurf Cascade (.windsurfrules)' },
  { key: '6', targets: ['copilot'], label: '🐙 VS Code / GitHub Copilot (.github/copilot-instructions.md)' },
  { key: '7', targets: ['cline'], label: '🦾 Cline / Roo Code (.clinerules)' },
  { key: '8', targets: null, label: '💬 Export Standalone System Prompt for ChatGPT / Claude.ai' },
];

function promptInteractive(targetDir) {
  printBanner();

  if (!process.stdin.isTTY) {
    installSkill(targetDir, ['all']);
    return;
  }

  console.log(`${c.bold}Select your AI coding assistant or editor:${c.reset} ${c.dim}(Use ↑/↓, Enter to select, or press 1-8)${c.reset}\n`);

  let selectedIndex = 0;
  process.stdout.write('\x1b[?25l'); // Hide cursor

  function renderMenu(isInitial) {
    if (!isInitial) {
      readline.moveCursor(process.stdout, 0, -MENU_OPTIONS.length);
    }
    MENU_OPTIONS.forEach((opt, idx) => {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      if (idx === selectedIndex) {
        process.stdout.write(`  ${c.brightCyan}❯${c.reset} ${c.bold}${c.brightWhite}[${idx + 1}] ${opt.label}${c.reset}\n`);
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
    process.stdout.write('\x1b[?25h'); // Restore cursor
  }

  function onKeypress(str, key) {
    if (key && key.ctrl && key.name === 'c') {
      cleanup();
      process.exit(0);
    }

    if (key && (key.name === 'q' || key.name === 'escape')) {
      cleanup();
      console.log(`\n${c.dim}Operation cancelled.${c.reset}\n`);
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
    } else if (str && ['1', '2', '3', '4', '5', '6', '7', '8'].includes(str)) {
      selectedIndex = parseInt(str, 10) - 1;
      cleanup();
      confirmChoice(selectedIndex);
    }
  }

  function confirmChoice(idx) {
    console.log('');
    const chosenOption = MENU_OPTIONS[idx];
    if (chosenOption.key === '8') {
      exportPrompt(targetDir);
      return;
    }

    installSkill(targetDir, chosenOption.targets);
  }

  process.stdin.on('keypress', onKeypress);
}

function exportPrompt(targetDir) {
  const promptFile = path.join(ROOT_DIR, 'adapters', 'system-prompt', 'prompt.md');
  const destPrompt = path.join(targetDir, 'lead-gen-prompt.md');
  fs.copyFileSync(promptFile, destPrompt);
  console.log(`\n  ${c.brightGreen}✔${c.reset} ${c.bold}Standalone System Prompt exported to:${c.reset} ${c.brightCyan}${destPrompt}${c.reset}`);
  console.log(`  ${c.dim}Copy and paste into ChatGPT, Claude.ai, Gemini Web, or any web LLM instructions.${c.reset}\n`);
}

function showStatus(targetDir) {
  printBanner();
  console.log(`${c.bold}Workspace Audit for:${c.reset} ${c.brightCyan}${path.resolve(targetDir)}${c.reset}\n`);

  const checks = [
    { name: 'Canonical Agent Skill', path: '.agents/skills/google-maps-lead-generation/SKILL.md' },
    { name: 'Claude Code Directives', path: 'CLAUDE.md' },
    { name: 'Google Antigravity Rules', path: 'AGENTS.md' },
    { name: 'Cursor Legacy Rules', path: '.cursorrules' },
    { name: 'Cursor v0.40+ MDC Rule', path: '.cursor/rules/google-maps-lead-generation.mdc' },
    { name: 'Windsurf Cascade Rules', path: '.windsurfrules' },
    { name: 'GitHub Copilot Instructions', path: '.github/copilot-instructions.md' },
    { name: 'Gemini CLI Instructions', path: 'GEMINI.md' },
    { name: 'Cline / Roo Code Rules', path: '.clinerules' },
  ];

  console.log(`╭${'─'.repeat(66)}╮`);
  checks.forEach((item) => {
    const fullPath = path.join(targetDir, item.path);
    const installed = fs.existsSync(fullPath);
    const mark = installed ? `${c.brightGreen}✔ INSTALLED${c.reset}` : `${c.dim}○ NOT FOUND${c.reset}`;
    const line = `  ${mark.padEnd(20)} ${c.bold}${item.name.padEnd(28)}${c.reset} ${c.dim}${item.path}${c.reset}`;
    console.log(`│ ${line.padEnd(76)} │`);
  });
  console.log(`╰${'─'.repeat(66)}╯\n`);
}

function generateQueryMatrix(niche, location) {
  printBanner();
  console.log(`${c.bold}Geographic Decomposition for:${c.reset} ${c.brightCyan}${niche}${c.reset} in ${c.brightMagenta}${location}${c.reset}\n`);

  const commonAreas = [
    'Downtown / City Center',
    'Commercial Business District',
    'North Sector / Extension',
    'South Sector / Ring Road',
    'East Suburb / Medical Hub',
    'West Sector / Residential Estate',
    'Cantonment / Defense Area',
    'Industrial Zone & IT Corridor',
  ];

  console.log(`${c.bold}Generated 2-Tier Query Matrix:${c.reset}`);
  console.log(`╭${'─'.repeat(66)}╮`);
  console.log(`│ ${c.dim}# Tier 1: Primary Niche × High-Density Sub-Localities${c.reset}`.padEnd(76) + ' │');
  commonAreas.forEach((area, i) => {
    const q = `${niche} ${area} ${location}`;
    console.log(`│   ${c.brightCyan}${i + 1}.${c.reset} ${q}`.padEnd(74) + ' │');
  });
  console.log(`│ ${''.padEnd(66)} │`);
  console.log(`│ ${c.dim}# Tier 2: Broader Terminology × Target City${c.reset}`.padEnd(76) + ' │');
  console.log(`│   ${c.brightMagenta}9.${c.reset} ${niche} clinic ${location}`.padEnd(74) + ' │');
  console.log(`│  ${c.brightMagenta}10.${c.reset} best ${niche} ${location}`.padEnd(74) + ' │');
  console.log(`╰${'─'.repeat(66)}╯\n`);
  console.log(`${c.dim}Pass these queries into your ScrapeGraphAI pipeline or copy to queries.txt${c.reset}\n`);
}

// Command Line Argument Parsing
const rawArgs = process.argv.slice(2);
let command = 'init';
let targetDir = process.cwd();
let isNonInteractive = false;
let queryNiche = null;
let queryLoc = null;

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
  } else if (arg === 'status' || arg === 'check') {
    command = 'status';
  } else if (arg === 'query' || arg === 'generate') {
    command = 'query';
    queryNiche = rawArgs[++i] || 'physiotherapists';
    queryLoc = rawArgs[++i] || 'Lahore';
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

switch (command) {
  case 'help':
    printBanner();
    console.log(`Usage:
  ${c.brightCyan}npx google-maps-lead-generation${c.reset}                    Interactive setup wizard
  ${c.brightCyan}npx google-maps-lead-generation init${c.reset}               Launch setup wizard
  ${c.brightCyan}npx google-maps-lead-generation init -y${c.reset}            Install all platform adapters silently
  ${c.brightCyan}npx google-maps-lead-generation status${c.reset}             Audit current workspace adapter status
  ${c.brightCyan}npx google-maps-lead-generation query <niche> <loc>${c.reset} Generate geographic query matrix
  ${c.brightCyan}npx google-maps-lead-generation prompt${c.reset}             Export standalone prompt to ./lead-gen-prompt.md
  ${c.brightCyan}npx google-maps-lead-generation -v${c.reset}                 Display version
  ${c.brightCyan}npx google-maps-lead-generation -h${c.reset}                 Display this help menu
`);
    break;

  case 'status':
    showStatus(targetDir);
    break;

  case 'query':
    generateQueryMatrix(queryNiche, queryLoc);
    break;

  case 'prompt':
    printBanner();
    exportPrompt(targetDir);
    break;

  case 'init':
  default:
    if (isNonInteractive) {
      printBanner();
      installSkill(targetDir, ['all']);
    } else {
      promptInteractive(targetDir);
    }
    break;
}
