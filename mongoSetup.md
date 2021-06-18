## Mongo Server Setup

### Install

`brew tap mongodb/brew`

`brew install mongodb-community`

### Start

`mongod --config /opt/homebrew/etc/mongod.conf`

### (Start in background) optional

`brew services start mongodb/brew/mongodb-community`

## Mongo GUI

https://www.mongodb.com/try/download/compass

## Mongo shell

### Connect

`mongo localhost`

### Create root user

`db.addUser({user: "root", pwd: "password", roles: [ "userAdminAnyDatabase", "dbAdminAnyDatabase","readWriteAnyDatabase"]})`

## Connect witrh root user to Compass

`mongodb://root:password@localhost`
