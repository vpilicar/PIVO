# EDUNOVA - USTANOVA ZA OBRAZOVANJE ODRASLIH

## Program obrazovanja za stjecanje djelomične kvalifikacije
### Front-End developer / Front-End developerka
### obrazovna skupina FD1

---

# Dokumentacija završne provjere

# Pivo APP

**Vladimir Pilicar**

Osijek, svibanj 2026.

---

## Sadržaj

1. Opis aplikacije
2. Skup tehnologija
3. Korištene zavisnosti
4. Struktura datoteka i direktorija
5. Tijek izvođenja aplikacije
6. Arhitektura i dizajn obrasci
7. Ključne funkcionalnosti
8. Upute za pokretanje i razvoj
9. Prikaz aplikacije
10. Zaključak

---

## 1. Opis aplikacije

Pivo APP je web aplikacija namijenjena evidenciji i praćenju kućnog varenja piva. Aplikacija korisniku omogućuje precizno bilježenje svakog varenja piva s detaljnim podacima o upotrijebljenim sastojcima. Svako varenje opisano je atributima: datum varenja, količina hmelja u gramima, količina vode u litrama, vrsta kvasca (ALE ili LAGER), količina ječma u gramima te ocjena gotovog piva (dobro, srednje ili loše).

Intuitivan tablični prikaz (na desktop uređajima) ili prikaz karticama (na mobilnim uređajima i tabletima) pruža trenutačni uvid u sva unesena varenja. Putem unosne forme korisnik dodaje nova varenja uz obaveznu provjeru valjanosti unesenih podataka kako bi se osigurao integritet podataka. Aplikacija nudi mogućnost ažuriranja postojećih varenja u realnom vremenu — primjerice, naknadno dodavanje ocjene nakon degustacije gotovog piva. Sustav omogućuje i jednostavno uklanjanje zapisa koji više nisu relevantni.

Ovakav slijed funkcionalnosti korisniku pruža potpunu kontrolu nad evidencijom varenja piva, od početnog unosa sastojaka pa sve do konačne ocjene kvalitete.

---

## 2. Skup tehnologija

- **Visual Studio Code** v1.113.0 — program za uređivanje datoteka i koda
- **React** v19.2.0 — JavaScript biblioteka za izgradnju korisničkih sučelja
- **Vite** v7.3.1 — brzi build alat i development server
- **Node.js** v25.9.0 — okruženje za izvođenje JavaScripta

---

## 3. Korištene zavisnosti

| Paket | Verzija | Svrha |
|---|---|---|
| react | ^19.2.0 | Osnovna React biblioteka |
| react-dom | ^19.2.0 | React DOM renderer |
| react-router-dom | ^7.13.1 | Routing i navigacija u aplikaciji |
| bootstrap | ^5.3.8 | CSS framework za stiliziranje |
| react-bootstrap | ^2.10.10 | Bootstrap komponente za React |
| react-icons | ^5.6.0 | Biblioteka ikona |

---

## 4. Struktura datoteka i direktorija

