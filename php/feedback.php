<?php
	// Message content. 
	$msj = "Feedback desde Flota Ferroviaria (by FM5HD).\n";
	$msj.= "\nWritten by ". $_POST['name'] ." (".$_POST['email'].") \n";
	$msj.= "\n---------------------\n";
	$msj.= $_POST['msj'];
	$msj.= "\n---------------------\n";
	$msj.= "Esto es un mensaje automático. Por favor respondé al remitente aclarado en este correo.";

	// Headers. 
	$to = "Fermoto5HD@outlook.com";
	$remitente = $_POST['email'];
	$subject = "[Flota Ferroviaria] ".$_POST['name']." envió un feedback";
	mail($to,$subject,$msj, "From: $remitente");

	// Return success message. 
	echo "¡Feedback enviado!";
?>