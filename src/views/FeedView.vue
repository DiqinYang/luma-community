<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import StoryCard from '../components/StoryCard.vue'
const {
  resetFeedFilters,
  closeSearch,
  feedTab,
  topics,
  topic,
  query,
  searchOpen,
  feedPosts,
  openComposer,
} = useWorkspace()
</script>
<template>
  <div class="feed-page">
    <div class="intro">
      <div class="eyebrow">THE EVERYDAY JOURNAL</div>
      <div class="intro-row">
        <div>
          <span class="intro-title">Small moments.<br />Good company.</span
          ><span class="intro-copy">A place for the things that make a day.</span>
        </div>
        <div class="sun-flower">✳</div>
      </div>
    </div>
    <div class="feed-tabs">
      <button :class="{ active: feedTab === 'For you' }" @click="feedTab = 'For you'">
        For you</button
      ><button :class="{ active: feedTab === 'Following' }" @click="feedTab = 'Following'">
        Following</button
      ><button class="new-post" @click="openComposer">＋ Share a moment</button>
    </div>
    <div v-if="searchOpen" class="search-bar">
      <input
        v-model="query"
        placeholder="Search stories or people"
        aria-label="Search stories or people"
      /><button @click="closeSearch" aria-label="Close search">×</button>
    </div>
    <div class="topics">
      <button v-for="t in topics" :key="t" :class="{ chosen: topic === t }" @click="topic = t">
        {{ t }}
      </button>
    </div>
    <div v-if="!feedPosts.length" class="empty">
      <span>Nothing here just yet.</span
      ><span>{{
        feedTab === 'Following'
          ? 'Follow a creator to see their stories here.'
          : 'Try another topic or search term.'
      }}</span
      ><button @click="resetFeedFilters">Explore all stories</button>
    </div>
    <StoryCard v-for="p in feedPosts" :key="p.id" :p="p" />
    <div class="end-note" v-if="feedPosts.length">A little pause. You’re all caught up. ✳</div>
  </div>
</template>
