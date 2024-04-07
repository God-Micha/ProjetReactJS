import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PixelBoardCard from "./PixelBoardCard";
import axios from "axios";

const AdminPage  = () => {
    const [pixelboards, setPixelboards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/canvas")
            .then(response => {
                setPixelboards(response.data);
            })
            .catch(error => {
                console.error("Error fetching pixelboards:", error);
            });
    }, []);

    const handleCreate = () => {
        navigate("/admin/newpixelboard", { replace: true });
    };

    return (
        <div>
            <button type="button" onClick={handleCreate}>New Pixel Board</button>
            <div className="pixel-board-list">
                {pixelboards.map(board => (
                    <div className="pixel-board-admin-card" key={board._id}>
                        <PixelBoardCard
                            id={board._id}
                            title={board.name}
                            status={board.status}
                            creationDate={board.createdAt}
                            endDate={board.endDate}
                            userId={board.creator}
                            collaborationDelay={board.editDelay}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
