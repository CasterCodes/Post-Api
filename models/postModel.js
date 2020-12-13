import posts from '../data/Posts.js';
import  {v4 as uuidv4} from 'uuid';

export const findAll = () => {
     return new Promise((resolve, reject) => {
            resolve(posts)
     })
}

export const findById =  (id) => {
    return new Promise((resolve, reject) => {
        const post = posts.find(post => post._id === id)
          post ? resolve(post): reject('no such post');
    })
}
export const create = (post) => {
       return new Promise((resolve, reject) => {
              const newPost = {id:uuidv4(), ...post};
              posts.push(newPost);
              resolve(newPost);
       })
}

export const update = (post, id) => {
    return new Promise((resolve, reject) => {
        const index = posts.findIndex(post => post._id === id);
        posts[index] = {id:uuidv4(), ...post};
        resolve(posts[index]);
    })
}

export const remove  = (id) => {
          return new Promise((resolve, reject) => {
            posts.filter(post => post._id !== id);
            resolve();
            console.log(posts)
          });
}