const User = require('../models/User')
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
const jsonwebtoken = require('jsonwebtoken');
const { use } = require('passport');


//     register = (user,res,req,next) => {
//         bcrypt.hash(user.req.body.password,10,function(err,hashedPass){
//             if(err){
//                 res.json({
//                     error:err
//                 })
//             }
    
//             const products = new Products(req.body);
//                     products.save()
//                         .then(() => res.redirect('/'))
//                         .catch(error => {
            
//                         });
    
//             let user = new User({
//                 name : req.body.name,
//                 email : req.body.email,
//                 phone : req.body.phone,
//                 password : hashedPass
//             })
//             user.save()
//                 .then(user =>{
//                     res.json({
//                         massage: "dang ky thanh cong"
//                     })
//                 })
//                 .catch(error => {
//                     res.json({
//                         massage:'an error occured'
//                     })
//                 })     
//         })
     
//     }



 //[POST]/products/store
           const register = (req, res) => {
                const user = new User(req.body);
                user.save()
                .then(user =>{
                                        res.json({
                                            massage: "dang ky thanh cong"
                                        })
                                    })
                                    .catch(error => {
                                        res.json({
                                            massage:'an error occured'
                                        })
                                    })   

                                }
            const login  =(req,res,next) => {
                var username = req.body.username
                var password = req.body.password

                User.findOne({$or: [{email:username},{phone:username}]})
                .then(user => {
                    if(user){
                        // bcrypt.compare(password,user.password,function(err,result){
                        //     if(err){
                        //         res.json({
                        //             error:err
                        //         })
                        //     }
                        //     if(result){
                        //         let token = jsonwebtoken.sign({name: user.name},'verySecretValue',{expiresIn: '1h'})
                   
                        //          res.json({
                                     
                        //              massage:'dang nhap thanh cong roi do ban !',
                        //              token
                        //          })
                        //     }
                        //     else{
                        //         console.log(user.password)
                        //         console.log(password)
                        //         res.json({
                        //             massage: 'password dose not matched'
                        //         })
                        //     }
                        if (user.password === password)
                        {
                            let token = jsonwebtoken.sign({name: user.name},'verySecretValue',{expiresIn: '1h'})
                   
                                     res.json({
                                         
                                         massage:'dang nhap thanh cong roi do ban !',
                                         token
                                     })
                        }
                        else
                        {
                            res.json({
                                        massage: 'password dose not matched'
                                    })}
                        // })
                    }
                    else{
                        res.json({
                            massage:'user not found !'
                        })
                    }
                })

            }                  
 
module.exports = {
    register,login
}