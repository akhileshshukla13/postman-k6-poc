---
runme:
  id: 01HMBGE4D0EX65QAN11F5P197E
  version: v3
---

# postman-k6-poc

```sh {"id":"01HMBGECEV5F5QJT1SR6CZH9YV"}

---------------------------------------------------------------------------------------------------------

Steps to convert postman collection to k6 script and execute k6 script to test 
the performance of api .

it will generate the report in html file.

1. Import all collections from postman to this project under collections folder.
2. Import all enviornments from postman to this project under enviornment folder.
3. Import all test data and keep under testdata folder in csv or json format.
4. Execute below scripts to convert postman collections to k6 script-
'node convert_postman_k6.js uat testdata.json'  // here uat is environment file namewe need to pass as command line argument. testdata.json is test data file .
5. Execute below scripts to execute k6 script to generate the matrix and html report.
'node k6_execution_report_generation.js'
6. If you face any issue in deleting folder , please retry to execute steps 4 multiple time untill you get success.
7. if we have to run collection with data then try to keep only one collection at the same time under collections/collections-with-data folder.
8. if we have to run collection without data then we can keep multiple together under collections/collections-without-data folder.
9. we can create individual script like postman-to-k6:sample and k6:sample.







```