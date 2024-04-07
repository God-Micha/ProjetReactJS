import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PixelBoardCard from "./PixelBoardCard";

const AdminPage  = () => {
    const [pixelboards, setPixelboards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setPixelboards([
            {
                _id: "660ffa6dbabfe4a3e613fd15",
                title: "Pixel Board 1",
                status: "In Progress",
                creationDate: "2024-04-06",
                endDate: "2024-04-30",
                size: "20x20",
                adminUsername: "admin1",
                mode: "OverrideOff",
                collaborationDelay: 0
            },
            {
                _id: "660ffa78babfe4a3e613fd18",
                title: "Pixel Board 2",
                status: "Done",
                creationDate: "2024-04-01",
                endDate: "2024-04-05",
                size: "30x30",
                adminUsername: "admin2",
                mode: "OverrideOn",
                collaborationDelay: 1
            }
        ]);
    });

    const handleCreate = () => {
        navigate("/admin/newpixelboard", { replace: true });
    };

    const handleEdit = () => {
        navigate("/admin/newpixelboard", { replace: true });
    };

    const handleDelete = () => {
        console.log("delete");
    };

    return (
        <div>
            <button type="button" onClick={handleCreate}>New Pixel Board</button>
            <div className="pixel-board-list">
                {pixelboards.map(board => (
                    <div className="pixel-board-admin-card" key={board.id}>
                        <PixelBoardCard
                            id={board._id}
                            title={board.title}
                            status={board.status}
                            creationDate={board.creationDate}
                            endDate={board.endDate}
                            size={board.size}
                            adminUsername={board.adminUsername}
                            mode={board.mode}
                            collaborationDelay={board.collaborationDelay}
                        />
                        <button type="button" onClick={handleEdit}>Edit Pixel Board</button>
                        <button type="button" onClick={handleDelete}>Delete Pixel Board</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
