import { ref, type Ref } from 'vue';
import type { PreferencesRef } from '../types';

export const useConfigManager = (preferences: PreferencesRef) => {
  const exportConfig = () => {
    const configToExport: Record<string, any> = {};
    for (const categoryKey in preferences.value) {
      const category = preferences.value[categoryKey];
      if (category) {
        configToExport[categoryKey] = {
          enabled: category.enabled,
          rules: {},
        };
        for (const ruleKey in category.rules) {
          const rule = category.rules[ruleKey];
          if (rule) {
            configToExport[categoryKey].rules[ruleKey] = rule.value;
          }
        }
      }
    }
    const blob = new Blob([JSON.stringify(configToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preferences.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importConfig = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          try {
            const importedValues = JSON.parse(e.target.result);
            for (const categoryKey in importedValues) {
              const category = preferences.value[categoryKey];
              if (category) {
                if (typeof importedValues[categoryKey].enabled === 'boolean') {
                  category.enabled = importedValues[categoryKey].enabled;
                }
                const importedRules = importedValues[categoryKey].rules || importedValues[categoryKey];
                for (const ruleKey in importedRules) {
                  const rule = category.rules[ruleKey];
                  if (rule) {
                    rule.value = importedRules[ruleKey];
                  }
                }
              }
            }
            await navigateTo('/');
          } catch (error) {
            console.error('Error parsing JSON file:', error);
            // Optionally, show a toast notification for the error
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return { exportConfig, importConfig };
};
