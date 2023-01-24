# movies-explorer-api
Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

https://api.deep-frontend.nomoredomains.rocks
## endpoints
- GET /users/me - возвращает информацию о пользователе.
- PATCH /users/me - обновляет информацию о пользователе.
- GET /movies - возвращает все сохранённые текущим  пользователем фильмы
- POST /movies - создаёт фильм с переданными в теле
- DELETE /movies/_id - удаляет сохранённый фильм по id
- POST /signup - создаёт пользователя
- POST /signin - проверяет переданные в теле почту и пароль # и возвращает JWT
## technologies
bcrypt, celebrate, dotenv, express, express-rate-limit, express-winston, helmet, jsonwebtoken, mongoose, winston
