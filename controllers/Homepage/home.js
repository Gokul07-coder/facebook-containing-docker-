let db = require('../../Util/database');

let homePage = (req,res)=>{
    try{
    let {user_id} = req.user;
    db.query('select first_name from account where id = ?',[user_id], (err,resu)=>{
        if(err){
            console.log(err);
            res.status.send({message : "Error at fetching"});
        }
        else{
            // console.log(res);
            db.query(`SELECT post_id, image, NULL as name
            FROM post
            WHERE id IN (SELECT friends_id FROM friend WHERE id = ?)
            UNION
            SELECT NULL AS post_id, image,name
            FROM ads;
            `, [user_id], (err,result)=>{
                if(err){
                    console.log(err);
                    res.status(404).send({message : "Error at fetching"});
                }
                else if(result.length>0){
                    console.log("you have feed");
                    res.status(201).send({message : result,resu});
                }
                else{
                    console.log("you don't have any here add some friends");
                    res.status(201).send({message : "you don't have any here add some friends"});
                }
                })
            // res.status(201).send({message : res});
        }
    })
    }
    catch(e){
        console.log(e);
        res.status(401).send("Something went wrong");
    }
}

module.exports = { homePage }