# CouchDB-ReactJS-Patient-Dashboard
Create FHIR based Patient Dashboard (Test app for Couchdb and ReactJS)

# Installation

- Install NodeJS 4.1.x version
- Clone the project using Git
- Go to the source folder and install npm packages with `npm Install`
- Install `bower` globally by `npm install -g bower`
- Install bower components using `bower install`
- Configure `config.json` as required
- Start the server using `npm start`

# API

- Create a Patient

 Sent `POST` to `localhost:8000/patients` with JSON data

 ```javascript
 {
    "resourceType": "Person",
    "name": [
        {
            "use": "old",
            "family": [
                "Karunarathne"
            ],
            "given": [
                "Milan"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1974-11-02T00:00:00"
}
```

- Get a Patient

Sent `GET` to `localhost:8000/patients/[id]`
