export $(egrep -v '^#' .env | xargs)

if [ "$APPCENTER_BRANCH" == "master" ];
then
    appcenter codepush release-react -a Sunnah-Studio/Sunnah-Radio-Android -d Staging -t "$APP_VERSION_NAME"
else
    echo "Current branch is $APPCENTER_BRANCH"
fi