```
├── public/                           # Javne datoteke
├── src/                              # Izvorni kod aplikacije
│   ├── components/                   # Dijeljene React komponente
│   │   ├── FormatDatuma.jsx          # Formatiranje datuma
│   │   └── Izbornik.jsx              # Navigacijska traka
│   ├── hooks/                        # Custom React hookovi
│   │   └── useBreakpoint.js          # Hook za provjeru veličine ekrana
│   ├── pages/                        # Stranice aplikacije
│   │   ├── varenja/
│   │   │   ├── VarivanjePregled.jsx  # Pregled svih varenja (R u CRUD)
│   │   │   ├── VarivanjeNovo.jsx     # Unos novog varenja (C u CRUD)
│   │   │   └── VarivanjePromjena.jsx # Promjena varenja (U u CRUD)
│   │   └── Home.jsx                  # Početna stranica
│   ├── services/                     # Servisni sloj
│   │   └── varenja/
│   │       ├── VarivanjePodaci.js            # Demo podaci za memoriju
│   │       ├── VarivanjeServiceMemorija.js   # Implementacija za memoriju
│   │       ├── VarivanjeServiceLocalStorage.js # Implementacija za localStorage
│   │       └── VarivanjeService.js           # Facade — odabir implementacije
│   ├── App.css                       # Globalni stilovi
│   ├── App.jsx                       # Glavna komponenta s rutama
│   ├── constants.js                  # Konstante (rute, ime app, DATA_SOURCE)
│   └── main.jsx                      # Ulazna točka aplikacije
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 5. Tijek izvođenja aplikacije

### Inicijalizacija (index.html)
Preglednik učitava `index.html`. Unutar njega nalazi se `<div id="root"></div>` i `<script type="module" src="/src/main.jsx"></script>`.

### Ulazna točka (src/main.jsx)
Izvršava se `main.jsx`. Kreira se React korijen (`createRoot`) iz `react-dom/client`. Aplikacija je omotana u:
- `<StrictMode>` — za hvatanje potencijalnih problema tijekom razvoja
- `<BrowserRouter>` — za omogućavanje client-side rutiranja

### Glavna komponenta (src/App.jsx)
`App.jsx` uvozi globalne stilove (Bootstrap CSS i App.css), a zatim:
1. Generira omotač (`Container`) s navigacijom (`<Izbornik />`) koja je stalno prisutna
2. Koristi `<Routes>` i `<Route>` za definiranje ruta prema konstantama iz `constants.js`
3. Stranice se mijenjaju bez osvježavanja cijele stranice (SPA ponašanje)

### Navigacija (src/components/Izbornik.jsx)
Komponenta `Izbornik` koristi `react-bootstrap` komponente (`Navbar`, `Nav`) za responzivnu navigacijsku traku. Koristi `useNavigate` hook za programsku navigaciju.

### Stranice i komponente
Svaka stranica (npr. `VarivanjePregled.jsx`) upravlja vlastitim stanjem koristeći `useState` i `useEffect` te poziva odgovarajuće servise iz `src/services/`.

### Servisi
Stranice ne komuniciraju direktno s `localStorage`-om, već koriste metode iz `VarivanjeService`.

---

## 6. Arhitektura i dizajn obrasci

### Service Layer Pattern (Sloj servisa)
Aplikacija koristi Service Layer Pattern za odvajanje poslovne logike od prezentacijskog sloja.

### Facade Pattern
`VarivanjeService.js` djeluje kao fasada koja skriva implementacijske detalje. Na temelju konstante `DATA_SOURCE` iz `constants.js`, servis automatski odabire odgovarajuću implementaciju:

```js
// constants.js
export const DATA_SOURCE = 'localStorage'; // ili 'memorija'

// VarivanjeService.js
switch (DATA_SOURCE) {
    case 'memorija':
        Servis = VarivanjeServiceMemorija;
        break;
    case 'localStorage':
        Servis = VarivanjeServiceLocalStorage;
        break;
    default:
        Servis = null;
}
```

### Strategy Pattern
Obje implementacije dijele isti interface:

**Standardne metode:**
- `get()` — dohvaća sva varenja
- `getById(id)` — dohvaća jedno varenje po ID-u
- `dodaj(varenje)` — dodaje novo varenje
- `promjeni(id, varenje)` — mijenja postojeće varenje
- `obrisi(id)` — briše varenje

### Async/Await
Sve metode servisa su asinkrone, što omogućava buduću integraciju s REST API-jem bez promjene koda u komponentama:

```js
async function ucitajVarenja() {
    await VarivanjeService.get().then((odgovor) => {
        if (!odgovor.success) {
            alert('Nije implementiran servis')
            return
        }
        setVarenja(odgovor.data)
    })
}
```

### Component-Based Arhitektura
- **Pages** (`src/pages/`): komponente koje predstavljaju cijele stranice
- **Components** (`src/components/`): dijeljene, ponovno upotrebljive komponente
- **Hooks** (`src/hooks/`): custom React hookovi za dijeljenu logiku

### Routing struktura
Rute su definirane u `src/constants.js`:

```js
export const RouteNames = {
    HOME:               '/',
    VARENJA:            '/varenja',
    VARENJA_NOVO:       '/varenja/novo',
    VARENJA_PROMJENA:   '/varenja/:id',
}
```

### Dizajn prilagođen različitim širinama zaslona
Aplikacija koristi custom hook `useBreakpoint` za detekciju veličine ekrana:

```js
const sirina = useBreakpoint(); // vraća: 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'

