# CSV Import per Equipment

## Descrizione

Questo script permette di importare equipments nel database MongoDB da un file CSV.

## Come usare

### 1. Modifica il file CSV

Edita il file `equipment_template.csv` con i tuoi dati. Formato:

```
name,category,quantity,imageUrl
Nome Prodotto,Audio,5,https://link-immagine.jpg
Altro Prodotto,Video,2,https://link-immagine.jpg
```

**Campi obbligatori:**
- `name`: Nome dell'articolo
- `category`: Categoria (Audio, Video, Luci, Strutture, Cablaggi)
- `quantity`: Numero di unità (intero)
- `imageUrl`: URL dell'immagine

### 2. Esegui lo script

```bash
node scripts/importFromCSV.js
```

### Note importanti

- **ATTENZIONE**: Lo script ha una riga commentata che pulisce il database (`deleteMany`). Se vuoi evitare di sovrascrivere i dati esistenti, lasciala commentata.
- Lo script usa `insertMany()`, quindi aggiunge nuovi equipment senza cancellare i precedenti.
- Se hai duplicati, modifica lo script per usare `updateMany()` o altre opzioni.

### Esempio di comando completo

```bash
cd c:\Users\andry\OneDrive\Documents\av-rental-backend
node scripts/importFromCSV.js
```

### Output atteso

```
Connessione a MongoDB: mongodb+srv://user:pass@cluster.mongodb.net/av-rental
Connesso a MongoDB
Equipment da importare: 10
✓ Microfono Shure SM7B (Audio) - Qty: 2
✓ Cuffie Monitor Sony MDR7506 (Audio) - Qty: 5
...
Equipment importati: 10
Connessione chiusa
```

## Troubleshooting

### Errore: "MONGO_URI non definita"
Assicurati che il file `.env` sia nella root del progetto e contenga `MONGO_URI`.

### Errore: "File CSV non trovato"
Verifica che `equipment_template.csv` sia nella cartella `scripts/`.

### Errore di parsing CSV
Controlla che il CSV abbia la corretta struttura con virgole correttamente posizionate. Usa sempre le virgole come separatore.

## Formato delle categorie supportate

- Audio
- Video
- Luci
- Strutture
- Cablaggi

Usa esattamente questi nomi (case-sensitive).
