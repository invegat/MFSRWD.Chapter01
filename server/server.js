import http from 'http'; 
import express from 'express'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/local');

const articlesSchema = {
  articleTitle: String,
  articleContent: String
};

const Article = mongoose.model('Article',articlesSchema,'articles');

const app = express(); 
app.server = http.createServer(app); 

// CORS - 3rd party middleware 
app.use(cors()); 

// This is required by falcor-express middleware  
//to work correctly with falcor-browser 
app.use(bodyParser.json({extended: false})); 

app.get('/', (req, res) => {
 Article.find( (err, articleDocs) => {
   const ourArticles = articleDocs.map((articleItem) => {
     return `&grave;<h2>${articleItem.articleTitle}</h2>
            ${articleItem.articleContent}&grave;;`
   }).join('<br/>');

   res.send(`&grave;<h1>Publishing App Initial Application!</h1>
      ${ourArticles}&grave;`);
 })
});
app.server.listen(process.env.PORT || 3000); 
console.log(`Started on port ${app.server.address().port}`); 
export default app;
