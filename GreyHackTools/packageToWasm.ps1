Set-Location -Path $args[0]

mono-wasm --out=./publish .\GreyHackTools.dll --copy=always --native-strip

(((Get-Content -path .\publish\dotnet.js -Raw) -replace "var Module =", "Module =") -replace "var Module=", "Module=") | Set-Content -Path .\publish\dotnet.js
((Get-Content -path .\publish\dotnet.js -Raw) -replace "var MONO=", "MONO=") | Set-Content -Path .\publish\dotnet.js
(((Get-Content -path .\publish\runtime.js -Raw) -replace "var Module =", "Module =") -replace "var Module=", "Module=") | Set-Content -Path .\publish\runtime.js

Copy-Item -Path .\publish\*.js, .\publish\*.wasm -Destination ..\..\..\..\VsCodeExtension\out\src -PassThru
Remove-Item -Path ..\..\..\..\VsCodeExtension\out\src\managed\*
Copy-Item -Path .\publish\managed\* -Destination ..\..\..\..\VsCodeExtension\out\src\managed -PassThru
