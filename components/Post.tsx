import { IPost } from '../types'
import * as React from 'react'

// page props type
type Props = {
    post: IPost
}

const Post: React.FC<Props> = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
        </div>
    )
}

export default Post
