import { posts } from '$lib/data/posts'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({
  params
  // ,fetch // Use this if you want Server Side Fetch | https://kit.svelte.dev/docs/hooks#externalfetch
}) => {
  const { slug } = params

  // get post with metadata
  const post = posts.find((post) => slug === post.slug)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}) satisfies PageServerLoad
