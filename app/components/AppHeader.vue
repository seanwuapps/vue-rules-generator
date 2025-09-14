<template>
  <header
    class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800"
  >
    <div class="flex items-center space-x-8">
      <ULink to="/" class="text-xl font-bold">Vue Rules Generator</ULink>
      <nav class="flex items-center space-x-4">
        <ULink to="/import">Import Config</ULink>
      </nav>
    </div>
    <UButton @click="exportConfig"> Export Config </UButton>
  </header>
</template>

<script setup>
import { usePreferences } from "~/composables/usePreferences";
import { useConfigManager } from "~/composables/useConfigManager";

const { preferences } = usePreferences();
const { exportConfig } = useConfigManager(preferences);
</script>
