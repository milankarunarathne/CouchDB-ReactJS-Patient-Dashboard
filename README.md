# CouchDB-ReactJS-Patient-Dashboard
Create FHIR based Patient Dashboard (Test app for Couchdb and ReactJS)

# API

- Create a Patient

 Sent `POST` to `localhost:8000/patients`
 with JSON data
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
