-- Creating tables for Unicorn Companies
CREATE TABLE Industries (
    ID VARCHAR(6) NOT NULL,
    Industry VARCHAR NOT NULL,
	--FOREIGN KEY (ID) REFERENCES Company_earnings(ID),
	PRIMARY KEY (ID)
);

CREATE TABLE Company_earnings (
	ID VARCHAR(6) NOT NULL,
	Total_Raised INT NOT NULL,
	Founded_Year DATE NOT NULL,
	Year_Joined DATE NOT NULL,
	--FOREIGN KEY (ID, Founded_Year) REFERENCES Status (ID, Founded_Year),
	--FOREIGN KEY (Founded_Year) REFERENCES Company_info (Founded_Year),
	PRIMARY KEY (ID)
);

CREATE TABLE Status (
	ID VARCHAR(6) NOT NULL,
	Financial_stage VARCHAR NOT NULL,
	Founded_Year DATE NOT NULL,
	Year_Joined DATE NOT NULL,
	--FOREIGN KEY (Year_Joined) REFERENCES Company_info (Year_Joined),
	PRIMARY KEY (ID)
);

CREATE TABLE Company_info (
	ID VARCHAR(6) NOT NULL,
	Company VARCHAR NOT NULL,
	Founded_Year DATE NOT NULL,
	Year_Joined DATE NOT NULL,
	Transition_Time VARCHAR NOT NULL,
	Country VARCHAR NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE Investor_info (
	Investor_count varchar NOT NULL,
	Select_investors varchar NOT NULL,
	Total_Raised INT NOT NULL
);

