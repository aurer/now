<?php

class Asset
{

	public static function script($dest, $scripts=array())
	{
		$basedir = __DIR__;
		$result = '';
		foreach ($scripts as $script) {
			$file = $basedir . '/' . $script;
			if( is_file($basedir . '/' . $script) ){
				$result .= "\n\n/* src: $script */ \n";
				$result .= file_get_contents($script);
			}
		}
		if( !is_file($basedir . '/' . $dest) ){
			touch($basedir . '/' . $dest);
		}
		$handle = fopen($basedir . '/' . $dest, 'w');
		fwrite($handle, $result);
		return "<script src='$dest'></script>";
	}
}