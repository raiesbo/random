-- Nombre, apellido e IP, donde la última conexión se dió de 221.XXX.XXX.XXX
SELECT first_name, last_name, last_connection
FROM users
WHERE last_connection like '221.%';

-- Nombre, apellido y seguidores(followers) de todos a los que lo siguen más de 4600 personas
SELECT first_name, last_name, followers
FROM users
WHERE followers > 4600;

-- BETWEEN operation
SELECT first_name, last_name, followers
FROM users
WHERE followers >= 4600 AND followers <= 4700
order by followers desc;

SELECT first_name, last_name, followers
FROM users
WHERE followers between 4600 and 4700
order by followers desc;

-- MIN MAX COUNT ROUND AVG
select * from users;

select
	COUNT(*),
	MIN(followers) as min_followers,
	MAX(followers) as max_followers,
	AVG(followers) as avg_followers,
	ROUND(AVG(followers)) as avg_followers_round
from users;

-- GROUP BY
select id, first_name, last_name, followers
from users
where followers = 4 or followers = 4999;

select count(*), followers
from users
where followers = 4 or followers = 4999
GROUP BY followers;

select count(*), followers
from users
where followers between 4500 and 4999
group by followers
order by followers desc;

select count(*) as total, country
from users
group by country
having count(*) > 6
order by count(*) desc;

select DISTINCT country from users;

select email, SUBSTRING(email, POSITION('@' in email)+1) as domain
from users;

select
	count(*),
	SUBSTRING(email, POSITION('@' in email)+1) as domain
from
	users
group by
	SUBSTRING(email, POSITION('@' in email)+1)
having
	count(*) > 1
order by
	count(*) desc;

-- SUB_QUERIES

select
	sum(total)
from (
	select
		count(*) as total,
		SUBSTRING(email, POSITION('@' in email)+1) as domain
	from
		users
	group by
		SUBSTRING(email, POSITION('@' in email)+1)
	having
		count(*) > 1
	order by
		count(*) desc
) as email_domains;
