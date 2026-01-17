# Sistem za prikaz radiofrekvenc

Sistem za prikaz radijskih postaj, njihovih frekvenc, pokritosti in povezav.

## Zemljevid
Spletna stran, ki prikazuje zemljevid Slovenije, na katerem so postavljene radijske postaje. <br>
S klikom na postajo v obliki stolpa, ne nam odpre stranski zavihek s podatki:
- Ime postaje
- ID postaje
- Imetnik         
- Polarizacija
- Širina radiofrekvenčnega kanala BW/KHz
- Azimut snopa
- Elevacijski kot
- Centralna frekvenca

Imamo možnost prikaza pokristosti posameznega stolpa in fiksnih povezav med stolpi.

S klikom na gumb z ikono lupine v levem zgornjem kotu iščemo kraj, v katerem se nahajajo radijske postaje.

S klikom na gumb lokacije lahko dodamo novo radijsko postajo, ki jo postavimo na zemljevid.

## Filtriranje

Podatke lahko filtriramo na širino radiofrekvenčnega kanala, izbiramo pa lahko tudi med imetniki radijskih postaj.

## Podatkovna baza
Podatki se shranjujejo na podatkovno bazo ElasticSearch, s katere se tudi berejo. Za lažjo vizualizacijo uporablja vmesnik Kibana.

## Uporabljene tehnologije
- JavaScript
- HTML
- CSS
- React
- Leaflet
- Nominatim

## Zahteve

- React
- ElasticSearch
- Kibana

## Avtorja
[Matic Bernot](https://github.com/mattbernot)
[Klemen Javeršek](https://github.com/klemen39)
