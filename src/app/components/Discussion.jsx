// components/Discussion.js
'use client'
import { useState } from 'react';

export default function Discussion({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const fetchComments = async () => {
        // Fetch comments from your backend or API
    };

    const handleCommentSubmit = async () => {
        // Handle submitting a new comment
        // Update the comments state to include the new comment
    };

    return (
        <div className="discussion-section bg-black text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Discussion</h2>
            <div className="comment-input mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 bg-gray-800 text-white rounded-lg"
                />
                <button
                    onClick={handleCommentSubmit}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                    Post
                </button>
            </div>
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment mb-4">
                        <div className="comment-header flex justify-between items-center">
                            <h3 className="font-semibold">{comment.username}</h3>
                            <span className="text-gray-500 text-sm">{comment.date}</span>
                        </div>
                        <p className="mt-2">{comment.text}</p>
                        <div className="comment-actions flex space-x-4 mt-2">
                            <button className="text-gray-400 hover:text-white">Like</button>
                            <button className="text-gray-400 hover:text-white">Reply</button>
                        </div>
                        {/* Render replies */}
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="reply ml-4 mt-2">
                                <p className="text-sm">{reply.text}</p>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={fetchComments} className="text-red-600 mt-4">Load More</button>
            </div>
        </div>
    );
}
