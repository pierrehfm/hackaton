// const cron = require('node-cron');
// const nodemailer = require('nodemailer');
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3001;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '',
//     pass: '',
//   },
// });


// const sendEmail = (subject, text) => {
//   const mailOptions = {
//     from: '',
//     to: '',
//     subject: subject,
//     text: text,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Erreur d\'envoi d\'email:', error);
//     } else {
//       console.log('Email envoyé:', info.response);
//     }
//   });
// };

// const getLatestPollutionData = async () => {
//     try {
//       const result = await pool.query(
//         'SELECT etat FROM episodes_pollution WHERE zone = "Bassin Lyon Nord-Isère" ORDER BY date DESC LIMIT 1;'
//       );
//       return result.rows[0]; 
//     } catch (error) {
//       console.error('Erreur lors de la récupération des données :', error);
//       throw error;
//     }
//   };

// const checkCondition = () => {
//   const val = getLatestPollutionData()
//     .then((data) => {
//         console.log('Données de pollution les plus récentes pour la zone :', data);
//     })
//     .catch((err) => {
//         console.error('Erreur:', err);
//     });

//   if (val === "ALERTE SUR PERSISTANCE") {
//     sendEmail('Alerte', 'ALERTE SUR PERSISTANCE.');
//   }
// };

// cron.schedule('0 * * * *', () => {
//   console.log('Vérification de la condition...');
//   checkCondition();
// });

