import * as Icons from '@mui/icons-material';

export interface DrawerItem {
    name: string;
    path: string;
    icon: any;
}

export const drawerItens : Array<DrawerItem> = [
    {
        name: "Gerenciar Estoque",
        path: "stock",
        icon: Icons.Inventory
    },
    {
        name: "Gerenciar Produtos",
        path: "product",
        icon: Icons.LocalMall
    },
    {
        name: "Gerenciar Fornecedores",
        path: "supplier",
        icon: Icons.LocalShipping
    },
    {
        name: "Gerenciar Categorias",
        path: "categories",
        icon: Icons.Category
    },
    {
        name: "Registrar Nova Viagem",
        path: "travel",
        icon: Icons.Explore
    },
    {
        name: "Registrar Vendas",
        path: "sell",
        icon: Icons.Sell
    },
    {
        name: "Visualizar Vendas",
        path: "sales",
        icon: Icons.MonetizationOn
    },
    {
        name: "Gerenciar Funcionários",
        path: "employee",
        icon: Icons.Group
    },
    {
        name: "Dashboard",
        path: "dashboard",
        icon: Icons.Dashboard
    }

]