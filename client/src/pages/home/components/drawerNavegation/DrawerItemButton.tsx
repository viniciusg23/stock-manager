import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { setFunctionality } from "../../../../utils/setFunctionality";
import { DrawerItem } from "./drawerItens";

interface IDrawerItemButtonProps {
    open: boolean;
    item: DrawerItem;
    handleFunctionality(value: React.SetStateAction<{ path: string; name: string; }>): void
    
}

function DrawerItemButton(props: IDrawerItemButtonProps) {
    const {open, item, handleFunctionality} = props;

    // const handleDashboard = () => {
    //     window.open("/dashboard", "_blank");
    // }  

    const handleSubPage = () => {
        const func = { path: item.path, name: item.name }
        handleFunctionality(func);
        setFunctionality(JSON.stringify(func))
    }

    return (
        <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
            }}
            onClick={handleSubPage}
        >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                }}
            >
                <item.icon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
    );
}

export default DrawerItemButton;