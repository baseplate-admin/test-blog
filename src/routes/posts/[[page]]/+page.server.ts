import { posts } from '$lib/data/posts'
import { paginate } from '$lib/util'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({
  params
  // ,fetch // Use this if you want Server Side Fetch | https://kit.svelte.dev/docs/hooks#externalfetch
}) => {
  let page = params.page ? parseInt(params.page) : 1
  let limit = 10

  const postsForPage = paginate(posts, { limit, page })

  // if page doesn't exist, 404
  if (postsForPage.length === 0 && page > 1) {
    throw error(404, 'Page not found')
  }

  return {
    posts: postsForPage,
    page,
    limit
  }
}) satisfies PageServerLoad
