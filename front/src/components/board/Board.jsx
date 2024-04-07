import {Button} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../AuthContext";

const Board = () => {
    const [listCanvas, setListCanvas] = useState([]);
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const createCanvas = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/api/canvas`);
            console.log(response.data);
            response.data.forEach((canvas) => {
                setListCanvas([...listCanvas, canvas]);
            });
        } catch (error) {
            console.error("Erreur lors de la création du canvas:", error);
        }
        console.log("Creating canvas");
    }

    const getCanvas = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/canvas`);
            setListCanvas(response.data);
            console.log(response.data);
            console.log(listCanvas)
        } catch (error) {
            console.error("Erreur lors de la récupération du canvas:", error);
        }
    }

    const redirectToCanvas = (canvas) => {
        const id = canvas._id;
        return () => {
            navigate(`/canvas`, {state: {idCanvas: id}});
        }
    }

    const disconnect = () => {
        logOut();
        navigate('/login');
    }
    return (
        <div>
            <h1>Board</h1>
            <Button variant="contained" onClick={createCanvas}>Create new Canvas</Button>
            <Button variant="contained" onClick={getCanvas}>Get Canvas</Button>
            <Button variant="contained" onClick={disconnect}>Log out</Button>
            {listCanvas.length > 0 && (<div>
                {listCanvas.map((canvas) => (
                    <Button variant="contained" key={canvas._id} onClick={redirectToCanvas(canvas)}>{canvas._id}</Button>
                ))}
            </div>)}
        </div>
    );
}
export default Board;