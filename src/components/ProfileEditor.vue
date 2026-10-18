<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import { ref } from 'vue'
import { useDialog } from '../composables/useDialog'
const dialog = ref(null)
useDialog(dialog, () => (editingBio.value = false))
const { bioDraft, editingBio, saveBio } = useWorkspace()
</script>
<template>
  <div class="overlay">
    <div ref="dialog" role="dialog" aria-modal="true" aria-label="Edit demo profile" class="sheet">
      <div class="sheet-heading">
        <span>Your everyday bio</span
        ><button aria-label="Close profile editor" @click="editingBio = false">×</button>
      </div>
      <textarea v-model="bioDraft" maxlength="160" aria-label="Profile bio"></textarea
      ><button class="publish" @click="saveBio">Save demo profile</button>
      <div class="local-note">Only changes this fictional profile in the current session.</div>
    </div>
  </div>
</template>
