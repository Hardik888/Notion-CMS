import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

type BlogMetadata = {
  id: string
  title: string
  tags: string[]
  description: string
  date: string
  slug: string
  image?: string
}

interface BlogPostListProps {
  posts: BlogMetadata[]
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <div className="w-full max-w-full mx-auto space-y-4 p-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-transparent border-none shadow-md shadow-black text-white"
        >
          <CardHeader>
            <div className="relative aspect-[2/1] bg-contain bg-no-repeat bg-transparent overflow-hidden rounded-lg w-full">
              {post.image ? (
                <div
                  style={{
                    backgroundImage: `url('${post.image}')`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    objectFit: 'scale-down',
                    backgroundRepeat: 'no-repeat',
                    backdropFilter: 'blur(5px)',
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  role="img"
                  aria-label={`Image for ${post.title}`}
                ></div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 animate-pulse">
                      <div className="h-full w-full rotate-45 bg-purple-400/20" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rotate-45 bg-orange-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <span>{post.date}</span>
            </div>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-blue-200">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Link href={`/blogs/${post.slug}`} passHref>
              <Button
                variant="secondary"
                className="bg-[#E039FD] hover:bg-blue-700 text-white"
              >
                Read More
              </Button>
            </Link>
            <Link href={`/blogs/${post.slug}`} passHref>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-[#E039FD] hover:bg-blue-700"
                aria-label="Read more"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
