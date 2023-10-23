const app = require("./index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe('Products', () => {
  describe('List Products', () => {
   
    it('should get nothing if there is no products before',async () => {
        await request.delete('/products')
        return request.get('/products').expect(404);
    });
    it('should get book list after adding book', async () => {
        await request.post('/products')
        return request.get('/products')
                    .expect(200)
                    
    });
    it('should get specific book after adding book', async () => {
        await request.delete('/products')
        await request.post('/products').send({
            id:100,
            name: 'book1'
          })
        const res =   await request.get('/products')
        expect(res.body[0].id).toBe(100)
                    
    });
    it('should get nothing if there is no id in books', async () => {
        return request.get('/products/190')
                    .expect(404)
                    
    });
  });
  describe('Delete Products',()=>{
    it('should delete all products',async()=>{
        await request.delete('/products')
        return request.get('/products').expect(404)
    })
    it('should delete correct products',async()=>{
        await request.delete('/products')
        await request.post('/products').send({
            id:100,
            name: 'book1'
          })
        return request.delete('/products/100').expect(200)
    })

  })
  describe('Post Products',()=>{
    it('should post products',async()=>{
        await request.post('/products').send({
            id:104,
            name: 'book1'
          }).expect(201)
    })
  })
  describe('put Products',()=>{
    it('should put products',async()=>{
        await request.put('/products/300').send({
            name: 'updatebook'
          }).expect(200)
    })
  })

//   describe('Create User', () => {
//     it('create new user failure', () => {
//       return request.post('/users')
//         .send({
//           name: 'nottyo',
//           job: 'developer'
//         })
//         .expect(201);
//     });
//   })
});