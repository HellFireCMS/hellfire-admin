export interface PostOverview {
  title: string,
  slug: string,
  author: {
    id: {
      "$oid": string
    },
    name: string
  }
}