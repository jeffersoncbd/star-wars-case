import { Client } from '@opensearch-project/opensearch'

const user = process.env.OPEN_SEARCH_USER
const pass = process.env.OPEN_SEARCH_PASS
const host = process.env.OPEN_SEARCH_HOST

export const openSearchClient = new Client({
  node: `https://${user}:${pass}@${host}`
})
