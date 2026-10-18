import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCommunityStore } from '../stores/community'
import { getIllustration } from '../assets/illustrations'
export function useWorkspace() {
  const store = useCommunityStore(),
    router = useRouter(),
    route = useRoute()
  const screen = computed(() => route.meta.section || 'feed')
  const art = getIllustration
  const profileTab = computed({
    get: () => store.profileTab,
    set: (value) => {
      store.profileTab = value
      if (store.profileIsMe) router.push(value === 'Saved' ? '/saved' : '/profile')
    },
  })
  const goFeed = () => router.push('/')
  const goProfile = () => router.push('/profile')
  const goSaved = () => router.push('/saved')
  function openPost(post) {
    store.comment = ''
    store.commentError = ''
    router.push('/stories/' + post.id)
  }
  function openCreator(post) {
    router.push(post.author === 'Alex Morgan' ? '/profile' : '/creators/' + post.id)
  }
  function closeSearch() {
    store.query = ''
    store.searchOpen = false
  }
  function resetFeedFilters() {
    store.feedTab = 'For you'
    store.query = ''
    store.topic = 'All moments'
  }
  function openSearch() {
    store.searchOpen = !store.searchOpen
    goFeed()
  }
  function publish() {
    const post = store.publish()
    if (post) goProfile()
  }
  function backToCommunity() {
    router.push('/')
  }
  return {
    ...storeToRefs(store),
    initials: store.initials,
    isFollowing: store.isFollowing,
    toggleFollow: store.toggleFollow,
    toggleLike: store.toggleLike,
    toggleSave: store.toggleSave,
    addComment: store.addComment,
    openComposer: store.openComposer,
    openBioEditor: store.openBioEditor,
    saveBio: store.saveBio,
    closeSearch,
    resetFeedFilters,
    screen,
    profileTab,
    art,
    goFeed,
    goProfile,
    goSaved,
    openPost,
    openCreator,
    openSearch,
    publish,
    backToCommunity,
  }
}
