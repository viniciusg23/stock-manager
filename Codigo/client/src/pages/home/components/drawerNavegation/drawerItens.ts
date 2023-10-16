import * as Icons from '@mui/icons-material';

export interface DrawerItem {
    name: string;
    path: string;
    icon: any;
}

export const drawerItens : Array<DrawerItem> = [
    {
        //TODO
        name: "Gerenciar Estoque",
        path: "stock",
        icon: Icons.Inventory
    },
    {
        //TODO
        name: "Gerenciar Produtos",
        path: "product",
        icon: Icons.LocalMall
    },
    {
        //TODO
        name: "Gerenciar Fornecedores",
        path: "supplier",
        icon: Icons.LocalShipping
    },
    {
        name: "Registrar Nova Viagem",
        path: "travel",
        icon: Icons.Explore
    },
    {
        name: "Visualizar Vendas",
        path: "sales",
        icon: Icons.MonetizationOn
    },
    {
        //TODO
        name: "Gerenciar Funcionários",
        path: "employees",
        icon: Icons.Group
    },

]