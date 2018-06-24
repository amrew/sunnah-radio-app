export $(egrep -v '^#' .env | xargs)
appcenter codepush release-react -a Sunnah-Studio/Sunnah-Radio-Android -d Staging -t "$APP_VERSION_NAME"
