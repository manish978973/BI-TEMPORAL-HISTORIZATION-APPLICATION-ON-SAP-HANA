<h1>SAP HANA BI-TEMPORAL HISTORIZATION APPLICATION</h1>

<div>
  <p1>BiTemporal Historization is a special case of temporal database modelling designed to handle historical data along two different timelines. The information is registered as “as it actually was” and “as it was recorded” at some point in time and the information is not discarded even if it is erroneous. This modelling of enterprise information finds application in a variety of use cases in the daily business as usual context.The following types of information can be known with this implementation technique namely the instance of most recent and accurate data possible which is the current truth, the data at any past point of time which is the past truth and also, when and why the data has been changed to the most recent accurate data.</p1>
</div>

### INTRODUCTION

A temporal database stores data relating to time instances. It offers temporal data types and stores information relating to past, present and future time. Temporal databases could be unitemporal, bi-temporal or tri-temporal.The Project deals with the implementation of a Bi-Temporal Historization model based on SAP HANA Database which should be able to handle the insert, update, correction and deletion of
data records. The data records in the CSV files will be loaded on daily basis to the HANA Database so that a bi-temporal model is established so that the business end user can perform and see the relevant sequence of changes/updates happened to the data records over time. The Business user should be able to identify if a specific data record is valid and active or not at a
particular instance of time. The Business user should be also able to perform corrections in the data records when he realizes that the data records on a past particular date is invalid and needs to be corrected.

### DATA FLOW DIAGRAM

![alt text](https://github.com/manish978973/SAPHANA/blob/master/Images/Dataflow.PNG "Logo Title Text 1")

### SPECIFICATION OF TABLES IN SAP HANA DATABASE

* CustomerDetailsVirtualTable table which serves as database table to populate data from CSV file to Hana table in the initial process
* Customer_Staging_Store table which acts as a staging table and is used to populate data from CSV file.
* Customer_Technical Table with two-time dimensions: Business Validity period and Technical Validity period. 

### SPECIFICATION OF CSV FILE

The application contains a CSV file named CustomerDetails.csv which in turn contains the customer details like the Customer number, Name, his/her Business Validity Date and Location details

![alt text](https://github.com/manish978973/SAPHANA/blob/master/Images/csv.PNG "Logo Title Text 1")

### SPECIFICATION OF FLOW GRAPH

The application contains a data flow graph named CSVtabelToStagingStore.hdbflowgraph to populate data into Customer_Staging_Store table from CustomerDetailsVirtualTable table. The data loaded into CustomerDetailsVirtualTable table from CSV file needs to be populated into
Customer_Staging_Store. This functionality is implemented by designing a flow graph model.

![alt text](https://github.com/manish978973/SAPHANA/blob/master/Images/flowgraph.PNG "Logo Title Text 1")

### SPECIFICATION OF CALCULATION VIEWS

The application contains two calculation views BiTemporalCurrentTruth.calculationview and BiTemporalPastTruth.calculationview.

##### BiTemporalCurrentTruth.calculationview:

The view should visualize only the current/present details of the customer. This is done by filtering the customer data in the Cutomer_Technical table having active Business_valid_to and Technical_valid_to columns. In the Filter expression, desired filtering condition of TECHNICAL_VALID_TO = ‘99991231’ and BUSINESS_VALID_TO = ‘9999-12-31’ is added to filter the present details of the
customer.

#####  BiTemporalPastTruth.calculationview:

The view should visualize only the past and present correct details of the customer. This is done by filtering the customer data in the Cutomer_Technical table having active Technical_valid_to columns. In the Filter expression, desired filtering condition of TECHNICAL_VALID_TO = ‘99991231’ is added to filter the past truth of the customers.

### SPECIFICATION OF STORED PROCEDURES

The application contains four stored procedures for implementing Bi-temporal concept in SAP
HANA.

Stored procedure 1 - biTemporalInsertStoredProcedure

Stored procedure 2 - biTemporalCorrectionStoredProcedure

Stored procedure 3 – biTemporalMainStoredProcedure

Stored procedure 4 – biTemporalHistorizationStoredProcedure

The stored procedure biTemporalInsertStoredProcedure is used to insert fresh/new customers’ data into Customer_Technical table.

The stored procedure biTemporalCorrectionStoredProcedure is used for updation, correction and deletion of data in the Customer_Technical table and hence implement the bi-temporal logic. 

Updation is done as follows:

* Technically close the invalid business case by replacing technical_valid_to column from ‘9999-12-31’ to the specific date of edition.

* Updating the past business details of the customer by altering the Business_valid_to and Technical_valid_to columns in the customer_technical_table.

* Inserting the new and present business details of the customer with Business_valid_to and Technical_valid_to set as ‘9999-12-31’.

Correction is done as follows:

* Technically close and update the invalid business cases with appropriate technical dates.

* Insertion of new corrected data in the technical table.

Deletion is done as follows:

* Close all the Technical_Valid_To and Business_Valid_To dates of all the records of a
customer to delete the customer.

The stored procedure biTemporalMainStoredProcedure calls the biTemporalInsertStoredProcedure and the biTemporalCorrectionStoredProcedure based on the incoming customer record. If the customer is already existing, biTemporalCorrectionStoredProcedure will be invoked, otherwise,biTemporalInsertStoredProcedure will be invoked.The stored procedure biTemporalHistorizationStoredProcedure invokes the data flow graph and the biTemporalMainStoredProcedure so the bitemporal historization data model is created.

### SPECIFICATION OF UI5 APPLICATION

The application is used to visualize

* Entire content of Customer_Technical table
* Calculation views: BiTemporalCurrentTruth.calculationview and BiTemporalPastTruth.calculationview.

The Client have the provision to search appropriate customer data in the bitemporal table using a search bar feature.





<h2>SCREENSHOT OF SAP UI5 APPLICATION</h2>

<image src="content/Images/UI5.PNG" alt="image2"> 
  
  
 **Technical Table with full customer data**
 ![alt text](https://github.com/manish978973/SAPHANA/blob/master/Images/biitemporalall.PNG "Logo Title Text 1")
