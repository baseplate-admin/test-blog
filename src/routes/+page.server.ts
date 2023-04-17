import { posts } from '$lib/data/posts'
import type { PageServerLoad } from './$types'

export const load = (async ({}) => {
  return {
    posts: posts.slice(0, 5)
  }
}) satisfies PageServerLoad
