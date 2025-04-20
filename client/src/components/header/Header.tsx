import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import Link from "next/link";
import {headerStyle, homeButtonStyle} from './Header.styles';
import {Box} from "@mui/system";


export default function Header() {
    return (
        <AppBar sx={headerStyle} position="sticky">
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <Button sx={homeButtonStyle} component={Link} href={'/'}>
                        <Typography variant={'h6'} className={'text'} color={'black'}>Video Storage</Typography>
                    </Button>
                </Box>
                <Button variant={'contained'} component={Link} href={'/login'}>Login</Button>
            </Toolbar>
        </AppBar>
    )
}