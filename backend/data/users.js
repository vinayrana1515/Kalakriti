import bcrypt from 'bcryptjs'

const users = [
    {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123',10), 
    isAdmin:true
},
    {
    name: 'Vinay Rana',
    email: 'vinay@example.com', 
    password: bcrypt.hashSync('vinay123',10), 
   
},
    {
    name: 'Shruti Gupta',
    email: 'shruti@example.com',
    password: bcrypt.hashSync('shruti123',10), 
      
},
    {
    name: 'Zaid Khan',
    email: 'zaid@example.com',
    password: bcrypt.hashSync('zaid123',10),  
     
},
    {
    name: 'Diksha',
    email: 'diksha@example.com',
    password: bcrypt.hashSync('diksha123',10), 
     
},
]

export default users