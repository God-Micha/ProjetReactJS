import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import PixelBoardCard from "../admin/PixelBoardCard";
import {useAuth} from "../../AuthContext";

const Homepage = () => {
    const api = 'http://localhost:3001/api/';

    const [usersCount, setUsersCount] = useState(0);
    const [pixelboardsCount, setPixelboardsCount] = useState(0);
    const [pixelboardsInProgress, setPixelboardsInProgress] = useState([]);
    const [pixelboardsDone, setPixelboardsDone] = useState([]);
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const disconnect = () => {
        logOut();
        navigate('/login');
    }

    const redirectToAdmin = () => {
        navigate('/admin');
    }

    useEffect(() => {
        setUsersCount(1)
        setPixelboardsCount(2)
        setPixelboardsInProgress([
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
            }
        ])
        setPixelboardsDone([
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
        ])
    }, []);

    return (
        <>
            <h2>Collaborative drawing</h2>
            <button onClick={redirectToAdmin}>Admin</button>
            <button onClick={disconnect}>Log Out</button>
            <p>Actuellement, {usersCount} utilisateurs se sont inscrits.</p>
            <p>Actuellement, {pixelboardsCount} pixelboards ont été créés.</p>
            <h3>In Progress pixelboards</h3>
            {pixelboardsInProgress.map((board) => (
                <PixelBoardCard  key={board._id}
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
            ))}
            <h3>In Progress pixelboards</h3>
            {pixelboardsDone.map((board) => (
                <PixelBoardCard key={board._id}
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
            ))}
        </>
    );
};

export default Homepage