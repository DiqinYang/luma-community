# Luma — Mobile Community

A complete Vue 3 + Vite application with Vue Router, Pinia, Vue SFCs and fictional fixtures. StoryCard.vue, StoryComposer.vue and ProfileEditor.vue are independent Vue components. Shared following, comments and bookmarks live in the community store.

## Run

Use Node.js 24 and npm. This repository is self-contained; no sibling project or workspace root is required.

```sh
git clone https://github.com/DiqinYang/luma-community.git
cd luma-community
npm ci --ignore-scripts
npm run dev
```

```sh
npm test
npm run format:check
npm run build
npm run preview
```

Vite prints the localhost URL. Production output is generated into the ignored dist/ directory. Dependencies are pinned by this repository's own package-lock.json.

## Routes and features

- `/`: For you / Following feed, topics, creator/story search and empty states.
- `/stories/:id`: story details, likes, saved state, comment validation and local comments.
- `/profile` and `/saved`: fictional own profile and saved collections.
- `/creators/:id`: fictional creator profile and stories.

## Try the workflow

1. Follow a creator and switch between For you and Following.
2. Open a story, like it, bookmark it and add a local comment.
3. Open Saved and confirm that bookmarks update across views.
4. Create a fictional story with a title and 10–600 characters of body text.
5. Edit the fictional profile bio. Reload to restore the starting data.

## Source map

- `src/router/`: route definitions and lazy-loaded pages.
- `src/views/`: page components.
- `src/components/`: reusable domain UI.
- `src/composables/`: view adapters, navigation and lifecycle effects.
- `src/stores/`: shared state, derived values, actions and business tests.
- `src/data/`: fictional starting records.
- `src/assets/`: CSS and any original illustrations.

Run `npm test` from this repository root for business tests. See [architecture](ARCHITECTURE.md) for design decisions and [screenshots](screenshots/) for visual examples.

## Scope and privacy

All data is synthetic and stays in memory. Reloading restores the starting data. No client API, authentication, real publication, payment or customer data is included. This is an independent reconstruction of interface patterns, not the original production repository or complete original business logic. The production HTML CSP blocks outgoing connections; Vite development uses its local hot-update connection.

This version is a Vue 3 + Vite web application with standard HTML elements. It does not include uni-app, native app or mini-program build targets.

## Review and licenses

Read [architecture](ARCHITECTURE.md) for state ownership and component boundaries, and [privacy review](PRIVACY.md) for the publication boundary. Third-party licenses are in licenses/. No blanket open-source license is granted to the original demo application code.
