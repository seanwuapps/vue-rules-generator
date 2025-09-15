import { ref } from "vue";
import type { Preferences, PreferencesRef } from "../types";

// Define the state outside the composable function to create a singleton
const preferencesState: PreferencesRef = ref<Preferences>({
  vueProject: {
    title: "Vue Project Rules",
    enabled: true,
    customInstructions: "",
    rules: {
      scriptSetup: {
        label: "Enforce <script setup>",
        value: true,
        control: "toggle",
        ruleGenerate: (value: boolean | string) => {
          return value ? "You should ALWAYS use `script setup`" : "";
        },
      },
      componentNaming: {
        label: "Component Naming Convention",
        value: "PascalCase",
        control: "select",
        options: [
          { label: "PascalCase", value: "PascalCase" },
          { label: "kebab-case", value: "kebab-case" },
        ],
        ruleGenerate: (value: boolean | string) =>
          `Component names should be in ${value}`,
      },
      useComposables: {
        label: "Use Composables for Reusable Logic",
        value: true,
        control: "toggle",
        ruleGenerate: (value: boolean | string) =>
          value ? "Use composables for reusable logic" : "",
      },
      preferRefOverReactive: {
        label: "Prefer ref over reactive",
        value: true,
        control: "toggle",
        ruleGenerate: (value: boolean | string) =>
          value
            ? "Prefer using `ref` over `reactive` for `.value` consistency and to avoid potential pitfalls with reactivity loss when destructuring."
            : "",
      },
    },
  },
  linting: {
    title: "Linting & Formatting",
    enabled: true,
    customInstructions: "",
    rules: {
      semicolons: {
        label: "Use Semicolons",
        value: true,
        control: "toggle",
        ruleGenerate: (value: boolean | string) =>
          value
            ? "Use semicolons at the end of statements"
            : "Do not use semicolons at the end of statements",
      },
      quotes: {
        label: "Quote Style",
        value: "single",
        control: "select",
        options: [
          { label: "single", value: "single" },
          { label: "double", value: "double" },
        ],
        ruleGenerate: (value: boolean | string) =>
          `Use ${value} quotes for strings`,
      },
    },
  },
  fileOrganization: {
    title: "File Organization",
    enabled: true,
    customInstructions: "",
    rules: {
      composablesDir: {
        label: "Separate Composables Directory",
        value: true,
        control: "toggle",
        ruleGenerate: (value: boolean | string) =>
          value
            ? "Keep composables in a dedicated `composables` directory"
            : "",
      },
      autoImports: {
        label: "Enable Auto-Imports",
        value: true,
        control: "toggle",
        ruleGenerate: (value: boolean | string) =>
          value ? "Enable auto-imports for components and composables" : "",
      },
    },
  },
  uiDevelopment: {
    title: "UI Development",
    enabled: true,
    customInstructions: "",
    rules: {
      uiLibraryDocs: {
        label: "UI Library Documentation URL",
        value: "https://ui.nuxt.com/components",
        control: "text",
        ruleGenerate: (value: boolean | string) => {
          if (typeof value === "string" && value.trim()) {
            return `ALWAYS read the documentation site ${value} before implementing UI element to ensure correct usage`;
          }
          return "";
        },
      },
    },
  },
});

export const usePreferences = (): { preferences: PreferencesRef } => {
  return { preferences: preferencesState };
};
