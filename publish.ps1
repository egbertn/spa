#!/snap/bin/powershell
#Custom build if not using Azure
#### creates a build for Windows x64 especially for etisalat
#do not overwrite appsettings.json on the target machine
$publishfolder = '../publish/spa'

$version = '1.0.1'

dotnet publish . --runtime linux-arm --self-contained true -c Release /p:PublishSingleFile=true -p:SourceRevisionId=$version -o $publishfolder
# scp -r $publishfolder/*  adc@192.168.1.64:/var/www/html/minyada.nl
