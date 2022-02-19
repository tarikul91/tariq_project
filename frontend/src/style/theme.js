import { createTheme } from "@mui/material";
const Theme = createTheme({
    palette: {
        primary: {
            main: "#CB552B",
            contrastText: "#fff"
        },
        secondary:{
            dark:"111111",
            main:"#A1A1A1",
            contrastText: "#fff"

        },
        white: {
            main: "#fff"
        },
        black:{
            main:"#000000",
            contrastText: "#fff"
        }
    },
})

export default Theme