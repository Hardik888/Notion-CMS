'use server'
import { blogFactory } from '@/services/blogs/factory'

export const getAllPublished = async () => {
  return await blogFactory.getAllPublished()
}
export const getSingleBlog = async (slug: string) => {
  return await blogFactory.getSingleBlog(slug)
}
