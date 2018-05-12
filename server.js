const express=require('express');
const hbs=require('hbs');
const port=process.env.PORT ||3000;
var app=express();
var fs=require('fs');


hbs.registerPartials(__dirname+'/'+'views/partials');
hbs.registerHelper('getCurrentYear',()=>{return new Date().getFullYear()});
hbs.registerHelper('screamit',(text)=>{return text.toUpperCase();})
app.set('view engine','hbs');
//app.use(express.static(__dirname+'/'+'view'));

app.use((req,res,next)=>{

    var now=new Date().toString();

    var log=`${now} : ${req.method} :${req.url}`

    console.log(log);

    fs.appendFile('server.log'
                  ,log+'\n'
                  ,(err)=>{
                      if(err){console.log('unable to append to the file')}
                    }
                );

//console.log(req.url);
    next();



});

// app.use((req,res,next)=>{

// res.render('Maintanance.hbs', {
//     title:'Error page'
//     ,header:'Page is unavailable'
//     ,content:'thanks for visiting  the home page'
//     ,author:'indrajeet mishra'
// })

// });

app.get('/',(req,res)=>{
    
    res.render('home.hbs',
               {
                   title:'home page'
                   ,header:'welcome to the home page'
                   ,content:'thanks for visiting  the home page'
                   ,author:'indrajeet mishra'
              }
            );


});



app.get('/about',(req,res)=>{
              res.render('about.hbs', 
                         {
                             title:'About page'
                             ,header:'welcome to the about page'
                             ,content:'thanks for visiting me'
                             ,author:'indrajeet mishra'
                             //,currentDate:new Date().getFullYear()
                            }
                        )
                    }
                );

                app.get('/portfolio',(req,res)=>{
                    res.render('portfolio.hbs', 
                               {
                                   title:'portfolio page'
                                   ,header:'welcome to the portfolio page'
                                   ,content:'thanks for visiting me'
                                   ,author:'indrajeet mishra'
                                   //,currentDate:new Date().getFullYear()
                                  }
                              )
                          }
                      );
      





app.listen(port,()=>{console.log(`server is runing on port ${port}`)});