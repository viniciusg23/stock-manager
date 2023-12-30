import DrawerNavegation from "./components/drawerNavegation/DrawerNavegation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userValidate } from "../../utils/userValidate";


function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {

        const checkLoginStatus = async () => {
            try {
                const isLoggedIn = await userValidate();
                if (!isLoggedIn) {
                    return navigate("/");
                }
            } catch (error) {
                console.error("Erro ao validar usuário:", error);
            }
        };
      
        checkLoginStatus();
    }, [navigate]);

    return (
        <>
            <DrawerNavegation />
        </>
    );
}

export default HomePage;