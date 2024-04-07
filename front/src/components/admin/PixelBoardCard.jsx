import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    CardHeader
} from "@mui/material";

const PixelBoardCard = ({ id, title, status, creationDate, endDate, userId, collaborationDelay }) => {
    const navigate = useNavigate();

    const redirectToPixelboard = () => {
        navigate("/canvas", { state: { idCanvas: id, pixelboardName: title } });
    };

    return (
        <Card>
            <CardHeader
                title={title}
                subheader={`Status: ${status}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    Creation Date: {creationDate.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    End Date: {endDate.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Collaboration Delay: {collaborationDelay}s
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={redirectToPixelboard}>
                    See Pixelboard
                </Button>
            </CardActions>
        </Card>
    );
};
export default PixelBoardCard;