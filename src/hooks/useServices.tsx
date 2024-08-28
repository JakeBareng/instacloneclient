import { useState } from "react";
import { Post } from "../types/types";

type response = {
    success: boolean;
    data: any;
    message: string;
}


const useServices = () => {
    const API_URL = import.meta.env.VITE_API_URL + "/api";


    // get posts
    const getPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/Posts`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });



            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not get posts');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Posts retrieved successfully'
            }


        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred while getting posts'
            }
        }
    }

    // create post 
    const createPost = async (file: File, caption: string) => {
        try {

            const formData = new FormData();
            formData.append('file', file);
            formData.append('caption', caption);

            const res = await fetch(`${API_URL}/posts`, { 
                method: 'POST',
                body: formData,
                credentials : 'include',
            });

            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not create post');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Post created successfully'
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred while creating post'
            }
        }
    }

    // delete post
    const deletePost = async (postId: string) => {
        try {
            const res = await fetch(`${API_URL}/posts/${postId}`, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not delete post');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Post deleted successfully'
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred while deleting post'
            }
        }
    }


    // create like
    const createLike = async (postId: string) => {
        try {
            const res = await fetch(`${API_URL}/likes/post/${postId}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not like post');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Post liked successfully'
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred'
            }
        }
    }

    // delete like
    const deleteLike = async (postId: string) => {
        try {
            const res = await fetch(`${API_URL}/likes/post/${postId}`, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not delete like');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Like deleted successfully'
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred while deleting like'
            }
        }
    }

    // create comment
    const createComment = async (postId: number | string, content: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/post/${postId}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content
                })
            });

            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not create comment');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Comment created successfully'
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred while creating comment'
            }
        }
    }

    const deleteComment = async (commentId: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/${commentId}`, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (res.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'unauthorized',
                }
            }

            if (!res.ok) {
                throw new Error('Could not delete comment');
            }

            const data = await res.json();

            return {
                success: true,
                data: data,
                message: 'Comment deleted successfully'
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'An error occurred while deleting comment'
            }
        }
    }

    return {
        getPosts,
        createPost,
        deletePost,
        createLike,
        deleteLike,
        createComment,
        deleteComment
    }
}

export default useServices;