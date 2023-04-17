/// <reference types="@sveltejs/kit" />
interface AnchorProps extends HTMLProps<'a', HTMLAttributes<any>> {
  'data-sveltekit-prefetch'?: boolean
}
