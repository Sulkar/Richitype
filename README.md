# Richitype

**Richitype** ist eine Weiterentwicklung von [**Typing Test** von salmannotkhan](https://github.com/salmannotkhan/typing-test)!

## Commands
```zsh
npm install
npm start     # to start local server at `localhost:3000`
npm run build # to create production build run
```
## Database structure
Seit 27.06.2022 wird eine Datenbank anstatt der JSON Dateien für die Texte genutzt. Die Tabelle, welche die Texte speichert, kann so erzeugt werden:

```sql
CREATE TABLE texte (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titel varchar(100),
    text TEXT,
    code varchar(10)
);
```

Des Weiteren muss die Datei `config.php` entsprechend der Datenbank angepasst werden.