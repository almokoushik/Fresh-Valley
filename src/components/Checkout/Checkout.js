import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header';
import moment from 'moment';
import { UserContext } from '../../App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { positions } from '@material-ui/system';

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

// const useStyles = makeStyles((theme) => ({
//     margin: {
//         margin: theme.spacing(1),
//     },
// }));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Checkout = (props) => {
    const history = useHistory()
    const[loggedInUser, setLoggedInUser]=useContext(UserContext)
    const classes = useStyles();
    const {id}=useParams()
    const [product,setProduct]=useState([])
    useEffect(()=>{
        fetch(`https://freshvalley.herokuapp.com/post/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data)          
        })
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
        if (product.name) {
            const userAndEmail = {
                name:product.name,
                email:loggedInUser.email,
                weight:product.weight,
                price:product.price,
                image:product.image
             }
            userAndEmail["dateTime"] = moment().format('MMMM Do YYYY, h:mm:ss a');
            fetch("https://freshvalley.herokuapp.com/addCartItem", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userAndEmail)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
        }

    },[product.name])

    const ordersHandler =()=>{
        console.log("I am Clicked")
        history.push("/orders")      
    }

    return (
        <div>
             <Header></Header>
        <div className="conatiner m-5 p-5">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Weight</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="left">Quantity</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                <StyledTableRow>
                                    <StyledTableCell align="left">{product.name}</StyledTableCell>
                                    <StyledTableCell align="left">{product.weight}</StyledTableCell>
                                    <StyledTableCell align="left">{product.price}</StyledTableCell>
                                    <StyledTableCell align="center">1</StyledTableCell>
                                </StyledTableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="m-5"> 
                    <ThemeProvider theme={theme}>
                        <Button  onClick={ordersHandler} position="absolute" left="60%" variant="contained" color="primary" className={classes.margin}>
                            Orders
        </Button>
                    </ThemeProvider>
                </div>
        </div>
        </div>
    );
};

export default Checkout;