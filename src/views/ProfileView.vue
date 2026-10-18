<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const {
  following,
  profileIsMe,
  creator,
  profileTab,
  bio,
  savedPosts,
  profileName,
  ownPosts,
  profilePosts,
  creatorSavedCount,
  isFollowing,
  toggleFollow,
  openPost,
  goFeed,
  openComposer,
  openBioEditor,
  art,
} = useWorkspace()
</script>
<template>
  <div class="profile-page">
    <div class="profile-cover">
      <span>Make room for the everyday.</span>
      <div>✳</div>
    </div>
    <div class="profile-main">
      <div class="profile-top">
        <div class="avatar large" :class="profileIsMe ? 'me' : creator.color">
          {{ profileIsMe ? 'AM' : creator.initials }}
        </div>
        <button v-if="profileIsMe" class="outline-btn" @click="openBioEditor">Edit profile</button
        ><button v-else class="outline-btn" @click="toggleFollow(creator.author)">
          {{ isFollowing(creator.author) ? 'Following' : 'Follow ＋' }}
        </button>
      </div>
      <span class="profile-name">{{ profileName }}</span
      ><span class="profile-handle">{{ profileIsMe ? '@alex.everyday' : creator.handle }}</span
      ><span class="profile-bio">{{ profileIsMe ? bio : creator.bio }}</span>
      <div class="profile-stats">
        <div>
          <b>{{ ownPosts.length }}</b
          ><span>Stories</span>
        </div>
        <div>
          <b>{{ profileIsMe ? following.length : isFollowing(profileName) ? 1 : 0 }}</b
          ><span>{{ profileIsMe ? 'Following' : 'Demo followers' }}</span>
        </div>
        <div>
          <b>{{ profileIsMe ? savedPosts.length : creatorSavedCount }}</b
          ><span>{{ profileIsMe ? 'Saved' : 'Story likes' }}</span>
        </div>
      </div>
      <div class="fiction-tag">FICTIONAL DEMO PROFILE</div>
    </div>
    <div class="profile-tabs">
      <button :class="{ active: profileTab === 'Stories' }" @click="profileTab = 'Stories'">
        Stories</button
      ><button
        v-if="profileIsMe"
        :class="{ active: profileTab === 'Saved' }"
        @click="profileTab = 'Saved'"
      >
        Saved <span>{{ savedPosts.length }}</span>
      </button>
    </div>
    <div class="profile-grid">
      <button v-for="p in profilePosts" :key="p.id" @click="openPost(p)">
        <img :src="art(p.art)" />
        <div>
          <span>{{ p.title }}</span
          ><span>♡ {{ p.likes }}</span>
        </div>
      </button>
    </div>
    <div class="empty" v-if="!profilePosts.length">
      <span>{{
        profileTab === 'Saved' ? 'Keep something lovely.' : 'Your story starts here.'
      }}</span
      ><span>{{
        profileTab === 'Saved'
          ? 'Tap the diamond on any story to save it.'
          : 'Share your first fictional moment in this local demo.'
      }}</span
      ><button @click="profileTab === 'Saved' ? goFeed() : openComposer()">
        {{ profileTab === 'Saved' ? 'Explore stories' : 'Create a story' }}
      </button>
    </div>
  </div>
</template>
