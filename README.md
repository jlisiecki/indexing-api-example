## Przykład wdrożenia indexing API

1. Trzeba utworzyć Projekt w Google Cloud:
   https://console.cloud.google.com/projectcreate

2. Włączyć w projekcie Indexing API:

https://console.cloud.google.com/apis/library/indexing.googleapis.com

3. Utworzyć konto usługi:
   https://console.cloud.google.com/apis/credentials

- Kliknąć "UTWÓRZ DANE LOGOWANIA"
- Kliknąć "KONTO USŁUGI" i utworzyć konto

4. Utworzyć klucz dla utworzonego konta usługi:
   https://console.cloud.google.com/iam-admin/serviceaccounts

- Po wybraniu projektu, przy utworzonym koncie usługi klikniąć w "Działania" > Zarządzaj kluczami > Dodaj klucz
- Wybieramy format json i zapisujem pod nazwą "service_account.json"

5. Dodać adres mailowy konta usługi do Google Search Console z uprawieniem właściciela

- czyli adres typu "indexing-example@indexing-api-example.iam.gserviceaccount.com" który został nadany w momencie tworzenia konta usługi
