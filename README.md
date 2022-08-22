# Dictionary Api
Dictionary api base on [Free Dictionary API](https://dictionaryapi.dev/)

### Frameworks
- Typescript
- NodeJS
- Express
- Prisma
- Axios

### Setup
Run docker 
```
docker compose up
```

Create Tables
```
npx prisma migrate dev 
```
Import words form  [freeDictionaryAPI](https://github.com/meetDeveloper/freeDictionaryAPI/tree/master/meta/wordList).
```
npm run seed
```

>  This is a challenge by [Coodesh](https://coodesh.com/)