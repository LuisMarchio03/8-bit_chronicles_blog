import { notFound } from "next/navigation"
import CommentSection from "../../components/CommentSection"
import SocialShare from "../../components/SocialShare"
import { posts } from "../../data/posts"

export default function Post({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <h1 className="font-pixel leading-[1.8]">{post.title}</h1>
      <span
        className={`inline-block px-2 py-1 bg-purple-600 text-black text-sm font-mono rounded mb-4 ${post.category === "Games" ? "w-16 text-center" : "w-auto"}`}
      >
        {post.category}
      </span>
      <div
        className="font-mono text-xl leading-relaxed leading-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <SocialShare url={`https://yourdomain.com/post/${post.id}`} title={post.title} />
      <CommentSection />
    </article>
  )
}

