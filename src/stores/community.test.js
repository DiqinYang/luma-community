import { beforeEach, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCommunityStore } from './community'

beforeEach(() => setActivePinia(createPinia()))

it('keeps feed, following, likes and saved collections consistent', () => {
  const store = useCommunityStore()
  store.feedTab = 'Following'
  expect(store.feedPosts.map((p) => p.author)).toEqual(['June Park'])
  store.toggleFollow('June Park')
  expect(store.feedPosts).toHaveLength(0)
  const post = store.posts[0]
  const likes = post.likes
  store.toggleLike(post)
  store.toggleLike(post)
  expect(post.likes).toBe(likes)
  store.toggleSave(post)
  expect(store.savedPosts.some((p) => p.id === post.id)).toBe(false)
})

it('validates comments and new stories without mutating fictional seed data across store instances', () => {
  const store = useCommunityStore()
  store.addComment()
  expect(store.commentError).toContain('Write a comment')
  store.comment = ' A thoughtful local comment. '
  store.addComment()
  expect(store.currentPost.comments.at(-1).text).toBe('A thoughtful local comment.')
  store.openComposer()
  expect(store.publish()).toBeUndefined()
  Object.assign(store.draft, {
    title: 'My demo story',
    body: 'An entirely fictional story for local testing.',
  })
  const post = store.publish()
  expect(post.author).toBe('Alex Morgan')
  expect(store.posts).toHaveLength(5)
  setActivePinia(createPinia())
  expect(useCommunityStore().posts).toHaveLength(4)
})
