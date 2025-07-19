CREATE TABLE "users" (
	name VARCHAR(10) UNIQUE
);

-- Removes the table itself with all the data it contains
DROP TABLE users;

-- Deletes all the entries from the from the table
TRUNCATE TABLE users;

INSERT INTO users (name)
VALUES
	('Lord Byrin'),
	('Martí')
	('Melissa');


SELECT * FROM users;

-- auto commit;

UPDATE users
SET 
	"name" = 'Lord Melis'
WHERE "name" = 'Melissa';


SELECT name
	FROM users
	where name LIKE '%Byr%'
	LIMIT 4;

select * from users;

select * from users where name like '_ord%';

delete from users where name like '%yri%';

-- 1. Ver todos los registros
select * from users;

-- 2. Ver el registro cuyo id sea igual a 10
select * from users where id = 10;

-- 3. Quiero todos los registros que cuyo primer nombre sea Jim (engañosa)
select * from users where name like 'Jim%';

-- 4. Todos los registros cuyo segundo nombre es Alexander
select * from users where name like '%Alexander';

-- 5. Cambiar el nombre del registro con id = 1, por tu nombre Ej:'Fernando Herrera'
update users
set name = 'Fernando Herrera'
where id = 1;

-- 6. Borrar el último registro de la tabla
delete from users where id = 3980;

select max(id) from users return id;

delete from users where id = (select max(id) from users);

SELECT
	id,
	name,
	CONCAT('#', id, '-', name) as barcode,
	UPPER(name) as upper_name,
	LOWER(name) as lower_name,
	LENGTH(name) as length,
	'20' as constant
FROM
	users;
