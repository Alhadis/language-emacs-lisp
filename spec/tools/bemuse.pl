#!/usr/bin/env perl
use strict;
use warnings;
use autodie;
use v5.14;
use utf8;
$| = 1;

use warnings  qw< FATAL utf8 >;
use open      qw< :std :utf8 >;
use feature   qw< say unicode_strings >;
use File::Spec::Functions qw< rel2abs >;
use Text::Amuse;

die <<END if(-t and $#ARGV < 0);
bemuse: quickly convert a Muse document to HTML

Usage:
	bemuse < input    # Write converted HTML to stdout
	bemuse file.muse  # Create file.html
END


my $execDir = Cwd::abs_path rel2abs("../", "$0");
my $tempFile = undef;

@ARGV = do {{
	# HACK: Text::Amuse(3pm) says:
	#
	#   “Please note that you can't pass a string.
	#    Build a wrapper going through a temporary
	#    file if you need to pass strings.”
	#
	# Well, okay then…
	$tempFile = "$execDir/TEMP_FILE_LOL.tmp~";
	open(my $fh, "> :encoding(UTF-8)", $tempFile);
	while(<STDIN>){ print $fh $_; }
	close($fh);
	($tempFile);
}} unless $ARGV[0];

END {
	if(defined($tempFile)){
		unlink $tempFile or die $@;
	}
	close STDOUT;
}

for my $file (@ARGV) {
	my $document = Text::Amuse->new(file => $file) or die $@;
	my $html = $document->as_html;
	
	# Reading (or read, rather) from standard input
	if(defined($tempFile) && !-t){
		$html =~ s/^\R+|\R+$//g;
		say $html;
	}
	else{
		(my $outputFile = $ARGV) =~ s/\.\Kmuse$/html/i;
		open(my $fh, "> :encoding(UTF-8)", $outputFile) or die $@;
		print $fh $html;
		close $fh or die $@;
	}
}
