# MOCK JWT Server

<img src="http://jwt.io/img/logo-asset.svg" />

- Na clone / download: `npm install`
- Docker desktop is nodig om dit project te draaien.
- `docker.sh` script (bash script) start automatisch een
  docker container met de `--rm` flag op. Dit betekent, dat
  zodra de container gestopt is, deze automatisch verwijderd
  wordt. Als de container al draait, dan wordt geen poging ondernomen deze te starten.
- Om alles te starten kan `npm run boot` gestart worden, deze voert ook het `docker.sh` script uit.
- Communicatie kan via `http://localhost:4001`

## Voorbeelden

De voorbeelden staan in de `./requests` map.
Om een **REST** client te draaien in VSCode, kun je deze plugin installeren: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
([Thunder Client ](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) of [Postman](https://www.postman.com) kan natuurlijk ook) 
- `register.http` - Registratie van een nieuwe gebruiker
- `login.http` - Inloggen
- `welcome.http` - Simpele pagina die de token als argument meestuurt

## TODO

- ~~Levensduur van het token opnemen in `.env` (is nu 5 minuten - test situatie )~~

## BELANGRIJK

Maak een `.env` file in de root van het project met de volgende
informatie:

```env
API_PORT=4001
MONGO_URI=mongodb://localhost:27017
MONGO_DB=webtoken
MONGO_COLLECTION=users
TOKEN_KEY=this_is_a_token
TOKEN_EXPIRES_IN=5min
```

## Register

Method: **POST**

```shell
http://localhost:4001/register
```

### Body:

```json
{
  "first_name": "Voornaam",
  "last_name": "Achternaam",
  "email": "email@example.com",
  "password": "supah-dupah"
}
```

### Result:

```json
{
  "_id": "655e3813ca39cc4520fe75f9",
  "first_name": "Voornaam",
  "last_name": "Achternaam",
  "email": "email@example.com",
  "password": "$2a$10$g3DtQ7MYF7EhtfnN8LIvL.RPnFXNnQQmCTnnWhajPP5faYzPdOYGm",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU1ZTM4MTNjYTM5Y2M0NTIwZmU3NWY5IiwiZW1haWwiOiJyZW5lQGtyZXdpbmtlbC5ubCIsImlhdCI6MTcwMDY3MzU1NSwiZXhwIjoxNzAwNjgwNzU1fQ.AR9dVw3mYt_iyVy1Qc0g-dpI-or19iBCpVCiChHOJ38"
}
```

## Login

Method: **POST**

```shell
http://localhost:4001/login
```

### Body:

```json
{
  "email": "email@example.com",
  "password": "supah-dupah"
}
```

### Result:

```json
{
  "_id": "655e3813ca39cc4520fe75f9",
  "first_name": "Voornaam",
  "last_name": "Achternaam",
  "email": "email@example.com",
  "password": "$2a$10$g3DtQ7MYF7EhtfnN8LIvL.RPnFXNnQQmCTnnWhajPP5faYzPdOYGm",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU1ZTM4MTNjYTM5Y2M0NTIwZmU3NWY5IiwiZW1haWwiOiJyZW5lQGtyZXdpbmtlbC5ubCIsImlhdCI6MTcwMDY3MzY4OSwiZXhwIjoxNzAwNjgwODg5fQ.c_jKBZFMz32010QyUtWC_bdkxwuYz6xL_oIJ5b6oFFM"
}
```

<img src="http://jwt.io/img/badge-compatible.svg" />
