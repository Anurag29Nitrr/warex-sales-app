const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/warex-sales-app')  //, {
   // usenewUrlParser: true,
   // useUnifiedTopology: true,
//})
.then(()=> console.log('mongodb connected yeah'))
.catch(err=> console.error('mongodb me kuch error hai:',err));

module.exports=mongoose;