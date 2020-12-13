import {findAll, findById, create, update, remove} from '../models/postModel.js';
import getReqData from '../utils.js';

export const getPosts = async (req, res) => {
     try{
        const posts = await findAll()
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(posts));
     }catch(error){
          console.log(error);
     }  
}
export const getPostById = async (req, res, id) => {
    try {
        const post = await findById(id);
        if(post){
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify(post));
        }else {
            res.writeHead(404, {'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'No such  post '}));  
        }
       
    }catch(error) {
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'No such  post '}));

    }
}
export const createPost = async (req, res) => {
        try {   
                const data = await getReqData(req);
                const {title, author, body} = data;
                const post = {
                    title,
                    author,
                    body
              }
              const newPost =  await create(post);
              res.writeHead(201, {'Content-Type':'application/json'});
              return  res.end(JSON.stringify(newPost))  
              
             
        } catch (error) {
           console.log(error);
        } 
}
export const updatePost = async (req, res, id) => {
     try {
         const post = findById(id);
         if(!post){
            res.writeHead(404, {'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'No such  post '}));  
         }else{
             const data = await getReqData(req);
             const newPost =  {
                 title: post.title || data.title,
                 author: post.author  || data.author,
                 body: post.body  ||  data.body
             }
             const  updatedPost = await update(newPost, id);
             res.writeHead(201, {'Content-Type':'application/json'});
             return  res.end(JSON.stringify(updatedPost));
         }
         
     } catch (error) {
          console.log(error) 
     }
}
export const deletePost = async (req, res, id) => {
     try {
            const post = await findById(id);
            if(!post){
                res.writeHead(404, {'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'No such  post '}));  
             }else{
                 await remove(id);
                 res.writeHead(200, {'Content-Type':'application/json'});
                 res.end(JSON.stringify({message: `Post with ${id} was removed `}));  
             }
     } catch (error) {
          console.log(error)
     }
     
}