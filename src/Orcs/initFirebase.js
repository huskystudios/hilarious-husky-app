import { getDatabase } from "firebase/database";
import {app} from "../initFirebase"


 // const app = initializeApp(firebaseConfig);
  const db = getDatabase(app,"https://ether-orcs-default-rtdb.europe-west1.firebasedatabase.app/");
console.log(db)
 // 

 // const analytics = getAnalytics(app);

export { db }
