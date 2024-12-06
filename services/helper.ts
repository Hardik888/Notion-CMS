import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export class BlogMetadataHelper {
  static getToday(datestring?: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let date = new Date()
    if (datestring) {
      date = new Date(datestring)
    }
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  static extractRichText(property: any): string {
    if (property?.type === 'rich_text' && property.rich_text?.length > 0) {
      return property.rich_text[0].plain_text || ''
    }
    return ''
  }
  static extractName(property: any): string {
    if (property?.type === 'title') {
      return property.title[0].plain_text || ''
    }
    return ''
  }

  static extractTags(property: any): string[] {
    if (property?.type === 'multi_select' && property.multi_select) {
      return property.multi_select.map((tag: NotionTag) => tag.name)
    }
    return []
  }

  static extractImageUrl(property: any): string | undefined {
    if (property?.type === 'files' && property.files?.length > 0) {
      return property.files[0].file?.url
    }
    return undefined
  }

  static getPageMetaData(post: PageObjectResponse): BlogMetadata {
    const properties = post.properties as any
    return {
      id: post.id,
      title: BlogMetadataHelper.extractName(properties.Name) || 'Untitled',
      tags: BlogMetadataHelper.extractTags(properties.Tags),
      description: BlogMetadataHelper.extractRichText(properties.Description),
      date: BlogMetadataHelper.getToday(properties.Date?.date?.start),
      slug: BlogMetadataHelper.extractRichText(properties.Slug),
      image: BlogMetadataHelper.extractImageUrl(properties.image),
    }
  }
}
