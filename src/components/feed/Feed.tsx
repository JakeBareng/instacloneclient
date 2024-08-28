import { useEffect, useState } from "react";
import useServices from "../../hooks/useServices"
import { Post } from "../../types/types";
import PostElement from "./Post";
import PostForm from "../PostForm";


const Feed = () => {
    const service = useServices();
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (posts === null)
            getPosts();
    })

    const getPosts = async () => {
        const res = await service.getPosts();
        setLoading(true);
        if (res.success) {
            setError("");
            setPosts(res.data);
        }
        else {
            setError(res.message);
        }
        setLoading(false);
    }


    return (
        <div>
            {
                error ? <span>{error}</span> : null
            }
            {
                loading ? <span>Loading...</span> : <></>
            }
            {
                posts &&
                <>
                    <PostForm /> 
                    {
                        posts.map(post => {
                            return <PostElement {...post} />
                        })
                    }
                </>
            }
        </div>
    )
}

export default Feed