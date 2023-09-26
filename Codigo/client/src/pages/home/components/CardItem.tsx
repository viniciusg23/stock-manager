import { CardContent, Typography, CardActions, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";


function CardItem(props: {header: string, description: string, route: string}) {
    const navigate = useNavigate();


    const handleCadastrar = () => {
        navigate(props.route);
    }

    return (
        <Card sx={{ maxWidth: 300 }} elevation={6}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.header}
                </Typography>
                <Typography variant="body2">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleCadastrar}>Vamos lá</Button>
            </CardActions>
        </Card>
    );
}

export default CardItem;