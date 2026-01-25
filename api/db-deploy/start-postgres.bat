@echo off

REM Переходим в директорию, где лежит этот скрипт
cd /d %~dp0

REM Запускаем docker compose с env файлом уровнем выше
docker compose --env-file ..\.env up

pause
