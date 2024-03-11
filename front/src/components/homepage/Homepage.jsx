import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Previsualisation from './Previsualisation';
import Info from './Info';

const Homepage = () => {
    const api = 'http://localhost:8080/';

    const [pixelboards, setPixelboards] = useState([]);
    const [pixelboardsFinis, setPixelboardsFinis] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(api + 'users').then(resp => {
            setUsers(resp.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    console.log(users)

    return (
        <>
            <Info pixelboards={pixelboards} users={users} />
            {pixelboards.map((pixelboard) => (
                <Previsualisation pixelboard={pixelboard} />
            ))}
            {pixelboardsFinis.map((pixelboard) => (
                <Previsualisation pixelboard={pixelboard} />
            ))}
        </>
    );
};

export default Homepage