module.exports = ({ Nom, Prenom, Email, Telephone, 
    ReferanceProduit, TypePanne, Wilaya, 
    CentreDepot, DateDepot }) => {
     const today = new Date();
 return `
       <!doctype html>
       <html>
       <head>
          <meta http-equiv="cache-control" content="no-cache">
          <meta http-equiv="Pragma" content="no-cache">
          <meta http-equiv="Expires" content="-1">
          <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
          <style type="text/css">
             @font-face {
                   font-family: Poppins;
             }
             *{
                   margin: 0;
                   padding: 0;
                   box-sizing: border-box;
                   font-family: "Poppins", sans-serif;
                   outline: none;
                   border: none;
                   text-decoration: none;
                   color: #060e30;
                   letter-spacing: 0.5%;
             }
             .container {
                   width: 793.8px;
                   height: 1125.66px;
                   display: flex;
                   flex-direction: column;
                   align-items: center; 
                   align-content: center;
                   align-self: center;
             }
             .title{
                   font-size: 20px;
                   color: black;
                   padding-top: 50px;
             }
             .Line1{
                   width: 100%;
                   display: flex;
                   flex-direction: row;
                   justify-content: space-between;
                   padding-left: 40px;
                   padding-right: 40px;
                   padding-top: 20px;
                   padding-bottom: 20px;
                   font-size: 10px;
                   color: black;
             }
             .line2{
                   width: 100%;
                   display: flex;
                   flex-direction: column;
                   align-items: center; 
                   padding-left: 40px;
                   padding-right: 40px;
                   padding-top: 20px;
                   padding-bottom: 20px;
                   font-size: 10px;
                   color: black;
             }
             .subline2{
                   display: flex;
                   flex-direction: column;
                   align-items: center; 
             }
             .informations {
                   width: 100%;
                   display: flex;
                   flex-direction: row;
                   justify-content: space-between;
                   margin-bottom: 10px;
             }
             .subinformations{
                   display: flex;
                   flex-direction: row;
                   justify-content: space-between;
                   margin-bottom: 10px;
             }
             .line3{
                   width: 100%;
                   display: flex;
                   flex-direction: row;
                   align-items: center; 
                   justify-content: space-between;
                   padding-left: 40px;
                   padding-right: 40px;
                   font-size: 10px;
                   color: black;
                   margin-bottom: 10px;
             }
             .line3-line1-title{
                   font-size: 12px;
                   margin-inline-end: 10px;
             }
             .line3-line1-subtitle{
                   display: flex;
                   flex-direction: row;
                   align-items: center; 
             }
             .line3-line1-subtitle table{
                   border-collapse: collapse;
                   color: black;
                   margin-inline-start: 10px;
             }
             .line3-line1-subtitle th{
                   border: 1px solid black; 
                   padding: 8px;
             }
             .line4{
                   display: flex;
                   flex-direction: row;
                   align-items: center; 
                   padding-left: 40px;
                   padding-right: 40px;
             }
             .line4-line1{
                   display: flex;
                   flex-direction: column;
                   align-items: center; 
                   padding-left: 40px;
                   padding-right: 40px;
             }
             .line4-line2{
                   width: 100%;
                   display: flex;
                   flex-direction: row;
                   align-items: center; 
                   font-size: 10px;
                   color: black;
                   margin-bottom: 10px;
             }
             .line4-line2 table{
                   border-collapse: collapse;
                   color: black;
                   margin-inline-start: 10px;
             }
             .line4-line2 th{
                   border: 1px solid black; 
                   padding: 8px;
             }
             .line5{
                   display: flex;
                   flex-direction: column;
                   align-items: flex-end;
                   align-self: flex-end;
                   text-align: end;
                   padding-inline-end: 40px;
                   padding-inline-start: 40px;
                   padding-bottom: 20px;
                   font-size: 12px;
             }
             .line5 h4{
                   font-size: 15px;
             }
             .line6{
                   display: flex;
                   flex-direction: column;
                   align-items: flex-start;
                   align-self: flex-start;
                   text-align: start;
                   padding-inline-end: 30px;
                   padding-inline-start: 40px;
                   padding-bottom: 20px;
                   font-size: 12px;
             }
             .line6 h4{
                   font-size: 15px;
             }
             .line6 p{
                   padding-inline-start: 20px;
             }
             .line7{
                   width: 100%;
                   display: flex;
                   flex-direction: column;
                   align-items: flex-start;
                   align-self: flex-start;
                   text-align: start;
                   padding-inline-end: 30px;
                   padding-inline-start: 40px;
                   padding-bottom: 20px;
                   font-size: 12px;
             }
             .line7 h4{
                   font-size: 15px;
                   align-items: flex-end;
                   align-self: flex-end;
                   text-align: end;
             }
             .line7 p{
                   padding-inline-start: 20px;
             }
             .line8{
                   width: 100%;
                   display: flex;
                   flex-direction: column;
                   align-items: flex-start;
                   align-self: flex-start;
                   text-align: start;
                   padding-inline-end: 30px;
                   padding-inline-start: 40px;
                   padding-bottom: 20px;
                   font-size: 15px;
                   font-weight: 500;
             }
             .line9{
                   display: flex;
                   flex-direction: column;
                   align-items: flex-start;
                   align-self: flex-start;
                   text-align: start;
                   padding-inline-start: 40px;
             }
             .line9 table{
                   border-collapse: collapse;
                   color: black;
             }
             .line9 th:nth-child(2){
                   width: 200px;
             }
             .line9 th{
                   border: 1px solid black; 
                   padding: 10px;
                   font-size: 15px;
             }
             .QRcode{
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   align-self: center;
                   align-content: center;
                   padding-top: 20px;
                   padding-bottom: 10px;
             }
             .line10{
                   width: 100%;
                   display: flex;
                   flex-direction: row;
                   justify-content: space-between;
                   padding-inline-start: 50px;
                   padding-inline-end: 50px;
                   padding-top: 20px;
                   padding-bottom: 100px;
                   font-size: 15px;
                   font-weight: 600;
                   color: black;
             }
          </style>
       </head>
       <body>
          <div class="container">
             <h2 class="title">
                   BON DE DÉPÔT
             </h2>
             <div class="Line1">
                   <div class="BonInfos">
                      <h3>
                         SAV: ${CentreDepot}
                      </h3>
                      <h3>
                         Reference: ${ReferanceProduit}
                      </h3>
                   </div>
                   <h3>
                      Date: ${new Date().toISOString().slice(0, 10)}
                   </h3>
             </div>
             <div class="line2">
                   <div class="informations">
                      <h3 class="text-left">
                         Date de depot
                      </h3>
                      <h3 class="text-center">
                         .....................${DateDepot}...................................................................................................................................
                      </h3>
                      <h3 class="text-right">
                         تاريخ الإيداع
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         SAV
                      </h3>
                      <h3 class="title-center">
                         .......................${CentreDepot}.......................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                         مركز خدمة ما بعد البيع
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         ID client
                      </h3>
                      <h3 class="title-center">
                         .......................${Email}.................................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                         رمز الزبون
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="text-left">
                         Nom et prenom
                      </h3>
                      <h3 class="text-center">
                         ......................${Nom}${' '}${Prenom}...................................................................................................................
                      </h3>
                      <h3 class="text-right">
                         الاسم واللقب
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         N° Tel
                      </h3>
                      <h3 class="title-center">
                         ......................${Telephone}.................................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                         رقم الهاتف
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         Produit
                      </h3>
                      <h3 class="title-center">
                         ......................${ReferanceProduit}.................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                        المنتوج   
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         N° serie
                      </h3>
                      <h3 class="title-center">
                         .....................${ReferanceProduit}..................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                        الرقم التسلسلي    
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         Historique du produit
                      </h3>
                      <h3 class="title-center">
                         ...........................................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                         الاصلاح السابق
                      </h3>
                   </div>
             </div>
             <div class="line3">
                   <div class="line3-line1-title">
                      <h3>Garantie (حالة الضمان للمنتوج) :</h3>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4> Sous Garantie </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4> Hors Garantie </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4> Sous réserve </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
             </div>
             <div class="line3">
                   <div class="line3-line1-title">
                      <h3>Accessoires (لواحق) :</h3>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4> TLC </h4>
                      <table>
                         <tbody>
                               <tr>
                                  <th></th>
                               </tr>
                         </tbody>
                      </table>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4>Carton </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4> Pied </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4>Support Mural </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
                   <div class="line3-line1-subtitle">
                      <h4> Sans accessoires </h4>
                      <table>
                         <tbody><tr><th></th>
                      </tr></tbody></table>
                   </div>
             </div>
             <div class="line2">
                   <div class="informations">
                      <h3 class="title-left">
                         Cause de l’annulation de la garantie : 
                      </h3>
                      
                      <h3 class="title-right">
                         سبب إلغاء الضمان 
                      </h3>
                   </div>
             </div>
             <div class="line4">
                   <div class="line4-line1">
                      <div class="line4-line2">
                         <h4> Présence d’insectes  وجود الحشرات  </h4>
                         <table>
                               <tbody><tr><th></th>
                         </tr></tbody></table>
                      </div>
                      <div class="line4-line2">
                         <h4> Sticker ouvert ملصق مفتوح </h4>
                         <table>
                               <tbody><tr><th></th>
                         </tr></tbody></table>
                      </div>
                      <div class="line4-line2">
                         <h4> Manque fiche de garantie غياب ورقة الضمان </h4>
                         <table>
                               <tbody><tr><th></th>
                         </tr></tbody></table>
                      </div>
                   </div>
                   <div class="line4-line1">
                      <div class="line4-line2">
                         <h4> Présence de moisissure وجود الرطوبة </h4>
                         <table>
                               <tbody><tr><th></th>
                         </tr></tbody></table>
                      </div>
                      <div class="line4-line2">
                         <h4>Dalle cassée  شاشة مكسورة  </h4>
                         <table>
                               <tbody><tr><th></th>
                         </tr></tbody></table>
                      </div>
                      <div class="line4-line2">
                         <h4> Autre </h4>
                         <table>
                               <tbody><tr><th></th>
                         </tr></tbody></table>
                      </div>
                   </div>
             </div>
             <div class="line2">
                   <div class="informations">
                      <h3 class="text-left">
                         Diagnostique initial
                      </h3>
                      <h3 class="text-center">
                         ........................................................................................................................................................
                      </h3>
                      <h3 class="text-right">
                         التشخيص الاولي
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         Prix de réparation estimé
                      </h3>
                      <h3 class="title-center">
                         ...........................................................................................................................................
                      </h3>
                      <h3 class="title-right">
                         السعر التقديري للاصلاح
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         Date de récupération prévisionnelle
                      </h3>
                      <h3 class="title-center">
                         ...................................................................................................................
                      </h3>
                      <h3 class="title-right">
                         التاريخ التقديري للاسترجاع
                      </h3>
                   </div>
                   <div class="informations">
                      <h3 class="title-left">
                         Date de récupération prévisionnelle
                      </h3>
                      <div class="subline2">
                         <div class="subinformations">
                               <h3 class="title-left">
                                  01
                               </h3>
                               <h3 class="title-center">
                                  .........................................................................................................
                               </h3>
                               <h3 class="title-right">
                                  DA
                               </h3>
                         </div>
                         <div class="subinformations">
                               <h3 class="title-left">
                                  02
                               </h3>
                               <h3 class="title-center">
                                  .........................................................................................................
                               </h3>
                               <h3 class="title-right">
                                  DA
                               </h3>
                         </div>
                         <div class="subinformations">
                               <h3 class="title-left">
                                  03
                               </h3>
                               <h3 class="title-center">
                                  .........................................................................................................
                               </h3>
                               <h3 class="title-right">
                                  DA
                               </h3>
                         </div>
                      </div>
                      <h3 class="title-right">
                         التاريخ التقديري للاسترجاع
                      </h3>
                   </div>
             </div>
             <div class="line5">
                   <h4>ملاحظة</h4>
                   <p>
                      هذا الوصل هو وثيقة اثبات إيداع المنتوج ولا يمكن استرجاع المنتوج من دونه، يمكن تقديم الوصل لشخص اخر لاسترجاع
          المنتوج مرفقا بنسخة لبطاقة التعريف الوطنية مع امضائها من طرف المعني بالأمر
                   </p>
                   <p>
                      السعر التقديري للإصلاح هو سعر اولي قابل للتعديل (عند نهاية التصليح)
                   </p>
                   <p>
                      التاريخ التقديري للاسترجاع هو تاريخ محتمل، قابل للتعديل
                   </p>
                   <p>
                      Sous réserve ( يعني أن المنتج قد يكون "تحت الضمان" أو "خارج الضمان" حتى يتم إعداد وضع المنتج ضمن الفئة لتقرير التشخيصي الذي يثبت حالة المنتج)
                   </p>
                   <p>
                      وفقا لأحكام المرسوم التنفيذي رقم -21 244 من المادة,11 يعتبر المنتوج المودع في حكم المهمل في حالة عدم استرجاعه
          بعد مرور سنة كاملة من تاريخ إيداعه وعليه لا يمكن للزبون المطالبة به بعد ذلك
                   </p>
             </div>
             <div class="line6">
                   <h4>Remarque :</h4>
                   <p>
                      - Ce document prouve le dépôt du produit et ce dernier ne peut être récupéré sans la présentation de ce document. Le 
                      produit peut être récupérer par une tierce personne, sous condition de présenté une photocopie de la CNI du déposant.
                   </p>
                   <p>
                      - Le tarif de réparation estimé est un prix indicatif qui peut être ajusté (à la fin de la réparation).
                   </p>
                   <p>
                      - La date de récupération prévisionnelle est une date estimative qui peut être prolongée.
                   </p>
                   <p>
                      - Le placement du produit sous la catégorique (sous réserve) signifie que le produit peut être en ‘’sous garantie’’ 
                      ou ‘’hors garantie’’ jusqu’à l’établissement du rapport de diagnostic prouvant l’état du produit.
                   </p>
                   <p>
                      - Selon le décret N° 21-244 Art. 11. — Le bien confié au prestataire pour être réparé dont le client n'a pas demandé 
                      la récupération dans un délai d'une (1) année décomptée, à partir de la date de récupération du bien, fixée sur le bon 
                      de dépôt, est considéré comme abandonné.
                   </p>
             </div>
             <div class="line7">
                   <h4>
                      للاتصال بنا، توضع تحت تصرفكم العناوين والأرقام التالية 
                   </h4>
                   <p>
                      Pour nous contacter, nous mettons à votre disposition l’adresse mail ainsi que les numéros suivants :
                   </p>
                   <p>
                      Email: sav.stream@bomarecompany.com / Page Facebook: @STREAM SYSTEM
                   </p>
                   <p>
                      Service Après-Vente : 0560-961-718
                   </p>
                   <p>
                      Écoute client : 0560-012-841
                   </p>
             </div>
             <div class="line8">
                   <span>
                      Afin de suivre l’état d’avancement de la réparation de votre produit Veuillez scanner le code QR en y insérant votre nom et ID 
          client ou bien de vous connecter à la plateforme via vos identifiants sur le lien suivant: https://sav.streamsystem.com/index.php
 
                   </span>
             </div>
             <div class="line9">
                   <table>
                      <tbody><tr>
                         <th>
                               Nom
                         </th>
                         <th>
 
                         </th>
                      </tr>
                      <tr>
                         <th>
                               ID
                         </th>
                         <th>
 
                         </th>
                      </tr>
                   </tbody></table>
             </div>
             <div class="QRcode" id="qrcode"></div>
             <div class="line10">
                   <p>
                      Le Client : Vu, lu et approuvé (Signature) 
                   </p>
                   <p>
                      SAV Bomare Company (Cachet)
                   </p>
             </div>
          </div>
          <script>
             var qrcode = new QRCode(document.getElementById("qrcode"), {
                   text: "https://www.google.com", 
                   width: 100,
                   height: 100
             });
          </script>
       </body>
     `;
 };