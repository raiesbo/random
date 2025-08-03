select distinct continent from country order by continent asc;

-- CREATE continent TABLE WITH ALL THE CONTINENTS FROM THE country table
CREATE TABLE continent (
	"code" SERIAL NOT NULL,
	"name" text UNIQUE NOT NULL,
	PRIMARY KEY ("code")
);

-- Use the select query as input for the insert query.
INSERT INTO continent (name)
	select distinct continent
	from country
	order by continent asc;

SELECT * FROM continent;

-- Seed country copy table:
TRUNCATE country_copy;
INSERT INTO country_copy
	select *
	from country;
SELECT * from country_copy;

ALTER TABLE country_copy
	drop CONSTRAINT country_copy_continent_check;

select
	a.name, a.continent, 
	( select code from continent b where b.code = a.continent )
from country_copy a;

UPDATE country_copy a
set continent = (select code from continent b where b.name = a.continent);

SELECT * FROM country_copy;

ALTER TABLE country_copy
	ALTER COLUMN continent TYPE int4
	USING continent::integer;

ALTER TABLE country_copy
	add CONSTRAINT fk_continent
	FOREIGN KEY (continent)
	REFERENCES continent(code);

select * from country_copy;
update country_copy
set continent = 2
where code = 'ATA';

-- Create relation language table and relation with country language
select distinct "language" from countrylanguage;

CREATE TABLE "language" (
	code serial NOT NULL,
	name text UNIQUE NOT NULL,
	primary key code
);

alter table language
	add constraint "pk_code"
	primary key (code);

select * from "language";
truncate "language";
drop table "language";

INSERT INTO "language" (name)
	SELECT DISTINCT "language" from countrylanguage order by language asc;

ALTER TABLE countrylanguage
	add column languagecode int4;

select * from countrylanguage;

UPDATE countrylanguage cl
	set languagecode = (select "code" from "language" l where l.name = cl.language);

ALTER TABLE countrylanguage
	add CONSTRAINT fk_language
	FOREIGN KEY (languagecode)
	REFERENCES language(code);

alter table countrylanguage
	drop column laguagecode;
drop table language;

	

