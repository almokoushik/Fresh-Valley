import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const Product = (props) => {
    const history=useHistory()
    const [loggedInUser,setLoggedInUser]= useContext(UserContext)

    const classes = useStyles();

    const addButtonHandler =(id)=>{
        // console.log("I am clicked and My Id is ",id)
        history.push(`/checkout/${id}`)
    }

    return (
        <div className=" g-5 col-sm-12 col-md-6 col-lg-3 my-2">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="45%"
                        width="100%"
                        image={props.product.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h5">{props.product.name}</Typography>
                    </CardContent>
                </CardActionArea>
                
                <CardActions>                   
                    <Button size="small" color="primary"> <h5>$</h5><h5>{props.product.price}</h5> </Button>
                    <Button onClick={()=>addButtonHandler(props.product._id)} className="ml-5" size="small" float="right" color="primary"> <h5> BUY NOW</h5></Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Product;