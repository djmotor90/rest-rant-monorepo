import { useContext } from "react";
import { CurrentUser } from '../contexts/CurrentUser'

function CommentCard({ comment, onDelete }) {
    const { currentUser } = useContext(CurrentUser);

    let deleteButton = null;
    let authorName = "";

    if (comment.author) {
        // Check if comment.author is not null
        authorName = `${comment.author.firstName} ${comment.author.lastName}`;

        if (currentUser?.userId === comment.author.authorId) {
            deleteButton = (
                <button className="btn btn-danger" onClick={onDelete}>
                    Delete Comment
                </button>
            );
        }
    }

    return (
        <div className="border col-sm-4">
            <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
            <h4>{comment.content}</h4>
            <h3>
                <strong>- {authorName}</strong>
            </h3>
            <h4>Rating: {comment.stars}</h4>
            {deleteButton}
        </div>
    );
}

export default CommentCard;
