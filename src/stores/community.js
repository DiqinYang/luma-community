import { defineStore } from 'pinia'
import { seedPosts, artNames } from '../data/stories'
export const useCommunityStore = defineStore('community', {
  state: () => ({
    feedTab: 'For you',
    topics: ['All moments', 'Living', 'Rituals', 'Style'],
    topic: 'All moments',
    query: '',
    searchOpen: false,
    posts: seedPosts(),
    following: ['June Park'],
    currentId: 1,
    comment: '',
    commentError: '',
    profileIsMe: true,
    creator: null,
    profileTab: 'Stories',
    bio: 'Finding beauty in slow mornings, thoughtful spaces and the little things. ☀',
    bioDraft: '',
    editingBio: false,
    composer: false,
    draft: { title: '', body: '', art: 'quiet-corner', topic: 'Living' },
    draftError: '',
    artNames,
    notice: '',
    noticeId: 0,
  }),
  getters: {
    currentPost() {
      return this.posts.find((p) => p.id === this.currentId)
    },
    feedPosts() {
      return this.posts.filter(
        (p) =>
          (this.feedTab !== 'Following' || this.following.includes(p.author)) &&
          (this.topic === 'All moments' || p.topic === this.topic) &&
          (!this.query ||
            (p.title + ' ' + p.author + ' ' + p.body + ' ' + p.tags)
              .toLowerCase()
              .includes(this.query.toLowerCase())),
      )
    },
    savedPosts() {
      return this.posts.filter((p) => p.saved)
    },
    profileName() {
      return this.profileIsMe ? 'Alex Morgan' : this.creator.author
    },
    ownPosts() {
      return this.posts.filter((p) => p.author === this.profileName)
    },
    profilePosts() {
      return this.profileIsMe && this.profileTab === 'Saved' ? this.savedPosts : this.ownPosts
    },
    creatorSavedCount() {
      return this.ownPosts.reduce((sum, p) => sum + p.likes, 0)
    },
  },
  actions: {
    initials(name) {
      return name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
    },
    isFollowing(name) {
      return this.following.includes(name)
    },
    toggleFollow(name) {
      const i = this.following.indexOf(name)
      if (i < 0) this.following.push(name)
      else this.following.splice(i, 1)
    },
    toggleLike(p) {
      p.liked = !p.liked
      p.likes += p.liked ? 1 : -1
    },
    toggleSave(p) {
      p.saved = !p.saved
      this.toast(p.saved ? 'Saved to your collection' : 'Removed from your collection')
    },
    addComment() {
      const text = this.comment.trim()
      if (!text || text.length > 160) {
        this.commentError =
          text.length > 160
            ? 'Keep your comment within 160 characters.'
            : 'Write a comment before posting.'
        return
      }
      this.currentPost.comments.push({ author: 'Alex Morgan', text, time: 'Just now' })
      this.comment = ''
      this.commentError = ''
      this.toast('Comment added to this demo session')
    },
    openComposer() {
      this.draft = { title: '', body: '', art: 'quiet-corner', topic: 'Living' }
      this.draftError = ''
      this.composer = true
    },
    publish() {
      if (
        !this.draft.title.trim() ||
        this.draft.title.trim().length > 70 ||
        this.draft.body.trim().length < 10 ||
        this.draft.body.trim().length > 600
      ) {
        this.draftError =
          'Use a title up to 70 characters and story text between 10 and 600 characters.'
        return
      }
      this.posts.unshift({
        id: Math.max(...this.posts.map((p) => p.id)) + 1,
        author: 'Alex Morgan',
        initials: 'AM',
        color: 'me',
        handle: '@alex.everyday',
        bio: '',
        time: 'Just now',
        topic: this.draft.topic,
        art: this.draft.art,
        title: this.draft.title.trim(),
        body: this.draft.body.trim(),
        excerpt: this.draft.body.trim().slice(0, 90),
        tags: '#myjournal  #littlemoments',
        likes: 0,
        liked: false,
        saved: false,
        comments: [],
      })
      this.composer = false
      this.toast('Story created locally — nothing was published online')
      return this.posts[0]
    },
    openBioEditor() {
      this.bioDraft = this.bio
      this.editingBio = true
    },
    saveBio() {
      if (!this.bioDraft.trim()) {
        this.toast('Please write a short bio')
        return
      }
      this.bio = this.bioDraft.trim()
      this.editingBio = false
      this.toast('Demo profile updated')
    },
    toast(message) {
      this.notice = message
      this.noticeId++
    },
  },
})
