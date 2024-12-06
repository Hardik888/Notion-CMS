import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionProvider } from './provider'
import { BlogMetadataHelper } from './helper'

class BlogFactory {
  async getAllPublished(): Promise<BlogMetadata[]> {
    try {
      const blogs = await notionProvider.getBlogs()
      return blogs.results
        .filter((post): post is PageObjectResponse => post.object === 'page')
        .map((post) => BlogMetadataHelper.getPageMetaData(post))
    } catch (error) {
      return []
    }
  }
  async getSingleBlog(slug: string): Promise<Record<string, any> | null> {
    try {
      const blog = await notionProvider.getSingleBlog(slug)
      const data = blog.results[0] as PageObjectResponse
      if (data) {
        const metadata = BlogMetadataHelper.getPageMetaData(data)
        const mdBlocks = await notionProvider._n2m.pageToMarkdown(data.id)
        const mdString = notionProvider._n2m.toMarkdownString(mdBlocks)
        return {
          metadata,

          markdown: mdString,
        }
      }
      return null
    } catch (error) {
      return null
    }
  }
}

export const blogFactory = new BlogFactory()
