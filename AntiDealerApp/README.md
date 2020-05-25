# Приложение "АнтиДилер"
Приложение "АнтиДилер" предназначено для отправки заявок об обнаружении нелегальной точки распространения или пропаганды наркотических средств, вследствие чего эти объекты будут ликвидированы компетентными органами. 
### Требования к запуску
Для сборки и запуска приложения требуется установить:
1. [Node.js](https://nodejs.org/)
2. [Expo Framework](https://docs.expo.io/get-started/installation/#installing-expo-cli)

### Настройка
Перед запуском приложения требуется задать API-ключ для функционирования Google Maps.

[Инструкция для получения ключа](https://developers.google.com/maps/documentation/android-sdk/get-api-key)

После получения, ключ требуется записать в файл [app.json](https://github.com/rovany706/AntiDealerApp/blob/master/AntiDealerApp/app.json#L31)

Для корректной работы с сервером требуется указать корневой endpoint в файле [api/index.ts](https://github.com/rovany706/AntiDealerApp/blob/master/AntiDealerApp/api/index.ts#L21)

### Запуск
Для запуска, в терминале требуется перейти в корень проекта и запустить команду:
```
npm start
```
[Подробнее о запуске](https://docs.expo.io/get-started/create-a-new-app/#starting-the-development-server)