{['xs', 'sm', 'md'].includes(sirina) ? (
    <VarivanjeGrid />     // Prikaz karticama za manje ekrane
) : (
    <VarivanjeTablica />  // Tablica za veće ekrane
)}
```

---

## 7. Ključne funkcionalnosti

### CRUD operacije
Entitet Varenje podržava sve CRUD operacije:
- **Create**: dodavanje novog varenja kroz formu (`/varenja/novo`)
- **Read**: pregled svih varenja — tablica (desktop) ili kartice (mobitel)
- **Update**: promjena postojećeg varenja, uključujući naknadno dodavanje ocjene
- **Delete**: brisanje varenja s potvrdom

---

## 8. Upute za pokretanje i razvoj

### Preduvjeti
- Node.js (verzija 18 ili novija)
- npm (dolazi s Node.js)

### Instalacija
```bash
cd PIVO
npm install
```

### Pokretanje development servera
```bash
npm run dev
```
Aplikacija je dostupna na `http://localhost:5173`.

### Build za produkciju
```bash
npm run build
```
Optimizirani build kreira se u `dist/` direktoriju.

### Konfiguracija izvora podataka
U `src/constants.js` promijenite vrijednost `DATA_SOURCE`:

```js
export const DATA_SOURCE = 'localStorage'; // ili 'memorija'
```

- `'memorija'` — podaci se čuvaju u RAM-u (gube se nakon osvježavanja)
- `'localStorage'` — podaci se trajno čuvaju u browser localStorage-u

---

## 9. Prikaz aplikacije

### Početna stranica

Početna stranica prikazuje naziv aplikacije s ikonom 🍺, kratki opis namjene i dvije tipke za navigaciju: „Novo varenje" (žuta) za unos novog varenja te „Pregled varenja" (bijela) za prikaz svih unesenih varenja.

---

### Pregled varenja (R u CRUD)

Stranica `/varenja` prikazuje sva unesena varenja piva. Na desktop uređajima podaci su prikazani u tablici sa stupcima: Datum, Hmelj (g), Voda (L), Ječam (g), Kvasac i Ocjena. Na mobilnim uređajima i tabletima koristi se prikaz karticama. Na vrhu stranice nalazi se žuta tipka za dodavanje novog varenja. Svaki redak tablice sadrži tipku za uređivanje (žuta) i brisanje (crvena). Vrsta kvasca označena je plavom oznakom za ALE i sivom za LAGER. Ocjena je prikazana zelenom oznakom za „Dobro", žutom za „Srednje" i crvenom za „Loše".

---

### Unos novog varenja (C u CRUD)

Stranica `/varenja/novo` sadrži formu za unos novog varenja. Forma se sastoji od sljedećih polja: datum varenja (s predpopunjenim današnjim datumom), hmelj u gramima, voda u litrama, ječam u gramima, vrsta kvasca (padajući izbornik: ALE ili LAGER) te opcionalna ocjena (padajući izbornik: Dobro, Srednje, Loše). Sva polja osim ocjene su obavezna. Na dnu forme nalaze se crvena tipka „Odustani" (lijevo) i žuta tipka „Spremi varenje" (desno).

---

### Promjena varenja (U u CRUD)

Stranica `/varenja/:id` prikazuje formu identičnu formi za unos, ali s prethodno popunjenim podacima odabranog varenja. Administrator može izmijeniti bilo koji podatak, uključujući naknadno dodavanje ili promjenu ocjene. Na dnu su crvena tipka „Odustani" i žuta tipka „Spremi promjene".

---

### Brisanje varenja (D u CRUD)

Brisanje se pokreće klikom na crvenu tipku u retku tablice ili na kartici. Aplikacija prikazuje dijaloški okvir s upitom „Sigurno obrisati ovo varenje?" kako bi se spriječilo slučajno brisanje. Klikom na „U redu" zapis se trajno uklanja, a klikom na „Odustani" vraća se pregled bez promjena.

---

## 10. Zaključak

Pivo APP uspješno implementira sve četiri CRUD operacije za entitet Varenje. Aplikacija je dizajnirana s naglaskom na jednostavnost korištenja, koristeći Bootstrap koji osigurava prilagodljivost različitim širinama zaslona (RWD). Implementiran je Service Layer Pattern s Facade uzorkom koji omogućuje lako prebacivanje između pohrane u memoriji i localStorage-u putem jedne konstante `DATA_SOURCE`.

Aplikacija trenutno koristi localStorage za pohranu podataka, što je primjereno za demonstraciju i osobnu upotrebu. Za višekorisničko okruženje razvoj bi se trebao kretati prema integraciji s backend API-jem te dodavanju autentikacije korisnika.
