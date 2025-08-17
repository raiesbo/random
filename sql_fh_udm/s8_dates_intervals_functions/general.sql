select * from employees;

-- Time
select
	now(), -- The date the data based is located in (combination of CURRENT_DATE and CURRENT_TIME).
	CURRENT_DATE, -- Only the date
	CURRENT_TIME, -- Only the time
	date_part('years', now()) as years,
	date_part('months', now()) as months,
	date_part('days', now()) as days,
	date_part('hours', now()) as hours,
	date_part('minutes', now()) as minutes,
	date_part('seconds', now()) as seconds;

-- Date conditional
select *
	from employees
	where hire_date > '1990-09-01'
	order by hire_date;

-- Aggretated functions
select
	max(hire_date) as newest,
	min(hire_date) as olderst
	from employees;

select *
	from employees
	where hire_date between '1999-01-01' and '1999-12-01'; -- Between includes both ends.

-- MANIPULATING DATES:
select 
	max(hire_date),
	max(hire_date) + INTERVAL '1 day' as days,
	max(hire_date) + INTERVAL '1 month' as months,
	max(hire_date) + INTERVAL '1 year 6 months' as years,
	date_part('year', now()),
	make_interval( YEARS := 23 ),
	max(hire_date) + MAKE_INTERVAL( YEARS := 20 ) -- Add dynamic data
from employees;

-- INTERVAL DIFFERENCE
SELECT
	hire_date,
	MAKE_INTERVAL( YEARS := 2025 - EXTRACT(YEARS FROM hire_date)::integer ) as manual,
	MAKE_INTERVAL( YEARS := date_part('year', CURRENT_DATE)::integer - EXTRACT(YEARS FROM hire_date)::integer ) as computed
FROM employees
	order by manual;

UPDATE employees
SET hire_date = hire_date + INTERVAL '25 years';

-- CASE - THEN
select
	first_name,
	last_name,
	hire_date,
	CASE
		when hire_date > NOW() - INTERVAL '1 year' then 'Range A'
		when hire_date > NOW() - INTERVAL '3 year' then 'Range B'
		when hire_date > NOW() - INTERVAL '6 year' then 'Range C'
		else 'Range D'
	END as range
from employees
	order by hire_date desc;
