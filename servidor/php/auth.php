<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
/*
$key = "example_key";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000
);
*/
/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */

$DatosDelModeloPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModeloPorPost);

if($user->usuario == 'usuario' && $user->clave == 'clave'){
	$key = "1234";

	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"] ="unUsuario";
	$token["perfil"]="admin";
	$token["iat"]=time(); //momento en el cual se creo
	$token["exp"]=time()+20;

	$token["username"] = "usuario";
	$token["tipoUsuario"] = "admin";

	$jwt = JWT::encode($token, $key);
	$array["MiTokenGeneradorEnPHP"] = $jwt;
}
else{
	$array["MiTokenGeneradorEnPHP"] = false;
}

echo json_encode($array);
/*
$ClaveDeEncriptacion="estaeslaclave";
$token["usuario"] ="unUsuario";
$token["perfil"]="admin";
$token["iat"]=time(); //momento en el cual se creo
$token["exp"]=time()+20;


$jwt = JWT::encode($token, $ClaveDeEncriptacion); //Encriptador, generador del token

$ArrayConToken["MiTokenGeneradorEnPHP"]=$jwt;
echo json_encode($ArrayConToken)
*/
?>