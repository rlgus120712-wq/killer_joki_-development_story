<template>
  <v-list-item
    :href="link"
    target="_blank"
    :prepend-icon="icon"
    :title="title"
    :subtitle="caption"
  >
  </v-list-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
