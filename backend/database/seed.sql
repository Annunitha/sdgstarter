-- Run schema.sql first.
-- Then run:
-- node database/create-demo-users.js
--
-- Optional demo location records can be inserted after the demo users exist.

INSERT INTO locations
  (name, description, category, latitude, longitude, status)
VALUES
  ('Lorem Location One', 'Lorem ipsum dolor sit amet.', 'resource', NULL, NULL, 'active'),
  ('Lorem Location Two', 'Lorem ipsum dolor sit amet.', 'facility', NULL, NULL, 'active'),
  ('Lorem Location Three', 'Lorem ipsum dolor sit amet.', 'service', NULL, NULL, 'active')
ON CONFLICT DO NOTHING;
