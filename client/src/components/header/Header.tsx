import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import Link from "next/link";
import {headerStyle, homeButtonStyle, loginButtonStyle} from './Header.styles';


export default function Header() {
    return (
        <AppBar sx={headerStyle} position="static">
            <Toolbar>
                <Button sx={homeButtonStyle} component={Link} href={'/'}>
                    <Typography variant={'h5'} className={'text'} color={'black'}>Video Storage</Typography>
                </Button>
                <Button sx={loginButtonStyle} variant={'contained'} component={Link} href={'/login'}>Login</Button>
            </Toolbar>
        </AppBar>
    )
}