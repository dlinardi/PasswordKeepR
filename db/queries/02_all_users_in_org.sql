SELECT users.last_name, users.first_name, users.email, orgs.name, org_users.can_write
FROM users
JOIN org_users on org_users.user_id = users.id
JOIN organizations orgs ON org_users.org_id = orgs.id
WHERE orgs.id = 5
ORDER BY can_write DESC, users.last_name;
