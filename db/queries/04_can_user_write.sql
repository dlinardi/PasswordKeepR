SELECT users.id AS user_id, users.last_name, users.first_name, orgs.name, can_write
FROM org_users
JOIN users ON org_users.user_id = users.id
JOIN organizations orgs ON org_users.org_id = orgs.id
WHERE users.id = 2;
