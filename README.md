Ripple
==========

Ripple is so simply Push Application. It use mongodb and mongoose.

## How to Use

Please set your enviroment/dev|prod.json.

``` 

git clone https://github.com/ripple-app/ripple-app.git

npm install

npm start
```

## Generate Token
```
POST host:post/instance application/json {id: 'token value', name: 'token alias', config: {}} // generate token

GET host:post/instance // confirm tokens
```

## Example
```
node example/agent <-- data source

node example/client <-- client
```

## Docker
If you use docker, please follow below.

```
docker-compose up
```

## Trouble Shooting
- Please make a table for the first time.

## Getting help
Having problems? Create an issue.

## License
Copyright © 2019 myuoungsubsim