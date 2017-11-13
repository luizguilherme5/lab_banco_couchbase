# lab_banco_couchbase
Uma aplicação que usa Node, Express, REST Services, Couchbase e NOSQL

# Alunos:
* Cauê Mateus de Oliveira - 14/0056068
* Gustavo Vieira Braz - 14/0041478
* Luiz Guilherme Silva - 14/0056645

# Instalação
* Instale o Postman
* Instale o Couchbase Server (Community Edition)
* Crie um Data Bucket chamado "lab_banco", sem senha
* Vá até a pasta onde seu Couchbase está instalado, e abra o console do couchbase (cbq.old)
* Rode a seguinte query "CREATE PRIMARY INDEX `lab_banco_index` ON `lab_banco`;"
* Pronto!

# Utilização
## Para adicionar um registro: URL - POST - http://localhost:3000/lab_banco/sales com o seguinte JSON:
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
## Para verificar todos os registros: URL - GET - http://localhost:3000/lab_banco/sales
## Para verificar um registro específico: URL - GET - http://localhost:3000/lab_banco/sales/{id gerado}
