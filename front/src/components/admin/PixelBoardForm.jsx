import React, {useState} from "react";
import axios from "axios";

const PixelBoardForm  = () => {
    const [title, setTitle] = useState('NewPixelBoard');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        const data = {
            creator: userId,
            name: title,
        };
        try {
            await axios.post(`http://localhost:3001/api/canvas`, data);
        } catch (error) {
            console.error("Erreur lors de la création du canvas:", error);
        }
        console.log("Creating canvas");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titre:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PixelBoardForm;
