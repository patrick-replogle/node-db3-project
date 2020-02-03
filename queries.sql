-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.ProductName, c.CategoryName
FROM Product AS p
    JOIN Category AS c
    ON c.Id=p.CategoryId;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.Id, s.CompanyName
FROM "Order" AS o
    JOIN Shipper AS s On o.ShipVia = s.Id
WHERE o.OrderDate<'2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT p.ProductName, od.Quantity
FROM Product AS p
    JOIN OrderDetail AS od ON od.OrderId=10251
WHERE od.ProductId=p.Id
ORDER BY p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT [Order].Id AS OrderId, Customer.CompanyName, Employee.LastName
FROM [Order]
    JOIN Customer   , Employee
WHERE [Order].CustomerId=Customer.Id AND [Order].EmployeeId=Employee.Id

--STRETCH Questions - In SQL Try Editor at W3Schools.com:
--Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.

SELECT Categories.CategoryName, COUNT(Products.CategoryId) as Count
FROM Categories
    JOIN Products 
WHERE Categories.CategoryID = Products.CategoryId
GROUP BY Products.CategoryId;

--Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT od.OrderID, SUM(od.Quantity) AS ItemCount
FROM OrderDetails AS od
GROUP BY od.OrderID

