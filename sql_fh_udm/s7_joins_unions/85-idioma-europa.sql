
-- ¿Cuál es el idioma (y código del idioma) oficial más hablado por diferentes países en Europa?

select * from countrylanguage where isofficial = true;
select * from country;
select * from continent;
Select * from "language";

select count(c) as total, cl.languagecode, cl.language from countrylanguage cl
	join country c on cl.countrycode = c.code
	where cl.isofficial = true and c.region like '%Europe%'
	group by cl.languagecode, cl.language
	order by total desc
	limit 1;

-- Listado de todos los países cuyo idioma oficial es el más hablado de Europa 
-- (no hacer subquery, tomar el código anterior):

select count(c) as total, c.name from countrylanguage cl
	join country c on cl.countrycode = c.code
	where cl.isofficial = true and c.region like '%Europe%'
	group by c.name
	order by total desc;
-- Previous part is not correct, I need to find the list of european countries where one of the official
-- languages is the 135 (German):
select c.name from country c
	join countrylanguage cl on cl.countrycode = c.code
	where cl.isofficial = true and cl.languagecode = 135 -- We could use a subquery to obtain this value.
	order by c.name asc;






