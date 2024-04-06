import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = () => {
    const api = 'http://localhost:3001/api/';

    const [usersCount, setUsersCount] = useState(0);
    const [pixelboardsCount, setPixelboardsCount] = useState(0);
    const [pixelboardsInProgress, setPixelboardsInProgress] = useState([]);
    const [pixelboardsDone, setPixelboardsDone] = useState([]);

    useEffect(() => {
        setUsersCount(1)
        setPixelboardsCount(2)
        setPixelboardsInProgress([
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
            }
        ])
        setPixelboardsDone([
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
        ])
    }, []);

    return (
        <>
            <h2>Collaborative drawing</h2>
            <p>Actuellement, {usersCount} utilisateurs se sont inscrits.</p>
            <p>Actuellement, {pixelboardsCount} pixelboards ont été créés.</p>
            <h3>In Progress pixelboards</h3>
            {pixelboardsInProgress.map((pixelboard) => (
                <div className="pixel-board-card" key={pixelboard.id}>
                    <h4>{pixelboard.title}</h4>
                    <p>Status: {pixelboard.status}</p>
                    <p>Creation Date: {pixelboard.creationDate}</p>
                    <p>End Date: {pixelboard.endDate}</p>
                    <p>Size: {pixelboard.size}</p>
                    <p>Creator: {pixelboard.adminUsername}</p>
                    <p>Mode: {pixelboard.mode}</p>
                    <p>Collaboration Delay: {pixelboard.collaborationDelay}s</p>
                </div>
            ))}
            <h3>In Progress pixelboards</h3>
            {pixelboardsDone.map((pixelboard) => (
                <div className="pixel-board-card" key={pixelboard.id}>
                    <h4>{pixelboard.title}</h4>
                    <p>Status: {pixelboard.status}</p>
                    <p>Creation Date: {pixelboard.creationDate}</p>
                    <p>End Date: {pixelboard.endDate}</p>
                    <p>Size: {pixelboard.size}</p>
                    <p>Creator: {pixelboard.adminUsername}</p>
                    <p>Mode: {pixelboard.mode}</p>
                    <p>Collaboration Delay: {pixelboard.collaborationDelay}s</p>
                </div>
            ))}
        </>
    );
};

export default Homepage