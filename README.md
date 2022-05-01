# Dicord Bot Project Starter
Every bot needs some common functionalities. You can simply fork this and work on it.

# Setup

##Prisma
This project uses Prisma.io ORM. You can find additional info at  it's [documentation](https://www.prisma.io/docs/).
To create migrations, you should run:
```shell
npx prisma migrate dev
```
Also you should set the provider as you wish:
```prisma
datasource db {
  provider = "sqlite" // postgresql, mysql, mongodb, sqlite
  url      = env("DATABASE_URL")
}
```
### CRUD
It is so simple with Prisma. Prisma is initiated as ``client.prisma``. Use it anywhere you can access the client.
```javascript
// CREATE
const guild = await client.prisma.guilds.create({
  data: {
    id: '654987321456',
    name: 'Example Server',
  },
})

// READ
const guild = await client.prisma.guilds.findUnique({
  where: {
    id: '654987321456',
  },
})

// UPDATE
const updateGuild = await client.prisma.guilds.update({
  where: {
    id: '654987321456',
  },
  data: {
    name: 'New Name',
  },
})

// DELETE
const deleteGuild = await client.prisma.user.delete({
  where: {
    id: '654987321456',
  },
})
```

## TODO
* Multi-language support
* ~~Multiple database support~~✅
    * ~~MYSQL~~ ✅
    * ~~PostgreSQL~~ ✅
    * ~~SQL-Lite~~ ✅
    * ~~MongoDB~~ ✅

Note: This project is still under development. Please feel free to PR.

