import { useState } from "react";
import useServices from "../hooks/useServices";

const CommentForm = (postId: number) => {
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string>('');


    const services = useServices();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (comment === '') {
            setError('Please fill out all fields');
            return;
        }

        services.createComment(postId,comment).then(res => {
            if (res.success) {
                setError('');
            } else {
                setError(res.message);
            }
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="comment" id="comment" onChange={e => setComment(e.target.value)} />
            <input type="submit" value="Create Comment" />
            <span>{error}</span>
        </form>
    );
}


export default CommentForm;