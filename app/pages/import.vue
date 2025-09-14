<template>
  <div>
    <AppHeader />
    <UContainer>
      <UCard class="mt-10">
        <template #header>
          <h1 class="text-2xl font-bold">Import Configuration</h1>
        </template>

        <div class="space-y-4">
          <UFileUpload
            highlight
            label="Drop .json file here or click to upload"
            description="The imported preferences will be applied immediately."
            accept=".json"
            @change="onFileChange"
          />
          <UButton @click="onSubmit" :disabled="!selectedFile"
            >Apply config</UButton
          >
        </div>

        <template #footer>
          <p class="text-sm text-gray-500">
            The imported preferences will be applied immediately.
          </p>
        </template>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import AppHeader from "~/components/AppHeader.vue";
import { usePreferences } from "~/composables/usePreferences";
import { useConfigManager } from "~/composables/useConfigManager";

const { preferences } = usePreferences();
const { importConfig } = useConfigManager(preferences);

const selectedFile: Ref<File | null> = ref(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files?.[0] || null;
};

const onSubmit = () => {
  if (selectedFile.value) {
    importConfig(selectedFile.value);
  }
};
</script>
