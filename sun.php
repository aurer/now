<?php 

date_default_timezone_set('Europe/London');

if( !isset($_GET['lat']) && !isset($_GET['lng']) ){
	$lat = 51;
	$lng = 0;
} else {
	$lat = floatval($_GET['lat']);
	$lng = floatval($_GET['lng']);
}
$sunrise = date_sunrise(time(), SUNFUNCS_RET_STRING, $lat, $lng, ini_get("date.sunrise_zenith"), 1);
$sunset = date_sunset(time(), SUNFUNCS_RET_STRING, $lat, $lng, ini_get("date.sunrise_zenith"),  1);

$times = array(
	'sunrise' => floor($sunrise * 2) / 2,
	'sunset' => floor($sunset * 2) / 2,
);

echo json_encode($times);