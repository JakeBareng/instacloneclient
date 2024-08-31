import { Comment as commentType}  from "../../../types/types";



const Comment = ({ comment } : { comment : commentType}) => {
    return (
        <p key={comment.id}>
            <span>{comment.instaCloneUser.userCreatedUsername}</span>: {comment.content}
        </p>
    );
}

export default Comment;