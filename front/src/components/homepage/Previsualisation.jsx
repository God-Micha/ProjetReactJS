const Previsualisation = ({ pixelboard }) => {

    return (
        <ul>
            <li>
                titre: {pixelboard.title}
            </li>
            <li>
                date: {pixelboard.date}
            </li>
            <li>
                auteur {pixelboard.author}
            </li>
        </ul>
    );
};

export default Previsualisation