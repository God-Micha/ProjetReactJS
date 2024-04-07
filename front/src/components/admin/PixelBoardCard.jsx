import React from "react";
import {useNavigate} from "react-router-dom";

const PixelBoardCard = ({id,title,status,creationDate,endDate,userId,collaborationDelay}) => {
    const navigate = useNavigate();

    const redirectToPixelboard = () => {
        navigate(`/canvas`, {state: {idCanvas: id, pixelboardName: title}});
    }
    return (
        <div className="pixel-board-card" key={id}>
            <h3>{title}</h3>
            <p>Status: {status}</p>
            <p>Creation Date: {creationDate}</p>
            <p>End Date: {endDate}</p>
            <p>Creator: {userId}</p>
            <p>Collaboration Delay: {collaborationDelay}s</p>
            <button onClick={redirectToPixelboard}>See pixelboard</button>
        </div>
    );
};

export default PixelBoardCard;