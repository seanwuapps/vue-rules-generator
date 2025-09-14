import { computed, type Ref } from 'vue';
import type { PreferencesRef } from '../types';

export const useRuleGenerator = (preferences: PreferencesRef, selectedFormat: Ref<string>) => {
  const generatedRules = computed(() => {
    let content = `# ${selectedFormat.value} Rules\n\n`;
    for (const categoryKey in preferences.value) {
      const category = preferences.value[categoryKey];
      if (category && category.enabled) {
        content += `## ${category.title}\n\n`;
        for (const ruleKey in category.rules) {
          const rule = category.rules[ruleKey];
          if (rule) {
            let value = rule.value;
            if (typeof value === 'boolean') {
              value = value ? 'Yes' : 'No';
            }
            content += `- ${rule.label}: ${value}\n`;
          }
        }
        content += '\n';
      }
    }
    return content;
  });

  const downloadRulesFile = () => {
    const blob = new Blob([generatedRules.value], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { generatedRules, downloadRulesFile };
};
