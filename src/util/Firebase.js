import firebase from "firebase";
require("firebase/firestore");
export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyAve5sUGE3WMRF_015BnCEaQ_BwPlnsJKg",
            authDomain: "whatsapp-f96fb.firebaseapp.com",
            projectId: "whatsapp-f96fb",
            storageBucket: "gs://whatsapp-f96fb.appspot.com",
            messagingSenderId: "91560487571",
            appId: "1:91560487571:web:f8f0633d74b9e04ddbbb66",
            measurementId: "G-SK7WWNQL7K"
        };


        this.init();
    }

    init() {
        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config)
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            window._initializedFirebase = true;
        };
    };

    static db() {
        return firebase.firestore();
    }
    static hd() {
        return firebase.storage();
    }


    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    let token = result.credential.accessToken;
                    let user = result.user;
                    s({
                        user, token

                    });
                })
                .catch(err => {
                    f(err);
                });
        });
    }
}

