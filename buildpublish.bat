@echo off
cls
:: locations of all application
set baseLocation=D:\ShopFolderContainer\
set sharedLib=%baseLocation%SharedLibrary\
set sfHome=%baseLocation%shop-folder-home\
set sfLogin=%baseLocation%shop-folder-login\

:: other variables
set selectedLibrary=_

:: BUILD & PUBLISH
:: Ask for which library to udpate
echo :
echo Select Library for build and publish
:: echo css: for Styles
echo cmp: for Component
echo log: for Logger
set /p buildFor=[cmp/log/all]?:

:: IF /i %buildFor%==css goto css
IF /i %buildFor%==cmp goto component
IF /i %buildFor%==log goto logger
IF /i %buildFor%==all goto component
echo Library code not found
goto libBuildPublishExit

:: ===========================================================================

:: :: STYLES
:: :css
:: cd %sharedLib%\projects\shop-folder-style
:: CALL npm version patch
:: cd %sharedLib%
:: CALL ng build shop-folder-style --configuration=production
:: cd %sharedLib%\dist\shop-folder-style
:: CALL npm publish && (echo Published Style) || (echo Error while publishing Style)
:: cd %sharedLib%
:: CALL npm i shop-folder-style@latest

:: :: update applications
:: cd %sfHome%
:: set selectedLibrary=shop-folder-style
:: CALL updatepackage.bat %selectedLibrary% true
:: goto component

:: ===========================================================================

:: COMPONENT
:component
cd %sharedLib%\projects\shop-folder-component
CALL npm version patch
cd %sharedLib%
CALL ng build shop-folder-component --configuration=production
cd %sharedLib%\dist\shop-folder-component
CALL npm publish && (echo Published Component) || (echo Error while publishing Component)

:: update applications
cd %sfHome%
set selectedLibrary=shop-folder-component
CALL updatepackage.bat %selectedLibrary% true
cd %sfLogin%
CALL updatepackage.bat %selectedLibrary% true
IF /i NOT %buildFor%==all goto libBuildPublishExit

:: ===========================================================================

:: LOGGER
:logger
cd %sharedLib%\projects\shop-folder-logger
CALL npm version patch
cd %sharedLib%
CALL ng build shop-folder-logger --configuration=production
cd %sharedLib%
cd dist\shop-folder-logger
CALL npm publish && (echo Published Logger) || (echo Error while publishing Logger)

:: update applications
cd %sfHome%
set selectedLibrary=shop-folder-logger
CALL updatepackage.bat %selectedLibrary% true
cd %sfLogin%
CALL updatepackage.bat %selectedLibrary% true
IF /i NOT %buildFor%==all goto libBuildPublishExit

:: ===========================================================================

:: EXIT after Building and Publishing selected Library
:libBuildPublishExit
cd %sharedLib%