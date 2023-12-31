@echo off
cls
:: locations of all application
set baseLocation=D:\ShopFolderContainer\
set sharedLib=%baseLocation%SharedLibrary\
set sfHome=%baseLocation%shop-folder-home\
set sfLogin=%baseLocation%shop-folder-login\
set sfTodo=%baseLocation%shop-folder-todo\

:: other variables
set selectedLibrary=_

:: BUILD & PUBLISH
:: Ask for which library to udpate
echo :
echo Select Library for build and publish
:: echo css: for Styles
echo cmp: for Component
echo log: for Logger
set /p buildFor=[cmp/log/store/logo/all]?:

:: IF /i %buildFor%==css goto css
IF /i %buildFor%==cmp goto component
IF /i %buildFor%==log goto logger
IF /i %buildFor%==logo goto logo
IF /i %buildFor%==store goto store
IF /i %buildFor%==all goto component
echo Library code not found
goto libBuildPublishExit

:: ================================================================================================
:: ================================================================================================

:: COMPONENT
:: =========
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
cd %sfTodo%
CALL updatepackage.bat %selectedLibrary% true
IF /i NOT %buildFor%==all goto libBuildPublishExit


:: ================================================================================================

:: STORE
:: =========
:store
cd %sharedLib%\projects\shop-folder-store
CALL npm version patch
cd %sharedLib%
CALL ng build shop-folder-store --configuration=production
cd %sharedLib%\dist\shop-folder-store
CALL npm publish && (echo Published Store) || (echo Error while publishing Store)

:: update applications
cd %sfHome%
set selectedLibrary=shop-folder-store
CALL updatepackage.bat %selectedLibrary% true
cd %sfLogin%
CALL updatepackage.bat %selectedLibrary% true
cd %sfTodo%
CALL updatepackage.bat %selectedLibrary% true
IF /i NOT %buildFor%==all goto libBuildPublishExit


:: ================================================================================================

:: LOGO
:: =========
:logo
cd %sharedLib%\projects\shop-folder-logo
CALL npm version patch
cd %sharedLib%
CALL ng build shop-folder-logo --configuration=production
cd %sharedLib%\dist\shop-folder-logo
CALL npm publish && (echo Published Logo) || (echo Error while publishing Logo)

:: update applications
cd %sfHome%
set selectedLibrary=shop-folder-logo
CALL updatepackage.bat %selectedLibrary% true\
cd %sfTodo%
CALL updatepackage.bat %selectedLibrary% true
IF /i NOT %buildFor%==all goto libBuildPublishExit


:: ================================================================================================


:: LOGGER
:: ------
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
cd %sfTodo%
CALL updatepackage.bat %selectedLibrary% true
IF /i NOT %buildFor%==all goto libBuildPublishExit

:: ===========================================================================

:: EXIT after Building and Publishing selected Library
:libBuildPublishExit
cd %sharedLib%