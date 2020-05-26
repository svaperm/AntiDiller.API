# API для сервиса "АнтиДилер"

### Требования к запуску

Для сборки и запуска приложения требуется установить:
1. [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
2. [EF Core CLI Tools](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet#ef-core-3x)
```
dotnet tool install --global dotnet-ef
```
3. PostgreSQL [(рекомендуется использовать docker контейнер с настроенным PostgreSQL)](https://hub.docker.com/_/postgres)

### Настройка

1. В файле [Properties/launchSettings.json](https://github.com/rovany706/AntiDealerApp/blob/master/AntiDealerApi/AntiDealerApi/Properties/launchSettings.json#L24)
требуется задать адрес, на который будут поступать запросы из приложения.
2. В файле [appsettings.json](https://github.com/rovany706/AntiDealerApp/blob/master/AntiDealerApi/AntiDealerApi/appsettings.json#L14)
требуется задать адрес и порт, на котором находится PostgreSQL, а также логин и пароль.
3. Для создания БД и необходимых таблиц, в терминале требуется перейти в [папку с проектом](https://github.com/rovany706/AntiDealerApp/tree/master/AntiDealerApi/AntiDealerApi) и запустить команду:
```
dotnet-ef database update
```

### Запуск
Для запуска, в терминале требуется перейти в [папку с проектом](https://github.com/rovany706/AntiDealerApp/tree/master/AntiDealerApi/AntiDealerApi) и запустить команду:
```
dotnet run -c Release
```
