
-- 1. Ver todos los registros
select * from users;

-- 2. Ver el registro cuyo id sea igual a 10
select * from users where id = 10;

-- 3. Quiero todos los registros que cuyo primer nombre sea Jim (engañosa)
select * from users where name like 'Jim %';

-- 4. Todos los registros cuyo segundo nombre es Alexander
select * from users where name like '% Alexander';

-- 5. Cambiar el nombre del registro con id = 1, por tu nombre Ej:'Fernando Herrera'
update users
set name = "Ferdinan Smith"
where id = 1

-- 6. Borrar el último registro de la tabla
-- select max(id) from users;
DELETE from users 
where id = (select max(id) from users);

-- STRINGS

select
    name,
    SUBSTRING(name, 0, POSITION(' ' in name)) as first_name,
	SUBSTRING(name, POSITION(' ' in name)+1) as last_name,
	TRIM(SUBSTRING(name, POSITION(' ' in name))) as trimmed_last_name,
	POSITION(' ' in name)
from users; 

UPDATE users
SET
	first_name = SUBSTRING(NAME, 0, POSITION(' ' in name)),
	last_name = TRIM(SUBSTRING(name, POSITION(' ' in name)));