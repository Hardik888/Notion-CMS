export default async function BlogPage() {
  const blogs = await getAllPublished()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Blog: Sustainable Insights
      </h1>
      <p className="text-lg text-blue-200 mb-8">Content!</p>
      <BlogPostList posts={blogs} />
    </div>
  )
}
