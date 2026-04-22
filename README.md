# React-Projekt-Setup

Willkommen! Dieses Dokument erklärt, wie Sie dieses React-Projekt lokal starten können.

## Voraussetzungen

Stellen Sie sicher, dass [Node.js](https://nodejs.org/en/download) (empfohlen: LTS-Version) auf Ihrem Rechner installiert ist.

## Projekt von GitLab herunterladen

a) Über die Git-CLI

1. Stellen Sie sicher, dass [GIT](https://git-scm.com/downloads) auf Ihrem Rechner installiert ist
2. Ggfs. GIT identity anpassen

```bash
git config --local user.name "Nachname, Vorname"
git config --local user.email "vorname.nachname@stud.hs-emden-leer.de"
```

3. Repo klonen

```bash
git clone https://gitlab.technik-emden.de/pfw/pfw-2024/pfw-2024-gruppe-a/web-client.git
```

b) Als ZIP-Datei
ZIP-Datei im [GitLab-Repository](https://gitlab.technik-emden.de/pfw/pfw-2024/pfw-2024-gruppe-a/web-client) herunterladen (Code --> Download source code --> zip) und an der gewünschten Stelle entpacken.

## Dependencies installieren

1. Projektverzeichnis lokal öffnen
2. Installieren Sie die notwendigen npm-Pakete mit folgendem Befehl:

```bash
npm install
```

## Entwicklungsserver starten

Starten Sie den lokalen Entwicklungsserver:

```bash
npm start
```

Der Entwicklungsserver sollte automatisch in deinem Standardbrowser geöffnet werden. Falls nicht, öffnen Sie in einem beliebigen Browser folgende URL auf:
[http://localhost:3000](http://localhost:3000)

## Mock-Rest-Api ansprechen

Beachten Sie, dass die lokal gestartete Anwendung nicht mit dem Hochschulserver kommunizieren kann. Möchsten Sie sie REST-Kommunikation mit unserer Entwicklung-Mock-Api testen, so können Sie in der Datei src\Network\ApiConfig.js die API_BASE_URL "https://pfw2024.proxy.beeceptor.com" (Zeile 4 statt Zeile 1) verwenden. Diese ist allerdings nur für 50 Anfragen pro Tag freigegeben.
