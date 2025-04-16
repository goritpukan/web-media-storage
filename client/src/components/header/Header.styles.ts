import { SxProps, Theme } from '@mui/material/styles';

export const headerStyle : SxProps<Theme> = {
    backgroundColor: "white",
    borderBottom: "1px solid gray",
}
export const homeButtonStyle : SxProps<Theme> = {
    ":hover": {
        backgroundColor: "white",
    },
    ":hover .text": {
        transition: '.3s',
        color: "blue",
    }
}
export const loginButtonStyle : SxProps<Theme> = {

}