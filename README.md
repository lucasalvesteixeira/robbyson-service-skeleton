

## Configure project

Configure the project by replacing the {{information}} tags with your service data

## Initial setup
```
npm install
```

## Swagger Docs Generation
```
npm run swagger
```

## Project run (config .vscode)

launch.json
```
{
    "version": "2.0.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/src/bin/www.debug.ts",
            "preLaunchTask": "buildTask",
            "cwd": "${workspaceFolder}/dist",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ],
            "envFile": "${workspaceFolder}/../../variables.env"
        }
    ]
}
```
tasks.json
```
{
    "version": "2.0.0",
    "tasks": [{
        "label": "buildTask",
        "command": "npm",
        "args": ["run", "build"]
    }, {
        "label": "testTask",
        "command": "npm",
        "args": ["run", "test"]
    }]
}
```
> On keybord, click in button F5

## Watch source
```
npm run tsc
```

## Test
```
npm run test
```

## Test with coverage reports
```
npm run test:coverage
```

## Generate Docs
```
npm run doc
```

The project documentation will be saved under ```./doc``` folder.


## Set secretOrKey
```
Set value secretOrKey in file gateway-entry-external.yaml
```

## Create DataBase

> In the database, create the following objects with their respective data, eg:

host: robbyson <br>
database: robbyson <br>
collection: application <br>
ps: remove _id before insertion <br>
```
db.getCollection('application').insert({
    "_id": ObjectId("5c2ce40ba7fe5f26e52c295b"),
    "name": "Robbyson Boilerplate",
    "handle": "robbysonBoilerplate",
    "__v": 0.0
});
```

host: robbyson <br>
database: robbyson <br>
collection: connection <br>
ps: remove _id before insertion <br>
```
db.getCollection(‘connection’).insert({
    "_id": ObjectId("5c1b9157e175c44febfbed1b"),
    "password": "{{password}}",
    "database": "robbysonBoilerplate",
    "server": "192.168.0.168",
    "contractor": {
        "_id": 1.0,
        "name": "AEC"
    },
    "application": {
        "_id": ObjectId("5c2ce40ba7fe5f26e52c295b"), // _id do objeto acima
        "handle": "robbysonBoilerplate",
        "name": "Robbyson Boilerplate"
    },
    "user": "robbyson",
    "databaseType": "MONGODB",
    "port": {{port}}
});
```

> In the shell of the host application run the following script with database data created:

host: application <br>
```
use robbysonBoilerplate
db.createUser({
    user: "robbyson",
    pwd: "{{pwd}}",
    roles: [
        { role: "readWrite", db: "robbysonBoilerplate" }
    ]
});
```

> In the host application create database and collection (right click):

database: *to create database (ex: robbysonBoilerplate) <br>
collection: *to create collection (ex: collectionTest) <br>

> Put the name of the database created on the existing connection in the api-server.ts constructor

```
contratante.getContratantes(() => {
    dataBase.connect(contratante, 'robbysonBoilerplate');
});
```

> Put the name of the collection created in the data model

```
collection: 'collectionTest'
```

## At the end of the implementation run the command

> This is a command that performs a security revision in the project dependency tree

```
sudo npm audit fix
```
