<script setup>
import { useWorkspace } from './composables/useWorkspace'
import { RouterView } from 'vue-router'
import StoryComposer from './components/StoryComposer.vue'
import ProfileEditor from './components/ProfileEditor.vue'
import { useRouteSync } from './composables/useRouteSync'
useRouteSync()
const {
  profileIsMe,
  profileTab,
  editingBio,
  composer,
  notice,
  goProfile,
  goSaved,
  goFeed,
  openSearch,
  openComposer,
  screen,
  backToCommunity,
} = useWorkspace()
</script>
<template>
  <div class="app-shell">
    <div class="topbar">
      <button
        v-if="screen === 'detail'"
        class="icon-btn"
        aria-label="Back to community"
        @click="backToCommunity()"
      >
        ←
      </button>
      <div v-else class="wordmark">luma<span>✳</span></div>
      <span v-if="screen === 'detail'" class="top-title">A little inspiration</span>
      <div class="top-actions">
        <button class="icon-btn" aria-label="Search community" @click="openSearch">⌕</button
        ><button class="avatar me small" aria-label="Open my profile" @click="goProfile">AM</button>
      </div>
    </div>
    <div class="demo-strip">REBUILT PORTFOLIO DEMO · FICTIONAL CONTENT</div>
    <RouterView />

    <div class="bottom-nav">
      <button :class="{ active: screen === 'feed' }" @click="goFeed"><span>⌂</span>Discover</button
      ><button @click="openComposer"><span>⊕</span>Create</button
      ><button
        :class="{ active: screen === 'profile' && profileIsMe && profileTab === 'Saved' }"
        @click="goSaved"
      >
        <span>◇</span>Saved</button
      ><button
        :class="{ active: screen === 'profile' && profileIsMe && profileTab === 'Stories' }"
        @click="goProfile"
      >
        <span>◉</span>Profile
      </button>
    </div>
    <div class="footer-note">
      Independent reconstruction · All people, content and metrics are fictional.
    </div>
    <StoryComposer v-if="composer" />
    <ProfileEditor v-if="editingBio" />
    <div v-if="notice" class="toast" role="status">{{ notice }}</div>
  </div>
</template>
