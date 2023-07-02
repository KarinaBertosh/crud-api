# Instruction

## How to download

git clone https://github.com/KarinaBertosh/crud-api.git

## Go to crud-api branch

git checkout crud-api

## Install

npm i

## Install the extension in VSCode

### Thunder Client

VS Marketplace [Link](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

## Script

Run application in development mode

#### npm run start:dev

Run application in production mode

#### npm run start:prod

Run test

#### npm test

## Go to the extension "Thunder Client" and click "New Request"

Enter the address and select the method => press the button "Send"

# Addresses:

#### Get all the users: GET http://localhost:5000/api/users

#### Get user by id(uuid): GET http://localhost:5000/api/users/`${id}`

#### Add new user: POST http://localhost:5000/api/users/`${id}` + Open the "body" in the extension and enter a new object in the "JSON" item

#### Update user: PUT http://localhost:5000/api/users/`${id}` + Open the "body" in the extension and enter a update object in the "JSON" item

#### Delete user: http://localhost:5000/api/users/`${id}`

###### User mandatory fields:

username: string,
age: number,
hobbies: array of strings or an empty array
