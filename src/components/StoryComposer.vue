<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import { ref } from 'vue'
import { useDialog } from '../composables/useDialog'
const dialog = ref(null)
useDialog(dialog, () => (composer.value = false))
const { topics, composer, draft, draftError, artNames, publish, art } = useWorkspace()
</script>
<template>
  <div class="overlay" @click.self="composer = false">
    <div ref="dialog" role="dialog" aria-modal="true" aria-label="Create demo story" class="sheet">
      <div class="sheet-heading">
        <span>Share a little moment</span
        ><button aria-label="Close create story" @click="composer = false">×</button>
      </div>
      <div class="sheet-note">Create a fictional story for this demo session.</div>
      <input
        v-model="draft.title"
        maxlength="70"
        placeholder="Give your story a title"
        aria-label="Story title"
      /><textarea
        v-model="draft.body"
        maxlength="600"
        placeholder="What made this moment special?"
        aria-label="Story text"
      ></textarea>
      <div class="sheet-label">Choose an original illustration</div>
      <div class="art-choices">
        <button
          v-for="a in artNames"
          :key="a"
          :class="{ selected: draft.art === a }"
          :aria-label="'Select ' + a + ' illustration'"
          @click="draft.art = a"
        >
          <img :src="art(a)" alt="" />
        </button>
      </div>
      <div class="compose-topics">
        <button
          v-for="t in topics.slice(1)"
          :key="t"
          :class="{ selected: draft.topic === t }"
          @click="draft.topic = t"
        >
          {{ t }}
        </button>
      </div>
      <span v-if="draftError" class="error" role="alert">{{ draftError }}</span
      ><button class="publish" @click="publish">Share in local demo →</button>
      <div class="local-note">No account, upload or real publication.</div>
    </div>
  </div>
</template>
