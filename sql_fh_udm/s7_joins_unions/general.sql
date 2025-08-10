-- clean up before the starting the JOIN section
drop table city;
drop table countrylanguage;
drop table language;
drop table country;
drop table continent;

-- Validation
select * from continent;
select * from country;

-- UNIONS CLAUSE (Union of results to merge them in a single output):
-- The result of both selects need to follow the same str (same fields and types).
-- Similar to adding multiple OR conditions to a select.
select * from continent where name like '%America%'
	UNION
	select * from continent where code in (3, 5)
	order by name asc;

-- UNIONS with WHERE:
select
	a.name as country,
	b.name as continent
from
	country a,
	continent b
where a.continent = b.code
order by b.name asc;

-- UNIONS with JOIN (INNER JOIN):
select
	c.name as country,
	ct.name as continent
from country c
inner join continent ct on ct.code = c.continent
order by ct.name asc;

-- RESTART SEQUENCE AFTER REMOVING ENTRIES:
alter SEQUENCE "continent_code_seq" RESTART with 8;

-- Testing
insert into continent (name)
values ('North Asia');
-- delete from continent where code = 9;

select
	c.name,
	c.continent as continentCode,
	ct.name as continent
	from country c
	full outer join continent ct on c.continent = ct.code
	order by ct.name asc;

SELECT
	c.name,
	c.continent as continentCode,
	ct.name as continent
	FROM country c
	right outer join continent ct on c.continent = ct.code
	where c.code is null
	order by ct.name asc;
	
-- AGGREGATIONS AND JOINS

SELECT count(*), ct.name -- (select cc.name from continent cc where cc.code = c.continent)
	FROM country c
	INNER JOIN continent ct ON  ct.code = c.continent
	GROUP BY ct.name
	ORDER BY count(*) ASC;
-- Opposite case
SELECT 0, ct.name
	FROM continent ct
	full outer JOIN country c ON c.continent = ct.code
	WHERE c.code IS NULL
	GROUP BY ct.name;
-- BOTH TOGETHER
SELECT count(*) as total, ct.name -- (select cc.name from continent cc where cc.code = c.continent)
	FROM country c
	INNER JOIN continent ct ON  ct.code = c.continent
	GROUP BY ct.name
UNION
SELECT 0 as total, ct.name
	FROM continent ct
	full outer JOIN country c ON c.continent = ct.code
	WHERE c.code IS NULL
	GROUP BY ct.name
ORDER BY total;

