import { useState } from "react";
import useServices from "../../../hooks/useServices";

const PostCommentForm = ({postId} : {postId: number}) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const service = useServices();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        service.createComment(postId,comment).then(res => {
            if (res.success) {
                setComment('');
                setError('');
            }
            else {
                setError(res.message);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Add a comment..." type="text" name="comment" id="comment" onChange={e => setComment(e.target.value)} value={comment}/>
            {
                comment.length > 0 && <button type="submit">Post</button>
            }
            <span>{error}</span>
        </form>
    );

}


export default PostCommentForm;