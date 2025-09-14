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
              <h3 class="text-lg font-medium">{{ category.title }} <span class="text-sm font-normal text-gray-500 dark:text-gray-400">({{ Object.keys(category.rules).length }} rules)</span></h3>
              <USwitch v-model="category.enabled" />
            </div>
          </template>

          <div class="space-y-4">
            <UFormField
              v-for="(rule, ruleKey) in category.rules"
              :key="ruleKey"
              :label="rule.label"
            >
              <USwitch
                v-if="rule.control === 'toggle'"
                v-model="rule.value"
              />
              <USelect
                v-if="rule.control === 'select'"
                v-model="rule.value"
                :items="rule.options"
                :label="rule.label"
              />
              <UInput
                v-if="rule.control === 'text'"
                v-model="rule.value"
              />
            </UFormField>
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

            <UFormField label="Generated Rules Preview">
              <UTextarea v-model="generatedRules" :rows="15" readonly />
            </UFormField>

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

const { preferences } = usePreferences();

const ruleFormats = [
  { label: "GitHub Copilot", value: "GitHub Copilot" },
  { label: "Cursor", value: "Cursor" },
  { label: "Windsurf", value: "Windsurf" },
];
const selectedFormat = ref(ruleFormats[0].value);

const { generatedRules, downloadRulesFile } = useRuleGenerator(
  preferences,
  selectedFormat
);
</script>
