# Fox Voting Game

En enkel og morsom nettside der du kan sammenligne to bilder av revebestillinger og velge hvilken som er søtere!

## Hva er dette?

Fox Voting Game er en interaktiv nettside som viser deg to tilfeldige foxbilder side ved side. Du velger hvilken fox du synes er søtere, og stemmene dine lagres i en database. Hver gang du stemmer, kan du laste inn en ny runde med to nye foxbilder.

## Forutsetninger

For å kjøre dette prosjektet trenger du:
- **Node.js** (versjon 14 eller høyere)
- **MongoDB** (kjørende lokalt eller remote forbindelse)
- **npm** (følger med Node.js)

## Installasjon

### 1. Clone prosjektet
```bash
git clone https://github.com/jazzm11/hjemmeForberedelse---Jazz.git
cd forberedelse-fox
```

### 2. Installer dependencies
```bash
npm install
```

Dette installerer:
- `express` - Web framework
- `mongoose` - MongoDB driver
- `ejs` - Template engine
- `dotenv` - Environment variabler
- `nodemon` - Auto-restart under utvikling

### 3. Opprett `.env` fil
Lag en fil kalt `.env` i rotmappen med følgende innhold:

```env
PORT=3000
FOX_IMG_API_URL=https://randomfox.ca/floof/
MONGODB_URL=mongodb://localhost:27017/foxdb
```

**Forklaring:**
- `PORT` - Hvilken port nettsiden kjører på
- `FOX_IMG_API_URL` - API for å hente tilfeldige foxbilder
- `MONGODB_URL` - Tilkobling til MongoDB (endre hvis du bruker remote database)

### 4. Påse at MongoDB kjører
Hvis du bruker lokal MongoDB, start den:

**Windows:**
```powershell
mongod
```

**Mac/Linux:**
```bash
mongod
```

Eller hvis du bruker en remote MongoDB-database, oppdater `MONGODB_URL` i `.env` filen.

## Bruk

### Start nettsiden
```bash
npm start
```

Nettsiden vil starte på: **http://localhost:3000**

### Hvordan spille

1. **Se billedene** - To foxbilder vises side ved side
2. **Velg søteste** - Klikk på "Denne er søtere!" knappen under foxen du synes er søteste
3. **Se resultatet** - Du får beskjed om at stemmen er registrert
4. **Last nye bilder** - Klikk "Ny Runde" for å få to nye foxbilder
5. **Gjenta** - Fortsett votingen så lenge du vil!

## Struktur

```
forberedelse-fox/
├── config/
│   └── db.js              # MongoDB tilkobling
├── controllers/
│   └── foxController.js   # Business logic
├── models/
│   └── Fox.js             # Database modell
├── public/
│   ├── css/
│   │   └── main.css       # Styling
│   └── js/
│       └── foxScript.js   # Frontend logikk
├── views/
│   ├── index.ejs          # Høvedside
│   └── partials/
│       ├── header.ejs     # Header
│       └── footer.ejs     # Footer
├── server.js              # Express server
├── package.json           # Dependencies
└── README.md              # Du er her!
```

## Funksjonalitet

- ✅ Henter tilfeldige foxbilder fra API
- ✅ Lagrer stemmer i MongoDB
- ✅ Viser antall stemmer for hvert bilde
- ✅ Smooth loading med animasjoner
- ✅ Responsivt design (mobil-vennlig)
- ✅ Enkel og ren brukergrensesnitt

## Teknologi

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** HTML, CSS, JavaScript
- **Template Engine:** EJS

## Troubleshooting

### Feil: "Cannot connect to MongoDB"
- Sjekk at MongoDB kjører
- Verifiser `MONGODB_URL` i `.env` filen
- Hvis du bruker remote database, sjekk internettforbindelsen

### Feil: "Cannot find module 'express'"
```bash
npm install
```

### Foxbildene laster ikke
- Sjekk internettforbindelsen
- Verifiser at `FOX_IMG_API_URL` er korrekt i `.env`
- Prøv å åpne linken direkte i nettleseren

### Port 3000 er allerede i bruk
Endre `PORT` i `.env` filen til et annet nummer, for eksempel `3001`

## Tips

- Du kan se databasen med `mongosh` og kjøre:
  ```javascript
  use foxdb
  db.Fox.find()
  ```
- For å slette alle stemmer, kjør i `mongosh`:
  ```javascript
  use foxdb
  db.Fox.deleteMany({})
  ```

## Har du spørsmål?

Hvis noe ikke fungerer, sjekk:
1. At alle dependencies er installert (`npm install`)
2. At MongoDB kjører
3. At `.env` filen er riktig oppsatt
4. Konsollen for feilmeldinger (Ctrl+Shift+C i Node)

Lykke til med votingen! 🦊
