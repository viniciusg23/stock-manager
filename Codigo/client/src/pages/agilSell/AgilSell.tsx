import { useParams } from "react-router-dom";
import RegisterSells from "../components/RegisterSells";


function AgilSell() {
    const {id} = useParams();

    return (
        <RegisterSells format="agil" productId={id} />
    );
}

export default AgilSell;