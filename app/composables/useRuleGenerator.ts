import { computed, type Ref } from "vue";
import type { PreferencesRef } from "../types";
import { RuleFormats, type RuleFormat } from "~/constants/rule-formats";

export const useRuleGenerator = (
  preferences: PreferencesRef,
  selectedFormat: Ref<RuleFormat>
) => {
  const generatedRules = computed(() => {
    let content = `# Vue project guidelines

You are an expert in Vue 3, TypeScript and Frontend Development. Follow the rules below when you code:

`;
    for (const categoryKey in preferences.value) {
      const category = preferences.value[categoryKey];
      if (category && category.enabled) {
        content += `## ${category.title}\n\n`;
        for (const ruleKey in category.rules) {
          const rule = category.rules[ruleKey];
          if (rule && rule.ruleGenerate) {
            const generatedRule = rule.ruleGenerate(rule.value);
            if (generatedRule) {
              content += `- ${generatedRule}\n`;
            }
          }
        }

        if (category.customInstructionsEnabled && category.customInstructions && category.customInstructions.trim()) {
          content += `${category.customInstructions.trim()}\n`;
        }

        content += "\n";
      }
    }
    return content;
  });

  const downloadRulesFile = () => {
    const getFilename = () => {
      switch (selectedFormat.value) {
        case RuleFormats.GITHUB_COPILOT:
          return "vue.instructions.md";
        default:
          return "vue.rules.md";
      }
    };

    const blob = new Blob([generatedRules.value], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { generatedRules, downloadRulesFile };
};
