import { ref, type Ref } from 'vue';
import type { PreferencesRef } from '../types';

export const useConfigManager = (preferences: PreferencesRef) => {
  const fileInput: Ref<HTMLInputElement | null> = ref(null);

  const exportConfig = () => {
    const configToExport: Record<string, Record<string, boolean | string>> = {};
    for (const categoryKey in preferences.value) {
      const category = preferences.value[categoryKey];
      if (category) {
        configToExport[categoryKey] = {};
        for (const ruleKey in category.rules) {
          const rule = category.rules[ruleKey];
          if (rule) {
            configToExport[categoryKey][ruleKey] = rule.value;
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

  const triggerFileInput = () => {
    if (fileInput.value) {
      fileInput.value.click();
    }
  };

  const importConfig = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          try {
            const importedValues = JSON.parse(e.target.result);
            for (const categoryKey in importedValues) {
              const category = preferences.value[categoryKey];
              if (category) {
                for (const ruleKey in importedValues[categoryKey]) {
                  const rule = category.rules[ruleKey];
                  if (rule) {
                    rule.value = importedValues[categoryKey][ruleKey];
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error parsing JSON file:', error);
            // Optionally, show a toast notification for the error
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return { fileInput, exportConfig, triggerFileInput, importConfig };
};
