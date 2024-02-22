dc -f postgresql.yaml up

dc -f postgresql.yaml stop

dc -f postgresql.yaml down

postgresql-client:
        
       	psql -h localhost -p 5432  -d postgres -U user -W



       pg_dump --username=user -W --host=localhost --port=5432 --schema-only postgres> ddl-2.sql

        
	docker exec -it <container-id> bash



adminer:

	http://localhost:8080
	
	System = PostgreSQL	
	Server	= db
	Username = user	
	Password = admin	
	Database = postgres


docker-postgresql:
	
	https://hub.docker.com/_/postgres
