import { MutationTree } from 'vuex'
import { TagsViewState, TagView } from './state'
import { TagsMutationTypes } from './mutation-types'

export type Mutations<S = TagsViewState> = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: S, view: TagView): void
  // [TagsMutationTypes.ADD_CACHED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_VISITED_VIEW](state: S, view: TagView): void
  // [TagsMutationTypes.DEL_CACHED_VIEW](state: S, view: TagView): void
  // [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: S, view: TagView): void
  // [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: S, view: TagView): void
  // [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: S): void
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: S): void
  // [TagsMutationTypes.UPDATE_VISITED_VIEW](state: S, view: TagView): void
}

export const mutations: MutationTree<TagsViewState> & Mutations = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: TagsViewState, view: TagView) {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push({ ...view, title: view.meta?.title || 'no-name' })
  },
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: TagsViewState) {
    state.cachedViews = []
  },
  [TagsMutationTypes.DEL_VISITED_VIEW](state: TagsViewState, view: TagView) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  }
}
