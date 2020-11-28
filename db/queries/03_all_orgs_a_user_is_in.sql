SELECT orgs.*
FROM users
JOIN org_users on org_users.user_id = users.id
JOIN organizations orgs ON org_users.org_id = orgs.id
WHERE users.id = 2;
