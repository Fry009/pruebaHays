## GUÍA DE INSTALACIÓN Y USO - PRUEBA TÉCNICA ANGULAR

REQUISITOS:

- Node.js v18 o superior
- npm v9 o superior
- Angular CLI instalado globalmente:
  npm install -g @angular/cli
- Git (opcional)

---

1. CLONAR EL PROYECTO

git clone https://github.com/Fry009/pruebaHays.git

---

2. INSTALAR DEPENDENCIAS

npm install

---

4. LEVANTAR JSON-SERVER

npx json-server --watch db.json --port 3000

Acceder a la API en:

http://localhost:3000/reports

---

5. LEVANTAR LA APLICACIÓN ANGULAR

ng serve

Abrir el navegador en:

http://localhost:4200/

---

6. FUNCIONALIDADES INCLUIDAS

- Listado de reportes con orden y paginación
- Filtros por nombre y estado
- Edición de reportes desde diálogo
- Eliminación con confirmación
- Persistencia con json-server
