import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";
import fs from "fs";

const configRaw = fs.readFileSync("./firebase-applet-config.json", "utf-8");
const config = JSON.parse(configRaw);

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  console.log("Duke provuar të tërheqim 1 projekt nga Firebase...");
  try {
    const q = query(collection(db, "projects"), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log("Koleksioni i projekteve është i zbrazët (BOSH). Keni të drejtë! Databaza nuk ka asnjë projekt aktualisht.");
    } else {
      console.log("Sukses! Projektet ekzistojnë në databazë. Këtu janë të dhënat e projektit të parë:");
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      });
    }
  } catch (error) {
    console.error("Gabim gjatë zhvillimit të kërkesës:", error.message);
  }
}

test();
