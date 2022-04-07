SELECT "Company", "Valuation ($B)", "Date Joined", "Country", "City", "Industry", "Select Investors", "Founded Year", "Total Raised", "Financial Stage", "Investors Count", "Deal Terms", "Portfolio Exits"
	FROM public."Unicorn_Companies";

SELECT "Company ", "Valuation ($B)", "Year Joined ", "Country", "City", 
"Industry", "Select Investors", "Founded Year", "Investors Count", "Total Raised($)", 
"Transition Time(Years)"
	FROM public."Unicorn_Eval";

INSERT INTO industries ("Industry")
SELECT "Industry" FROM public."Unicorn_Eval";

INSERT INTO company_earnings ("total_raised", "founded_year", "year_joined")
SELECT "Total Raised($)", "Founded Year", "Year Joined " FROM public."Unicorn_Eval";

INSERT INTO company_info ("company", "founded_year", "year_joined", "transition_time", "country")
SELECT "Company ", "Founded Year", "Year Joined ", "Transition Time(Years)", "Country" FROM public."Unicorn_Eval";

INSERT INTO investor_info ("investor_count", "select_investors", "total_raised")
SELECT "Investors Count", "Select Investors", "Total Raised($)" FROM public."Unicorn_Eval";

INSERT INTO status ("financial_stage", "founded_year", "year_joined")
SELECT c."Financial Stage", "Founded Year", e."Year Joined " 
FROM public."Unicorn_Eval" e
INNER JOIN public."Unicorn_Companies" c ON c."Date Joined" = e."Year Joined "
