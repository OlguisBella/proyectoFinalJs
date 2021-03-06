<!DOCTYPE html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Proyecto Script</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSS -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link href="../css/bootstrap.min.css" rel="stylesheet" >
    <script src="../js/jquery.js"></script>
   </head>

   
<body id="imgFondo">

<header>
<div>
  <div class="row">           
    <div class="col-md-12 col-sm-12" >
    <center>
    <a href="../index.html">
    <img class="img-fluid" id="logo" src="../images/BOTONES/logo.png" alt="Logo"> </a>
    </div> 
  </div>
</div>
  </header>

     <?php
        // Lee el fichero en una variable,
        // y convierte su contenido a una estructura de datos
        $str_datos = file_get_contents("../js/imagenes.json");
        $datos = json_decode($str_datos,true);

    // Modifica el valor, y escribe el fichero json de salida
        //
        $datos["Animalitos"][4] = "Natación";
        unset($datos["Animalitos"][3]);
        $fh = fopen("../js/imagenes.json", 'w')
              or die("Error al abrir fichero de salida");
        fwrite($fh, json_encode($datos,JSON_UNESCAPED_UNICODE));
        fclose($fh);
    ?>
    
    
    
   <!-- section Start -->
       <section id="seccionAdminAvatar">
        <center>
         <h2 id="game-page-title">ARCHIVOS JSON</h2> 
    
            <div class="row justify-content-center">
                
            <div class="col-md-12 col-sm-12">
                <a href="#"> <img class="img-fluid" src="../images/BOTONES/IMPORTAR.png" id="btnAdmin"></a>
                <a href="../js/imagenes.json" download="imagenes.json"> <img class="img-fluid" src="../images/BOTONES/EXPORTAR.png" id="btnAdmin"></a></a>
            </div> 
            
          </div>
        
         <h2 id="game-page-title">SUBIR AVATARES</h2> 
          <div class="row">
            <div class="col-md-12 col-sm-12">
               <img  src="../images/AVATAR/niñaAv1.png" class="img-fluid">
               <img  src="../images/AVATAR/niñaAv2.png" class="img-fluid">
               <img  src="../images/AVATAR/niñaAv3.png" class="img-fluid">
               <img  src="../images/AVATAR/niñoAv1.png" class="img-fluid">
               <img  src="../images/AVATAR/niñoAv2.png" class="img-fluid">
               <img src="../images/AVATAR/niñoAv3.png" class="img-fluid">
            </div> 
           
          </div><br>
          
          <h2 id="game-page-title">SUBIR ANIMALES</h2>
           <div class="row">
            <div class="col-md-12 col-sm-12">
                <img class="img-fluid animalDom" src="../images/ANIMALITOS/cerdito.png">
                <img class="img-fluid animalDom" src="../images/ANIMALITOS/conejo.png">
                <img class="img-fluid animalDom" src="../images/ANIMALITOS/gallito.png">
                <img class="img-fluid animalDom" src="../images/ANIMALITOS/gatito.png">
                <img class="img-fluid animalDom" src="../images/ANIMALITOS/perrito.png">
                <img class="img-fluid animalDom" src="../images/ANIMALITOS/pollito.png">
            </div> 
          </div><br>
        </center>
     </section>
     
      <div class="divNV"><button id="nuevoVideo">+</button></div>
     
              <!-- footer Start -->
        <footer>
            <div class="row">
              <div class="col-md-12">
               <p>2018©Todos los derechos reservados. Peña-Gonzaga-Tohabanda</p>
              </div>
            </div>
        </footer>        
           
      <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
      <script src="../js/script.js"></script>
      <script src="../js/bootstrap.js"></script>
      <script src="../js/bootstrap.min.js"></script>

    </body>
</html>
