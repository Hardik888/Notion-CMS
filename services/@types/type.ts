interface NotionRichText {
  type: string
  text: {
    content: string
    link: string | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

interface NotionDate {
  start: string
  end: string | null
  time_zone: string | null
}

interface NotionFile {
  name: string
  type: string
  file: {
    url: string
    expiry_time: string
  }
}

interface NotionTag {
  id: string
  name: string
  color: string
}

interface NotionBlogPost {
  Slug: {
    id: string
    type: 'rich_text'
    rich_text: NotionRichText[]
  }
  Date: {
    id: string
    type: 'date'
    date: NotionDate
  }
  image: {
    id: string
    type: 'files'
    files: NotionFile[]
  }
  Description: {
    id: string
    type: 'rich_text'
    rich_text: NotionRichText[]
  }
  Published: {
    id: string
    type: 'checkbox'
    checkbox: boolean
  }
  Tags: {
    id: string
    type: 'multi_select'
    multi_select: NotionTag[]
  }
  Name: {
    id: string
    type: 'title'
    title: NotionRichText[]
  }
}

// Define the metadata type returned by the factory
interface BlogMetadata {
  id: string
  title: string
  tags: string[]
  description: string
  date: string
  slug: string
  image?: string
}
