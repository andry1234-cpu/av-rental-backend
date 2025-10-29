## Scopo rapido

Questo file dà a un agente AI (Copilot) istruzioni pratiche e contestuali per essere produttivo rapidamente nel progetto "AV Rental" (backend + frontend). Usa queste regole quando suggerisci modifiche, nuove API, o refactoring.

## Architettura - big picture

- Backend: progetto Node.js + Express (entry: `server.js`) + Mongoose per MongoDB. Dipendenze principali: `express`, `mongoose`, `cors`, `dotenv` (vedi `package.json`).
- Modelli: `models/Equipment.js` definisce lo schema (campi: `name`, `category`, `quantity`, `imageUrl`).
- Routes: c'è `routes/equipment.js` (esporta GET `/`), ma al momento il `server.js` definisce anche endpoint direttamente — evita duplicazioni: preferisci usare `routes/*` e collegarli con `app.use('/api/equipment', require('./routes/equipment'))`.
- Frontend: cartella separata `av-rental-frontend/` contiene `index.html`, `script.js`, `style.css`. Il frontend chiama l'endpoint `/api/equipment` (in produzione usa l'URL deployato; in sviluppo usa `http://localhost:3000`).

## Convenzioni e pattern nel codice

- Error handling: usa async/await con try/catch e risposte JSON coerenti (`res.status(500).json({ error: '...' })`). Mantieni i messaggi di errore in italiano quando modifichi codice di esempio.
- Schema e naming: usa i campi esistenti di `Equipment` (non rinominare `quantity` in `count` senza aggiornare tutte le parti).
- Middleware: `server.js` usa `app.use(cors())` e `app.use(express.json())` — qualsiasi nuova route REST deve aspettare JSON nel body.
- Routing: preferisci mettere nuove route in `routes/` e mantenere `server.js` per wiring/bootstrapping e middlewares.

## Comandi di sviluppo (dev) — come avviare

1. Copia `.env.example` → `.env` e imposta `MONGO_URI` (Mongo Atlas o locale).
2. Installa dipendenze e avvia il backend (PowerShell):

```powershell
cd c:\Users\andry\OneDrive\Documents\av-rental-backend
npm install
npm start
```

3. Per il frontend (sviluppo rapido) apri `av-rental-frontend/index.html` nel browser oppure usa un piccolo server statico.

## API note e esempi (presa dal codice)

- GET /api/equipment — restituisce array di oggetti Equipment (campi: `name`, `category`, `quantity`, `imageUrl`).
- POST /api/equipment — nel `server.js` è presente un esempio; se aggiungi endpoint POST metti la validazione minima e usa `res.status(201)` alla creazione.

Esempio di risposta (JSON):

```json
{
  "_id": "...",
  "name": "Microfono X",
  "category": "Audio",
  "quantity": 3,
  "imageUrl": "https://..."
}
```

## Linee guida specifiche per Copilot (comportamento desiderato)

- Quando proponi modifiche alle route, preferisci implementare nuovi endpoint in `routes/` e aggiornare `server.js` per montare i router.
- Non rimuovere o rinominare campi del modello senza aggiornare `models/`, `routes/` e il frontend (`script.js`).
- Evita di hardcodare URL di produzione nel frontend; usa `http://localhost:3000` per dev e conserva l'URL deployato solo come valore di configurazione.
- Mantieni i messaggi e i commenti in italiano dove il codice già usa l'italiano (per coerenza), ma scrivi PR / commit messages in italiano o inglese a seconda del contesto del team.

## File chiave da consultare

- `server.js` — bootstrapping, middleware, connessione Mongo
- `models/Equipment.js` — schema Mongoose
- `routes/equipment.js` — router per `/api/equipment` (controlla se viene effettivamente montato in `server.js`)
- `package.json` — script `start` e dipendenze
- `av-rental-frontend/` — frontend statico che chiama l'API

## Nota finale / punti aperti

- Ho visto che `routes/equipment.js` esiste ma `server.js` al momento definisce gli endpoint inline: valuta di unificare il pattern (consiglio: spostare tutta la logica in `routes/` e mantenere `server.js` come orchestration).
- Se vuoi, posso: (A) unificare subito le route spostando le definizioni in `routes/equipment.js` e montare il router, oppure (B) generare semplici test curl per le API.

Se manca qualcosa di specifico (es. credenziali per Mongo, o convenzioni di commit), dimmi e aggiorno questo file.
