import { watch, onScopeDispose } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunityStore } from '../stores/community'
export function useRouteSync() {
  const store = useCommunityStore(),
    route = useRoute(),
    router = useRouter()
  let timer
  watch(
    () => route.fullPath,
    () => {
      const id = Number(route.params.id)
      if (route.meta.section === 'detail') {
        if (!store.posts.some((p) => p.id === id)) {
          router.replace('/')
          return
        }
        store.currentId = id
      }
      if (route.meta.section === 'profile') {
        const creator = route.params.id ? store.posts.find((p) => p.id === id) : null
        if (route.params.id && !creator) {
          router.replace('/')
          return
        }
        store.creator = creator
        store.profileIsMe = !creator
        store.profileTab = route.path === '/saved' ? 'Saved' : 'Stories'
      }
    },
    { immediate: true },
  )
  watch(
    () => store.noticeId,
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => (store.notice = ''), 2200)
    },
  )
  onScopeDispose(() => clearTimeout(timer))
}
