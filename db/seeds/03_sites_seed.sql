INSERT INTO sites
(url, login_name, associated_email, password, created_date, deleted_date, org_id)
VALUES
()
;



id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(255) NOT NULL,
  login_name VARCHAR(255) NOT NULL,
  associated_email VARCHAR(255) NOT NULL,

  password VARCHAR(255) NOT NULL,

  created_date DATE NOT NULL,
  deleted_date DATE,

  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
