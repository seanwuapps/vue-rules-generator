<template>
  <div>
    <AppHeader />
    <UContainer>
      <div class="mt-10 space-y-8">
        <UCard
          v-for="(category, categoryKey) in preferences"
          :key="categoryKey"
          :ui="{ body: { padding: 'px-4 py-5 sm:p-6' } }"
        >
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">
                {{ category.title }}
                <span
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                  >({{ Object.keys(category.rules).length }} rules)</span
                >
              </h3>
              <USwitch v-model="category.enabled" />
            </div>
          </template>

          <div class="space-y-4">
            <div
              v-for="(rule, ruleKey) in category.rules"
              :key="ruleKey"
              class="flex items-center justify-between w-full"
            >
              <label class="text-sm font-medium text-gray-900 dark:text-white">{{ rule.label }}</label>
              <div>
                <USwitch v-if="rule.control === 'toggle'" v-model="rule.value" />
                <USelect
                  v-if="rule.control === 'select'"
                  v-model="rule.value"
                  :items="rule.options"
                />
                <UInput v-if="rule.control === 'text'" v-model="rule.value" />
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 my-4" />
            <div class="flex items-center justify-between w-full">
              <label class="text-sm font-medium text-gray-900 dark:text-white">Custom Instructions</label>
              <USwitch v-model="category.customInstructionsEnabled" />
            </div>
            <ClientOnly v-if="category.customInstructionsEnabled">
              <MdEditor
                v-model="category.customInstructions"
                :theme="colorMode.value"
                language="en-US"
                placeholder="Add any additional instructions for this category..."
                class="mt-2"
              />
            </ClientOnly>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Generate Rules File</h2>
          </template>

          <div class="space-y-4">
            <UFormField label="Select Rule Format">
              <USelect
                v-model="selectedFormat"
                :items="ruleFormats"
                option-attribute="label"
                value-attribute="value"
              />
            </UFormField>

            <h3>Generated Rules Preview</h3>
            <pre class="p-4">{{ generatedRules }}</pre>

            <UButton @click="downloadRulesFile" label="Download Rules File" />
          </div>

          <template #footer>
            <p class="text-sm text-gray-500">Built with Nuxt UI</p>
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHeader from "~/components/AppHeader.vue";
import { usePreferences } from "~/composables/usePreferences";
import { useRuleGenerator } from "~/composables/useRuleGenerator";
import { RuleFormats } from "~/constants/rule-formats";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const colorMode = useColorMode();
const { preferences } = usePreferences();

const ruleFormats = [
  { label: "GitHub Copilot", value: RuleFormats.GITHUB_COPILOT },
  { label: "Cursor", value: RuleFormats.CURSOR },
  { label: "Windsurf", value: RuleFormats.WINDSURF },
];
const selectedFormat = ref(ruleFormats[0].value);

const { generatedRules, downloadRulesFile } = useRuleGenerator(
  preferences,
  selectedFormat
);
</script>
