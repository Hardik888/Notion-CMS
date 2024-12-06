import notion from '@/notion/notion'
import { NotionToMarkdown } from 'notion-to-md'

class Notion {
  private n2m: NotionToMarkdown
  constructor(notionClient: any, n2mClient: NotionToMarkdown) {
    this.n2m = n2mClient
  }
  async getBlogs() {
    const data = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_URL!,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })
    return data
  }
  async getSingleBlog(slug: string) {
    return await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_URL!,
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    })
  }
  get _n2m() {
    return this.n2m
  }
}

const n2m = new NotionToMarkdown({ notionClient: notion })
export const notionProvider = new Notion(notion, n2m)
