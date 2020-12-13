const getReqData = (req) => {
      return new Promise((resolve, reject) => {
            try {
                let data = '';
                req.on('data', (chunk) => {
                   data += chunk.toString();
                })
                req.on('end', () => {
                   resolve(JSON.parse(data));
                })

            }catch(error) {
               reject(error);
            }
            
      })
}
export default getReqData;