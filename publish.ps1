#!/usr/bin/pwsh

$publishfolder = '../publish/spa'

$version = '1.0.1'
dotnet restore -r linux-arm
rm -rf $publishfolder
dotnet publish . --runtime linux-arm --self-contained true -c Release /p:PublishTrimmed=false /p:PublishSingleFile=true -p:SourceRevisionId=$version -o $publishfolder
ssh -f $Env:PIWEB sudo -S systemctl stop kestrel-minyada.service
scp -r $publishfolder/*  "$Env:PUBLISH/minyada.nl"
ssh -f $Env:PIWEB sudo -S systemctl start kestrel-minyada.service
