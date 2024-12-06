export async function generateStaticParams() {
  const posts = await getAllPublished()
  const data = posts.map((post) => ({
    slug: post.slug,
  }))

  return data
}
async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const post = (await blogFactory.getSingleBlog((await params).slug)) as any
  return (
    <article className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-4 text-white">
        {post.metadata.title}
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <time className="text-blue-200">{post.metadata.date}</time>
        <div className="flex flex-wrap gap-2">
          {post.metadata.tags.map((tag: any) => (
            <span
              key={tag}
              className="bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* {post.metadata.image && (
        <div className="mb-8">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1200}
            height={630}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      )} */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{post.markdown.parent}</ReactMarkdown>
      </div>
    </article>
  )
}

export default Post
