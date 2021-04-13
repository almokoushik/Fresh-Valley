import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});




const Manage = () => {
    const classes = useStyles();
    const [product, SetProduct] = useState([])
    useEffect(() => {
        fetch("https://freshvalley.herokuapp.com/posts")
            .then(res => res.json())
            .then(data => SetProduct(data))
    }, [product])

    const deleteIconHandle = (id) => {
        console.log("Try to deleting")
        fetch(`https://freshvalley.herokuapp.com/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <AdminHeader></AdminHeader>
            <div className="conatiner m-5 p-5">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Weight</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell align="left">{row.weight}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="center"><EditIcon fontSize="small"></EditIcon> <DeleteIcon fontSize="small" onClick={() => deleteIconHandle(row._id)}></DeleteIcon></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )

}

export default Manage;