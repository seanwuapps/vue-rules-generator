import type { Ref } from 'vue';

export interface Rule {
  label: string;
  value: boolean | string;
  control: 'toggle' | 'select' | 'text';
  options?: { label: string; value: string }[];
}

export interface PreferenceCategory {
  title: string;
  enabled: boolean;
  rules: Record<string, Rule>;
}

export type Preferences = Record<string, PreferenceCategory>;

export type PreferencesRef = Ref<Preferences>;
