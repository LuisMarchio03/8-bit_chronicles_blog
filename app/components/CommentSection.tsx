"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Reply, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"

interface CommentReply {
  id: number
  author: string
  content: string
  timestamp: string
}

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
  replies: CommentReply[]
  showReplies: boolean
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "RetroGamer84",
      content: "Mario 64 was definitely the game that revolutionized 3D platformers. Nothing came close for years!",
      timestamp: "2 days ago",
      showReplies: false,
      replies: [
        {
          id: 101,
          author: "SonicFan",
          content: "Sonic Adventure would like a word with you...",
          timestamp: "1 day ago",
        },
        {
          id: 102,
          author: "RetroGamer84",
          content: "Sonic Adventure was great but came 2 years later. Mario 64 was the pioneer!",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: 2,
      author: "IndieDevLover",
      content:
        "Celeste is a masterpiece of modern platforming. The way it combines tight controls with an emotional story is unmatched.",
      timestamp: "3 days ago",
      showReplies: false,
      replies: [
        {
          id: 201,
          author: "PixelArtist",
          content: "And the pixel art is gorgeous! Shows you don't need 3D to make an impact.",
          timestamp: "2 days ago",
        },
      ],
    },
    {
      id: 3,
      author: "OldSchoolGamer",
      content: "Don't forget about Crash Bandicoot! That series pushed the PlayStation hardware to its limits.",
      timestamp: "4 days ago",
      showReplies: false,
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState({ author: "", content: "" })
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [newReply, setNewReply] = useState({ author: "", content: "" })

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.author && newComment.content) {
      const now = new Date()
      setComments([
        ...comments,
        {
          ...newComment,
          id: Date.now(),
          timestamp: "Just now",
          replies: [],
          showReplies: false,
        },
      ])
      setNewComment({ author: "", content: "" })
    }
  }

  const handleSubmitReply = (e: React.FormEvent, commentId: number) => {
    e.preventDefault()
    if (newReply.author && newReply.content && replyingTo !== null) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                author: newReply.author,
                content: newReply.content,
                timestamp: "Just now",
              },
            ],
            showReplies: true,
          }
        }
        return comment
      })

      setComments(updatedComments)
      setNewReply({ author: "", content: "" })
      setReplyingTo(null)
    }
  }

  const toggleReplies = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, showReplies: !comment.showReplies } : comment,
      ),
    )
  }

  const startReply = (commentId: number) => {
    setReplyingTo(commentId)
  }

  const cancelReply = () => {
    setReplyingTo(null)
    setNewReply({ author: "", content: "" })
  }

  return (
    <div className="mt-8 p-4 bg-gray-900 rounded-lg pixelated-border">
      <h3 className="text-2xl font-pixel mb-4 flex items-center">
        <MessageSquare className="mr-2 h-6 w-6" />
        Player Comments
      </h3>

      {/* Comments list */}
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Main comment */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-mono text-purple-400 font-bold">{comment.author}</h4>
                <span className="text-xs text-gray-400 font-mono">{comment.timestamp}</span>
              </div>
              <p className="font-mono mb-3">{comment.content}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => startReply(comment.id)}
                  className="flex items-center text-sm text-purple-400 hover:text-purple-300"
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </button>

                {comment.replies.length > 0 && (
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="flex items-center text-sm text-gray-400 hover:text-purple-300"
                  >
                    {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                    {comment.showReplies ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Reply form */}
            {replyingTo === comment.id && (
              <div className="p-4 bg-gray-900 border-b border-gray-700">
                <form onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                  <h5 className="text-sm font-mono mb-2 text-purple-400">Replying to {comment.author}</h5>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={newReply.author}
                    onChange={(e) => setNewReply({ ...newReply, author: e.target.value })}
                    className="mb-2 font-mono bg-gray-800 border-gray-700"
                  />
                  <Textarea
                    placeholder="Your reply"
                    value={newReply.content}
                    onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                    className="mb-2 font-mono bg-gray-800 border-gray-700"
                  />
                  <div className="flex space-x-2">
                    <Button type="submit" className="font-pixel bg-purple-600 hover:bg-purple-500 text-xs">
                      Post Reply
                    </Button>
                    <Button
                      type="button"
                      onClick={cancelReply}
                      className="font-pixel bg-gray-700 hover:bg-gray-600 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Replies */}
            {comment.showReplies && comment.replies.length > 0 && (
              <div className="bg-gray-900 pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="p-4 border-l-2 border-purple-800 ml-4 mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-mono text-purple-400 font-bold text-sm">{reply.author}</h5>
                      <span className="text-xs text-gray-400 font-mono">{reply.timestamp}</span>
                    </div>
                    <p className="font-mono text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmitComment} className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h4 className="font-pixel text-sm mb-3">Add Your Comment</h4>
        <Input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          className="mb-2 font-mono bg-gray-900 border-gray-700"
        />
        <Textarea
          placeholder="Your comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="mb-2 font-mono bg-gray-900 border-gray-700"
          rows={4}
        />
        <Button type="submit" className="font-pixel bg-purple-600 hover:bg-purple-500">
          Post Comment
        </Button>
      </form>
    </div>
  )
}

export default CommentSection

