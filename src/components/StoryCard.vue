<script setup>
import { useWorkspace } from '../composables/useWorkspace'
defineProps({ p: { type: Object, required: true } })
const { isFollowing, toggleFollow, toggleLike, toggleSave, openPost, openCreator, art } =
  useWorkspace()
</script>
<template>
  <div class="post-card">
    <div class="author-row">
      <button
        class="avatar"
        :class="p.color"
        :aria-label="'View ' + p.author + ' profile'"
        @click="openCreator(p)"
      >
        {{ p.initials }}</button
      ><button class="author-info" @click="openCreator(p)">
        <span>{{ p.author }}</span
        ><span>{{ p.time }} · {{ p.topic }}</span></button
      ><button
        v-if="p.author !== 'Alex Morgan'"
        class="follow-btn"
        :class="{ following: isFollowing(p.author) }"
        @click="toggleFollow(p.author)"
      >
        {{ isFollowing(p.author) ? 'Following' : 'Follow ＋' }}
      </button>
    </div>
    <button class="image-button" :aria-label="'Open story: ' + p.title" @click="openPost(p)">
      <img class="post-art" :src="art(p.art)" :alt="p.title" />
      <div class="image-label">THE ART OF EVERYDAY</div>
    </button>
    <div class="post-tools">
      <button
        :class="{ liked: p.liked }"
        :aria-label="p.liked ? 'Unlike story' : 'Like story'"
        @click="toggleLike(p)"
      >
        <span>{{ p.liked ? '♥' : '♡' }}</span
        >{{ p.likes }}</button
      ><button aria-label="Open comments" @click="openPost(p)">
        <span>◯</span>{{ p.comments.length }}</button
      ><button
        class="save"
        :class="{ saved: p.saved }"
        :aria-label="p.saved ? 'Remove from saved' : 'Save story'"
        @click="toggleSave(p)"
      >
        <span>{{ p.saved ? '◆' : '◇' }}</span>
      </button>
    </div>
    <button class="story-summary" @click="openPost(p)">
      <span class="story-title">{{ p.title }}</span
      ><span class="story-excerpt">{{ p.excerpt }}</span>
    </button>
    <div class="hashtags">{{ p.tags }}</div>
  </div>
</template>
