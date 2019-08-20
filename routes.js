const db = require ('./connect');

module.exports = function(app){

    //show all data
    app.get ('/movie', (req,res)=> {
        db.query('SELECT * FROM movie', (error,response) => {
            const formResponse = {
                status:200,
                data: response,
            };
            if (error){
                console.log (error);
            } else {
                res.json(formResponse);
            }
        });
    });
    //select data berdasarkan judul
    app.get ('/movie/:title', (req,res) => {
        const title = req.params.title;
        console.log (typeof title, title);
        db.query ('SELECT * FROM movie WHERE title=?', [title],(error,response) => {
            const formResponse = {
                status:200,
                data: response,
            };
            if (error){
                console.log(error);
            } else {
                res.json(formResponse);
            }
        })
    });
    //insert data
    app.post('/movie',(req,res) => {
        const title = req.body.title;
        const author = req.body.author;
        const country = req.body.country;
        db.query (
            'INSERT INTO movie SET title=?, genre=?, country=?',
            [title, author,country], 
            (error, response) => {
                const formResponse = {
                    status: 200,
                    data: response,
                };
                if (error) {
                    console.log(error);
                } else {
                    res.json(formResponse);
                }
            }

        );
    });
    //update data using put
    app.put('/movie/update',(req,res) => {
        const id = req.body.id;
        const title = req.body.title;
        const genre = req.body.genre;
        const country= req.body.country;
        db.query (`UPDATE movie SET title='${title}', genre='${genre}', country='${country}' WHERE id =?`,[id,title,genre,country],(error,response) =>{
            const formResponse = {
                status: 200,
                data: response,
            }; if (error) {
                console.log(error);
            } else {
                res.json(formResponse);
            }
        });
    });

    //update data using patch
    app.patch('/movie/updateid',(req,res) => {
        const temp= db.query('SELECT * FROM movie WHERE id=?');
        const id = req.body.id || temp.id; 
        const title = req.body.title || temp.title; 
        const genre = req.body.genre || temp.genre;
        const country= req.body.country ||temp.country;

        
        //console.log(temp)
        db.query (`UPDATE movie SET (title='${title}, genre='${genre}', country='${country}')  WHERE id =?`,[id,title,genre,country],(error,response) =>{
            console.log(title);
            const formResponse = {
                status: 200,
                data: response,
            }; if (error) {
                console.log(error);
            } else {
                res.json(formResponse);
            }
        });
    });

    //delete data
    app.delete('/movie/:id', (req,res) => {
        const id = req.params.id;
        db.query(`DELETE FROM movie WHERE id=?`,[id],(err,response) => {
            const formResponse = {
                status:200,
                data:response
            };
        if (err) {
            console.log(err);
        } else{
            res.json(formResponse);
        }
        })
    })

     //filter data by genre
     app.get ('/movie/genre/:genre', (req,res)=> {
         const genre=req.params.genre;
        db.query('SELECT * FROM movie WHERE genre=?',[genre], (error,response) => {
            const formResponse = {
                status:200,
                data: response,
            };
            if (error){
                console.log (error);
            } else {
                res.json(formResponse);
            }
        });
    });

    //filter data by country
    app.get ('/movie/country/:country', (req,res)=> {
        const country=req.params.country;
       db.query('SELECT * FROM movie WHERE country=?',[country], (error,response) => {
           const formResponse = {
               status:200,
               data: response,
           };
           if (error){
               console.log (error);
           } else {
               res.json(formResponse);
           }
       });
   });
};