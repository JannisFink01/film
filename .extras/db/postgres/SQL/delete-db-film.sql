-- Revoke privileges
REVOKE ALL ON DATABASE film FROM film;

-- Drop tables and schema
DROP SCHEMA IF EXISTS film CASCADE;

-- Drop tablespace
DROP TABLESPACE IF EXISTS filmspace;

-- Drop database
DROP DATABASE IF EXISTS film;

-- Drop role
DROP ROLE IF EXISTS film;