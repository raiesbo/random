select * from country;

delete from country 
where code = 'NLD' and code2 = 'NA';

-- ADD PRIMARY KEY (needs unique column):
ALTER TABLE country
	ADD PRIMARY KEY(code);

-- ADD CONSTRAINS
ALTER TABLE country ADD CHECK(
	surfacearea >= 0
);

select distinct continent from country;

ALTER TABLE country ADD CHECK(
	continent in (
	'Asia',
	'South America',
	'North America',
	'Oceania',
	'Antarctica',
	'Africa',
	'Europe'
	)
)

-- Test check:
UPDATE country
SET continent = 'Europe2'
WHERE name = 'Netherlands';

-- Update the check:
ALTER TABLE country DROP CONSTRAINT "country_continent_check";
ALTER TABLE country ADD CHECK(
	continent in (
	'Asia',
	'South America',
	'North America',
	'Central America',
	'Oceania',
	'Antarctica',
	'Africa',
	'Europe'
	)
);

select * from country where name = 'Costa Rica';

update country
set continent = 'Central America'
where name = 'Costa Rica';

-- INDEXES:
create unique index "country_name" on country (
	name
);

create index "country_continent" on country (
	continent
);

-- Other indexes:
select * from city
	where name like 'Jinzhou%' and countrycode = 'CHN' and district = 'Liaoning';

update city
	set name = 'Jinzhou Old'
	where id = 2238;

create unique index "unique_name_countrycode_district"
on city (
	name, countrycode, district
);

create index "index_district" ON city (
	district
);

-- CREATE FOREIGN KEYS
ALTER TABLE city
	add CONSTRAINT fk_country_code
	FOREIGN KEY ( countrycode )
	REFERENCES country(code); -- ON DELETE CASCADE

INSERT INTO country
	values('AFG', 'Afgahnistan', 'Asia', 'Southern Asia', 652860, 1919, 40000000, 62, 69000000, NULL, 'Afghanistan', 'Totalitarian', NULL, NULL, 'AF');

ALTER TABLE countrylanguage
	add CONSTRAINT fk_country_code
	FOREIGN KEY ( countrycode )
	REFERENCES country(code);

select * from countrylanguage where countrycode = 'NAM';
delete from countrylanguage where countrycode = 'NAM';

select * from country where code = 'AFG';
delete from country where code = 'AFG'; -- Can not delete because of the existing relations

-- To update the foreign key, we need to drop and re-create.
ALTER TABLE countrylanguage
	DROP CONSTRAINT fk_country_code;
ALTER TABLE countrylanguage
	add CONSTRAINT fk_country_code
	FOREIGN KEY ( countrycode )
	REFERENCES country(code)
	ON DELETE CASCADE;
ALTER TABLE city
	drop CONSTRAINT fk_country_code;
ALTER TABLE city
	add CONSTRAINT fk_country_code
	FOREIGN KEY ( countrycode )
	REFERENCES country(code)
	ON DELETE CASCADE;

delete from country where code = 'AFG';
-- The next now should be empty
select * from country where code = 'AFG';
select * from countrylanguage where countrycode = 'AFG';
select * from city where countrycode = 'AFG';

