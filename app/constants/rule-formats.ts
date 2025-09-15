export const RuleFormats = {
  GITHUB_COPILOT: 'GitHub Copilot',
  CURSOR: 'Cursor',
  WINDSURF: 'Windsurf',
} as const;

export type RuleFormat = typeof RuleFormats[keyof typeof RuleFormats];
