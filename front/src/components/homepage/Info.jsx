const Info = ({pixelboards, users}) => {

    return (
        <div>
            <h2>PIXELBOARD ! </h2>
            <p>Actuellement, {pixelboards.length} pixelboards ont été créés.</p><br/>
            <p>Actuellement, {users.length} utilisateurs ont été créés.</p><br/>
        </div>
    );
};

export default Info;