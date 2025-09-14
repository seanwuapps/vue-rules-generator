<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <h1 class="text-2xl font-bold">Vue Rules Generator</h1>
      </template>

      <div class="space-y-8">
        <!-- Preferences Editor -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Preferences</h2>
          <div class="space-y-6">
            <div v-for="(category, categoryKey) in preferences" :key="categoryKey">
              <h3 class="text-lg font-medium mb-2">{{ category.title }}</h3>
              <div class="space-y-4">
                <UFormGroup v-for="(rule, ruleKey) in category.rules" :key="ruleKey" :label="rule.label">
                  <UToggle v-if="rule.control === 'toggle'" v-model="rule.value" />
                  <USelect v-if="rule.control === 'select'" v-model="rule.value" :items="rule.options" option-attribute="label" value-attribute="value" />
                  <UInput v-if="rule.control === 'text'" v-model="rule.value" />
                </UFormGroup>
              </div>
            </div>
          </div>
        </section>

        <!-- Rules File Generator -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Generate Rules File</h2>
          <div class="space-y-4">
            <UFormGroup label="Select Rule Format">
              <USelect v-model="selectedFormat" :items="ruleFormats" option-attribute="label" value-attribute="value" />
            </UFormGroup>

            <UFormGroup label="Generated Rules Preview">
              <UTextarea v-model="generatedRules" :rows="15" readonly />
            </UFormGroup>

            <UButton @click="downloadRulesFile" label="Download Rules File" />
          </div>
        </section>

        <!-- Config Import/Export -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Configuration</h2>
          <div class="flex space-x-4">
            <UButton @click="exportConfig" label="Export Config" color="gray" />
            <UButton @click="triggerFileInput" label="Import Config" color="gray" />
            <input ref="fileInput" type="file" @change="importConfig" accept=".json" class="hidden" />
          </div>
        </section>
      </div>

      <template #footer>
        <p class="text-sm text-gray-500">Built with Nuxt UI</p>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup>
import { ref } from 'vue';
import { usePreferences } from '~/composables/usePreferences';
import { useRuleGenerator } from '~/composables/useRuleGenerator';
import { useConfigManager } from '~/composables/useConfigManager';

const { preferences } = usePreferences();

const ruleFormats = [
  { label: 'GitHub Copilot', value: 'GitHub Copilot' },
  { label: 'Cursor', value: 'Cursor' },
  { label: 'Windsurf', value: 'Windsurf' },
];
const selectedFormat = ref(ruleFormats[0].value);

const { generatedRules, downloadRulesFile } = useRuleGenerator(preferences, selectedFormat);
const { fileInput, exportConfig, triggerFileInput, importConfig } = useConfigManager(preferences);
</script>
