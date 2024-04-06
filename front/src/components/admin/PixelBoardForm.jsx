import React, {useState} from "react";

const PixelBoardForm  = () => {
    const [title, setTitle] = useState('NewPixelBoard');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [height, setHeight] = useState(1920);
    const [width, setWidth] = useState(1080);
    const [mode, setMode] = useState('OverrideOff');
    const [collaborationDelay, setCollaborationDelay] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const  status = "In Progress";
        const creationDate = new Date().toISOString().split('T')[0];
        const size = height + "*" + width;
        const adminUsername = "admin";
        console.log({
            title,
            status,
            creationDate,
            endDate,
            size,
            adminUsername,
            mode,
            collaborationDelay
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titre:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Date de fin:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </div>
            <div>
                <label>Taille:</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}/>
                <text>*</text>
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}/>
            </div>
            <div>
                <label>Mode:</label>
                <div>
                    <input type="radio" id="overrideOn" name="mode" value="OverrideOn"
                           checked={mode === 'OverrideOn'}
                           onChange={() => setMode('OverrideOn')}/>
                    <label htmlFor="overrideOn">OverrideOn</label>
                </div>
                <div>
                    <input type="radio" id="overrideOff" name="mode" value="OverrideOff"
                           checked={mode === 'OverrideOff'} onChange={() => setMode('OverrideOff')}/>
                    <label htmlFor="overrideOff">OverrideOff</label>
                </div>
            </div>
            <div>
                <label>Délai entre chaque collaboration du même utilisateur:</label>
                <input type="number" value={collaborationDelay}
                       onChange={(e) => setCollaborationDelay(e.target.value)}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PixelBoardForm;
