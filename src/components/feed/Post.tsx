import { Post as PostType} from "../../types/types"

const Post = (post : PostType) => {
    return (
        <div> 
            <div>
                <img src={post.instaCloneUser.profilePicture} alt="profile pic"/>
                <h3>{post.instaCloneUser.userCreatedUsername}</h3>
            </div>
            <img src={post.fileAddress} alt="img"/>
            <div>
                <p>{post.caption}</p>
                <p>{post.likes.length} likes</p>

                {/* todo: pop up of all comments beside post */}
                <a href="#">
                    <p>View all {post.comments.length} comments</p>
                </a>
            </div>
        </div>
    )
}

export default Post