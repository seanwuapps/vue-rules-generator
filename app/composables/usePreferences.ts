import { ref } from 'vue';
import type { Preferences, PreferencesRef } from '../types';

// Define the state outside the composable function to create a singleton
const preferencesState: PreferencesRef = ref<Preferences>({
  vueProject: {
    title: 'Vue Project Rules',
    rules: {
      scriptSetup: {
        label: 'Enforce <script setup>',
        value: true,
        control: 'toggle',
      },
      componentNaming: {
        label: 'Component Naming Convention',
        value: 'PascalCase',
        control: 'select',
        options: [{ label: 'PascalCase', value: 'PascalCase' }, { label: 'kebab-case', value: 'kebab-case' }],
      },
      useComposables: {
        label: 'Use Composables for Reusable Logic',
        value: true,
        control: 'toggle',
      },
    },
  },
  linting: {
    title: 'Linting & Formatting',
    rules: {
      semicolons: {
        label: 'Use Semicolons',
        value: true,
        control: 'toggle',
      },
      quotes: {
        label: 'Quote Style',
        value: 'single',
        control: 'select',
        options: [{ label: 'single', value: 'single' }, { label: 'double', value: 'double' }],
      },
    },
  },
  fileOrganization: {
    title: 'File Organization',
    rules: {
      composablesDir: {
        label: 'Separate Composables Directory',
        value: true,
        control: 'toggle',
      },
      autoImports: {
        label: 'Enable Auto-Imports',
        value: true,
        control: 'toggle',
      },
    },
  },
});

export const usePreferences = (): { preferences: PreferencesRef } => {
  return { preferences: preferencesState };
};
