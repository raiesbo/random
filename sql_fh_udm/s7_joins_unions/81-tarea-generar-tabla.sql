-- Count Union - Tarea
-- Total |  Continent
-- 5	  | Antarctica
-- 28	  | Oceania
-- 46	  | Europe
-- 51	  | America
-- 51	  | Asia
-- 58	  | Africa

SELECT * FROM country;
SELECT * FROM continent;

SELECT count(*) as total, ct.name as continent
	FROM country c
	JOIN continent ct on ct.code = c.continent
	WHERE ct.name NOT LIKE '%America%'
	GROUP BY ct.name
UNION
SELECT count(*) as total, 'America' as continent
	FROM country c
	JOIN continent ct on c.continent = ct.code
	WHERE ct.name LIKE '%America'
ORDER BY total;


-- This is a more complex way of creating the second part of the query:
SELECT sum(count) as total, 'America' as continent
	FROM (
		SELECT count(*)
		FROM country c
		JOIN continent ct on ct.code = c.continent
		WHERE ct.name LIKE '%America%'
		GROUP BY ct.name
);

-- What is the country with more cities?
select * from city;

SELECT count(*) as city_count, co.name as country
	FROM city ci
	JOIN country co on co.code = ci.countrycode
	GROUP BY co.name
	ORDER BY count(*) DESC
	LIMIT 1;

-- What are the official languages per continent?
select * from language;
select distinct l.language, ct.name from countrylanguage l
	JOIN country c on c.code = l.countrycode
	JOIN continent ct on ct.code = c.continent
	WHERE l.isofficial = true
	ORDER BY ct.name asc, l.language asc;

-- How many different languages are spoken in each continent?
select count(distinct l.language), ct.name from countrylanguage l
	JOIN country c on c.code = l.countrycode
	JOIN continent ct on ct.code = c.continent
	WHERE l.isofficial = true
	GROUP BY ct.name
	ORDER BY count(distinct l.language) asc;


-- Change the previous query to use the correct language table.
select * from language;

select distinct l.name, ct.name from countrylanguage cl
	JOIN language l on cl.languagecode = l.code
	JOIN country c on c.code = cl.countrycode
	JOIN continent ct on ct.code = c.continent
	WHERE cl.isofficial = true
	ORDER BY ct.name asc, l.name asc;




