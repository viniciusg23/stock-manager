import RegisterSells from "../../../components/RegisterSells";
import FadeTransition from "../../components/FadeTransition";

function SystemSellsRegister() {

    return (
        <FadeTransition>
            <RegisterSells format="system" />
        </FadeTransition>
    );
    
}

export default SystemSellsRegister;