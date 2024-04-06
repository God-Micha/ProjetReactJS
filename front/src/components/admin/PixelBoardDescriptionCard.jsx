import React from "react";
import {useNavigate} from "react-router-dom";

const PixelBoardDescriptionCard = ({
                                       title,
                                       status,
                                       creationDate,
                                       endDate,
                                       size,
                                       adminUsername,
                                       mode,
                                       collaborationDelay
                                   }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/admin/newpixelboard", { replace: true });
    };

    const handleDelete = () => {
        console.log("delete");
    };
    return (
        <div className="pixel-board-card">
            <h3>{title}</h3>
            <p>Status: {status}</p>
            <p>Creation Date: {creationDate}</p>
            <p>End Date: {endDate}</p>
            <p>Size: {size}</p>
            <p>Creator: {adminUsername}</p>
            <p>Mode: {mode}</p>
            <p>Collaboration Delay: {collaborationDelay}s</p>
            <button type="button" onClick={handleEdit}>Edit Pixel Board</button>
            <button type="button" onClick={handleDelete}>Delete Pixel Board</button>
        </div>
    );
};

export default PixelBoardDescriptionCard;
