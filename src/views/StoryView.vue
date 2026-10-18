<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const {
  comment,
  commentError,
  currentPost,
  initials,
  isFollowing,
  toggleFollow,
  toggleLike,
  toggleSave,
  openCreator,
  addComment,
  screen,
  art,
} = useWorkspace()
</script>
<template>
  <div v-if="screen === 'detail' && currentPost" class="detail-page">
    <div class="author-row">
      <button class="avatar" :class="currentPost.color" @click="openCreator(currentPost)">
        {{ currentPost.initials }}
      </button>
      <div class="author-info">
        <span>{{ currentPost.author }}</span
        ><span>{{ currentPost.time }} · {{ currentPost.topic }}</span>
      </div>
      <button
        v-if="currentPost.author !== 'Alex Morgan'"
        class="follow-btn"
        @click="toggleFollow(currentPost.author)"
      >
        {{ isFollowing(currentPost.author) ? 'Following' : 'Follow ＋' }}
      </button>
    </div>
    <img class="detail-art" :src="art(currentPost.art)" :alt="currentPost.title" />
    <div class="detail-body">
      <div class="post-tools">
        <button
          :class="{ liked: currentPost.liked }"
          :aria-label="currentPost.liked ? 'Unlike story' : 'Like story'"
          @click="toggleLike(currentPost)"
        >
          <span>{{ currentPost.liked ? '♥' : '♡' }}</span
          >{{ currentPost.likes }}</button
        ><button aria-label="Comment count"><span>◯</span>{{ currentPost.comments.length }}</button
        ><button
          class="save"
          :class="{ saved: currentPost.saved }"
          :aria-label="currentPost.saved ? 'Remove from saved' : 'Save story'"
          @click="toggleSave(currentPost)"
        >
          <span>{{ currentPost.saved ? '◆' : '◇' }}</span>
        </button>
      </div>
      <span class="detail-title">{{ currentPost.title }}</span
      ><span class="detail-copy">{{ currentPost.body }}</span>
      <div class="hashtags">{{ currentPost.tags }}</div>
      <div class="comments-heading">
        <span>A little conversation</span><span>{{ currentPost.comments.length }} comments</span>
      </div>
      <div v-for="(c, i) in currentPost.comments" :key="i" class="comment">
        <div class="avatar tiny" :class="i % 2 ? 'peach' : 'sage'">{{ initials(c.author) }}</div>
        <div class="comment-body">
          <div>
            <span>{{ c.author }}</span
            ><span>{{ c.time }}</span>
          </div>
          <span>{{ c.text }}</span>
        </div>
      </div>
      <div class="comment-form">
        <input
          v-model="comment"
          maxlength="240"
          aria-label="Write a comment"
          placeholder="Add a thoughtful comment…"
          @confirm="addComment"
        /><button @click="addComment">Post</button>
      </div>
      <span v-if="commentError" class="error" role="alert">{{ commentError }}</span>
      <div class="local-note">Comments stay in this browser session. Nothing is sent.</div>
    </div>
  </div>
</template>
