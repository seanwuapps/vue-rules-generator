<template>
  <div>
    <AppHeader />
    <UContainer>
      <UCard class="mt-10">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Rules Configuration</h2>
          </div>
        </template>

        <div class="space-y-8">
          <!-- Preferences Editor -->
          <section>
            <h2 class="text-xl font-semibold mb-4">Preferences</h2>
            <div class="space-y-6">
              <div
                v-for="(category, categoryKey) in preferences"
                :key="categoryKey"
              >
                <h3 class="text-lg font-medium mb-2">{{ category.title }}</h3>
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
              </div>
            </div>
          </section>

          <!-- Rules File Generator -->
          <section>
            <h2 class="text-xl font-semibold mb-4">Generate Rules File</h2>
            <div class="space-y-4">
              <UFormGroup label="Select Rule Format">
                <USelect
                  v-model="selectedFormat"
                  :items="ruleFormats"
                  option-attribute="label"
                  value-attribute="value"
                />
              </UFormGroup>

              <UFormGroup label="Generated Rules Preview">
                <UTextarea v-model="generatedRules" :rows="15" readonly />
              </UFormGroup>

              <UButton @click="downloadRulesFile" label="Download Rules File" />
            </div>
          </section>
        </div>

        <template #footer>
          <p class="text-sm text-gray-500">Built with Nuxt UI</p>
        </template>
      </UCard>
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
