// import React from 'react'
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import iphone from './iphone.jpg'
// import Dell from './Dell.jpg'
// import tshirt from './tshirt.jpg'
// import shoes from './shoes.jpg'
// import { Container } from 'react-bootstrap';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
// import cap from './cap.jpg';
// import GamingHeadphones from './GamingHeadphones.jpg';
// import DenimJeans from './Denim Jeans.jpg'
// import appleWatch from './appleWatch.jpeg'


// function Cards() {
//     const [value, setValue] = React.useState(4);
//   return (
  
//     <div>
      
//         <div className='cards'>
//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={iphone}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Iphone 14 Pro Max
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2  },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>  
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button size="small">Shop Now</Button>
//       </CardActions>
//     </Card>

//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={Dell} 
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Dell XPS Laptop
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button size="small">Shop Now</Button>
//       </CardActions>
//     </Card>
//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={tshirt}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Cotton T-Shirt
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button size="small">Shop Now</Button>
//       </CardActions>
//     </Card>

//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={shoes}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//          Shoes
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Shop Now</Button>
        
//       </CardActions>
//     </Card>
     
//     </div>


//     <div className='cards'>
//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={appleWatch}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//          Apple Watch
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2  },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>  
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button size="small">Shop Now</Button>
//       </CardActions>
//     </Card>

//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={GamingHeadphones}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Gaming Heaphones
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button size="small">Shop Now</Button>
//       </CardActions>
//     </Card>
//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={DenimJeans}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//          Denim Jeans
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <Button size="small">Shop Now</Button>
//       </CardActions>
//     </Card>

//     <Card className='card' sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 400 }}
//         image={cap}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//          Blue Cap
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//           <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
      
//       <Typography component="legend">Rating</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       </Box>
//       <br />
//          <h5>Rs 400000/-</h5>
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Shop Now</Button>
        
//       </CardActions>
//     </Card>
     
//     </div>
   
//     </div>
    
//   )
// }

// export default Cards