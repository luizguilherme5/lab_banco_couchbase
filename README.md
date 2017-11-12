# node_express_couchbase
A Sample App that uses Node + Express Module for REST Webservices + Couchbase + SDK Database NOSQL. This needs to be testing using 
REST Clients like POST Man

#Prerequisites

Install Couchbase Server- It is free for development uses

Create Data Bucket "rahul_couchbase" and set password to "password" - Check the config.json in Project for connection 
settings for the project. Check config Image in Branch. Run following Query to make the Bucket queriable
Read here for details - http://developer.couchbase.com/documentation/server/current/indexes/indexing-overview.html, http://developer.couchbase.com/documentation/server/current/n1ql/n1ql-language-reference/createprimaryindex.html

CREATE PRIMARY INDEX `rahul_couchbase_index` ON `rahul_couchbase` 

Create the Document - sales_doc -- inside doc create view - sales_active

Refer Couchbase documentation site on help/ reading on this topic. I have added the code for view in DB Config

```
// This is a Couchbase view for active sales
function (doc, meta) {
  if(meta.id.includes("sale")){
    if(doc.endDate){
      if((new Date( Date.parse(doc.endDate)) >= new Date())
         		&& (new Date( Date.parse(doc.startDate)) <= new Date()) ){
  			emit(doc);
      }
    }
  }
}
```

# URL Patterns to test

## For Adding Sale Use JSON Structure - 
```
{
  "productName": "I Phone 444",
  "prodDesc": "Iphone",
  "basePrice": 20000,
  "imageLink": "https://i.gadgets360cdn.com/large/Apple_iPhone_7_1473917844244.jpeg?downsize=120:90&output-quality=60&output-format=jpg",
  "endDate": "2016-11-30",
  "startDate": "2016-09-14",
  "sellerId" : "tonystark@gmail.com"
}
```
URL - POST - http://localhost:3000/freewillrv/sales

## Fetching data from Active sales view

URL - GET - http://localhost:3000/freewillrv/sales

## Fetching data for a specific sales

URL - GET - http://localhost:3000/freewillrv/sales/write_sale_id_here
