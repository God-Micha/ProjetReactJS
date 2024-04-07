import {useEffect, useState} from "react";
import axios from "axios";

const UserSpacePage = () =>{
    const [email, setEmail] = useState("");
    const [nbPixel, setNbPixel] = useState(0);
    const [pixelboards, setPixelboards] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/${localStorage.getItem("userId")}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching pixelboards:", error);
            });
    }, []);

    return (
        <>
            <h2>User Space</h2>
            <h4>{email}</h4>
        </>
    );
}

export default UserSpacePage