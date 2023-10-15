import { Box, Breadcrumbs, Link, Paper, Typography } from '@mui/material';
import { drawerWidth } from '../drawerNavegation/DrawerNavegation';
import ManageProducts from '../../subPages/manageProducts/ManageProducts';


function FunctionalityRender(props: { functionality: string }) {
    const { functionality } = props;

    let componentToRender = <div></div>;
    switch (functionality) {
        case 'products':
            componentToRender = <ManageProducts />;
            break;
        default:
            componentToRender = <Typography>Funcionalidade não encontrada</Typography>;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: `calc(100vw - ${drawerWidth}px)`,
                height: `calc(100vh - ${64}px)`,
                backgroundColor: 'background.default',
                padding: 4,
                pt: 2,
                marginRight: '2em',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 1.5,
                overflow: "auto"
            }}
        >
            <Paper elevation={0} sx={{ padding: 2, width: '100%' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                        Sistema
                    </Link>
                    <Typography color="text.primary">{functionality}</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    padding: 2,
                    width: '100%',
                    // minHeight: '100%',
                    backgroundColor: 'background.paper',
                    // overflow: "auto"
                }}
            >
                {componentToRender}
            </Paper>
        </Box>
    );
}

export default FunctionalityRender;
