import React from "react";
import {useNavigate} from "react-router-dom";
import PixelBoardDescriptionCard from "./PixelBoardDescriptionCard";

const AdminPage  = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/admin/newpixelboard", { replace: true });
    };

    const pixelBoardData = [
        {
            id: 1,
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
            id: 2,
            title: "Pixel Board 2",
            status: "Done",
            creationDate: "2024-04-01",
            endDate: "2024-04-05",
            size: "30x30",
            adminUsername: "admin2",
            mode: "OverrideOn",
            collaborationDelay: 1
        }
    ];

    return (
        <div>
            <button type="button" onClick={handleCreate}>New Pixel Board</button>
            <div className="pixel-board-list">
                {pixelBoardData.map(board => (
                    <PixelBoardDescriptionCard
                        key={board.id}
                        title={board.title}
                        status={board.status}
                        creationDate={board.creationDate}
                        endDate={board.endDate}
                        size={board.size}
                        adminUsername={board.adminUsername}
                        mode={board.mode}
                        collaborationDelay={board.collaborationDelay}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
