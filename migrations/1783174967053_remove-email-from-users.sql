-- Up Migration

ALTER TABLE users DROP COLUMN email;

-- Down Migration

ALTER TABLE users ADD COLUMN email VARCHAR(255) NOT NULL;
CREATE UNIQUE INDEX users_email_key ON users (email) WHERE deleted_at IS NULL;