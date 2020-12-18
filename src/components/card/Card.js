import {useContext} from 'react';
import {ApplicationContext} from '../../domain/application.store';
import {LikePictureById, UnlikePictureById} from '../../domain/picture/picture.actions';
import {BookmarkButton, LikeButton} from '../buttons';
import './Card.css';


export function Card({picture}) {
    const {state, dispatch} = useContext(ApplicationContext);

    const onLike = (pictureId) => {
        LikePictureById(dispatch, pictureId)
    }

    const onUnlike = (pictureId) => {
        UnlikePictureById(dispatch, pictureId)
    }

    const toggleLike = (picture) => {
        if(picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)) {
            onUnlike(picture.picsum_id)
        } else {
            onLike(picture.picsum_id);
        }
    }

    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url}/>
                {<LikeButton onClick={() => { toggleLike(picture) }} isLiked={picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)} />}
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => {
                }}/>
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments
                    <ul>
                        <li>
                            Sample comment
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}
