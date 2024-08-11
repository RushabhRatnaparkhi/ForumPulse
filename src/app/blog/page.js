'use client';

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connectToDB } from '../../../utils/database'; // Import the DB connection function
import Comment from '../../../models/comment'; // Import the Comment model

export default function BlogIndex() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [openDiscussions, setOpenDiscussions] = useState({}); // Track which discussions are open
    const [comments, setComments] = useState({}); // Store comments for each post

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (pageNumber) => {
        try {
            const res = await fetch(`https://newsapi.org/v2/everything?q=technology&apiKey=0f596318cbd44d17a1061c896797f72b&page=${pageNumber}`);
            const data = await res.json();

            if (data.articles) {
                const newPosts = data.articles.map(article => ({
                    id: article.url,
                    title: article.title,
                    excerpt: article.description || '',
                    date: new Date(article.publishedAt).toLocaleDateString(),
                    slug: article.url,
                    imageUrl: article.urlToImage || '', // Add image URL
                }));

                setPosts((prevPosts) => [...prevPosts, ...newPosts]);

                if (newPosts.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error("No articles found");
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    const toggleDiscussion = async (postId) => {
        if (openDiscussions[postId]) {
            // Close the discussion
            setOpenDiscussions(prev => ({ ...prev, [postId]: false }));
        } else {
            // Open the discussion
            try {
                await connectToDB(); // Ensure DB connection
                const postComments = await Comment.find({ postId }).lean(); // Fetch comments from DB

                setComments(prev => ({ ...prev, [postId]: postComments }));
                setOpenDiscussions(prev => ({ ...prev, [postId]: true }));
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Latest Tech News</h1>
            <InfiniteScroll
                dataLength={posts.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className="text-center">You have seen all posts!</p>}
            >
                <div className="space-y-8">
                    {posts.map((post) => (
                        <div key={post.id} className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
                            {post.imageUrl && (
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-semibold text-red-600">
                                <a href={post.slug} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                    {post.title}
                                </a>
                            </h2>
                            <p className="text-gray-300">{post.excerpt}</p>
                            <p className="text-gray-500 text-sm mt-2">{post.date}</p>
                            <button
                                onClick={() => toggleDiscussion(post.id)}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                            >
                                {openDiscussions[post.id] ? 'Hide Discussion' : 'Open Discussion'}
                            </button>
                            {openDiscussions[post.id] && (
                                <div className="mt-4 space-y-4">
                                    {comments[post.id]?.length > 0 ? (
                                        comments[post.id].map(comment => (
                                            <div key={comment._id} className="bg-gray-800 p-4 rounded">
                                                <p className="text-white">{comment.content}</p>
                                                <p className="text-gray-400 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No comments</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
