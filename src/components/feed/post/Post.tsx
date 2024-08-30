import { useEffect, useState } from "react";
import useServices from "../../../hooks/useServices";
import { Post as PostType} from "../../../types/types"
import styles from "./post.module.scss"
import userPlaceholder from "/user_placeholder.jpg"
import heart from "/heart.svg"
import PostCommentForm from "./postCommentForm";


const Post = (post : PostType) => {
    const service = useServices();
    const [liked, setLiked] = useState(false);
    const {
        id,
        caption,
        comments,
        fileAddress,
        instaCloneUser,
        likes
    } = post;


    const handleLike = async () => {

        let res;

        if (liked) {
            res = await service.deleteLike(id);
            
            setLiked(false);

            return;
        } 

        res = await service.createLike(id);

        if (res.success) {
            console.log("liked post");
        }
        else 
            console.log("error liking post");

    }

    return (
        <div className={styles.container}> 
            <div className={styles.heading}>
                <img src={
                    instaCloneUser.profilePicture ? 
                    instaCloneUser.profilePicture : 
                    userPlaceholder
                    } alt="profile pic"/>
                <h3>{instaCloneUser.userCreatedUsername}</h3>
            </div>
            <img src={fileAddress} alt="img"/>
            <div className={styles.footer}>
                <button onClick={handleLike}>
                    <img src={heart} alt="" />
                </button>
                <p>{likes.length} likes</p>
                <p>{instaCloneUser.userCreatedUsername} {caption}</p>
                <a href="#">
                    <p>View all {comments.length} comments</p>
                </a>
                <PostCommentForm postId={id}/>
            </div>
        </div>
    )
}
export default Post