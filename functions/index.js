const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();


exports.getPosts = functions.https.onRequest((req,res) => {
      return cors(req,res, () => {
            db.collection("explore_posts").onSnapshot(querySnapshot => {
                  var data = [];
                  querySnapshot.forEach(doc => {
                        data.push(
                              {id:doc.id, 
                              title:doc.data().title,
                              location:doc.data().location,
                              img:doc.data().img,
                              cost:doc.data().cost,
                              desc:doc.data().desc
                        })
                  });
                  console.log(data);
                  res.status(200).json(data);
            })
      })
});

exports.registerUser = functions.https.onRequest((req,res) => {
      return cors(req,res, () => {
            const data = req.body;
            db.collection("explore_posts").add(data)
            .then(
                  (ref) => res.send(`DATA SEND WITH ID = ${ref.id}`)).catch(err => res.send("ERROR"));
      })
});

exports.getPostById = functions.https.onRequest((req, res) => {
      return cors(req,res, () => {
            const id = req.query.id;
            db.collection("explore_posts").doc(id).onSnapshot(doc => res.status(200).json(doc.data()));
      })
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.verify_token = functions.https.onRequest((req, res) => {
      return cors(req, res, () => {
            const data = req.body;
            console.log(data.token);
            admin.auth().verifyIdToken(data.token)
            .then(decodedToken => {
                  let uid = decodedToken.uid;
                  let email = decodedToken.email;
                  console.log("CURRENT USER ", email);
            })
            .catch((error) => {
                  console.log(error);
            });
      })
})