-- Up Migration

ALTER TABLE users ADD COLUMN totp_secret TEXT;

-- Down Migration

ALTER TABLE users DROP COLUMN totp_secret;