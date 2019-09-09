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


<h2>SCREENSHOT OF SAP UI5 APPLICATION</h2>

<image src="content/Images/UI5.PNG" alt="image2"> 
