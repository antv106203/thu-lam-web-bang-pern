require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require ('./db');
const cors = require('cors');

const port = process.env.PORT;

// app.use((req,res,next) =>{
    
// });
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// lay danh sach khach san
app.get('/api/v1/restaurants', async(req,res) =>{
    try {
            let result = await db.query('select * from restaurants;')
        //console.log(result);
        //console.log("xin chao");
            res.status(200).json({
                status: "success",
                result: result.rows.length,
                data: {
                    restaurants:result.rows
                },
            });
    } catch (error) {
        console.log('loi o phan show list khach san');
    }
    
});


// show 1 khach san
app.get('/api/v1/restaurants/:id',async (req,res) =>{
    //console.log(req.params);
    try {
        let results =await db.query(`select * from restaurants where id = ${req.params.id}`);
        res.status(200).json({
            status: "success",
            result: results.rows.length,
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (error) {
        console.log('loi o phan show 1 khach san');
    }
});


// them khach san
app.post('/api/v1/restaurants',async (req,res) =>{
    //console.log(req.body);
    try {
        let result = await db.query(
            'INSERT INTO restaurants(name, location, price_range) VALUES ($1,$2,$3) returning *', [req.body.name, req.body.location, req.body.price_range]
            );
        console.log(result);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: result.rows[0],
            }
        })
    } catch (error) {
        console.log('loi o phan them khach san');
    }
});


// update thong tin khach san
app.put('/api/v1/restaurants/:id', async (req, res) =>{
    console.log(req.body);
    try {
        const result = await db.query('UPDATE restaurants SET name =$1, location = $2, price_range = $3 WHERE id = $4 returning *',
        [req.body.name, req.body.location, req.body.priceRange, req.params.id]);
        console.log(result);

        res.status(200).json({
            status: 'success',
            data: {
                restaurants: result.rows[0],
            },
        });

    } catch (error) {
        console.log("loi o phan update thong tin khach san");
    }
});

//delete restaurant

app.delete('/api/v1/restaurants/:id', async (req, res) =>{
    console.log(req.params.id);
    try {
        
        
        let result = await db.query('DELETE FROM restaurants WHERE id = $1',[req.params.id]);
        //console.log(result);
        res.status(204).json({
            status: 'success',
            
        });

    } catch (error) {
        console.log("loi o phan xoa thong tin khach san");
    }
});



app.listen(port,() => {
    console.log(`dang cho ket noi o cong ${port}`);
    // if(1){
    //     console.log("xin chao");
    // }
})

//1553
//46744