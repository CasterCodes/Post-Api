import http from 'http';
import {getPosts, getPostById, createPost, updatePost,deletePost} from './controller/postController.js';


const server = http.createServer((req, res) => {
      if(req.url === '/api/posts' && req.method === 'GET'){
            getPosts(req, res);
      }else if(req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'GET'){
          const id = +req.url.split('/')[3];
          getPostById(req, res, id);

      } else if(req.url === '/api/posts' && req.method === 'POST'){
            createPost(req, res);
         }else if(req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'PUT') {
            const id = +req.url.split('/')[3];
            updatePost(req, res, id);
         }else if(req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'DELETE') {
            const id = +req.url.split('/')[3];
            deletePost(req, res, id);
         }else{
          res.writeHead(404, {'Content-Type':'application/json'})
          res.end(JSON.stringify({message:'Route not found'}))
      }
   
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));