// Configuração do Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para agendar horário
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    const appointment = `${date} ${time}`;
    const appointmentRef = db.collection('appointments').doc(appointment);
    
    appointmentRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            alert('Horário já agendado. Por favor, escolha outro horário.');
        } else {
            appointmentRef.set({
                name: name,
                date: date,
                time: time
            }).then(() => {
                alert('Agendamento realizado com sucesso!');
            }).catch((error) => {
                console.error('Erro ao agendar horário: ', error);
            });
        }
    });
});
