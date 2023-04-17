/**
 * Paginates an array of data.
 *
 * @param data The array of data to be paginated.
 * @param args An optional object with pagination arguments.
 *             - page: The page number to be returned (default: 1).
 *             - limit: The maximum number of items to be returned per page.
 * @returns The paginated array of data.
 */
export function paginate<T>(
  data: T[],
  { page = 1, limit }: { page?: number; limit: number } = {}
): T[] {
  if (limit) {
    return data.slice((page - 1) * limit, page * limit)
  }

  return data
}
