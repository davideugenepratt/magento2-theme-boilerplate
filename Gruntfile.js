module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var composer = grunt.file.readJSON( 'composer.json' );
    var themeDirectory = '/vagrant/vendor/' + composer['demo-site'] + '/magento2/app/design/frontend/' + composer.name;
    grunt.initConfig({
        exec: {
            demoSiteInit: 'export COMPOSER_PROCESS_TIMEOUT=2400 && composer install && cd /vendor/' + composer[ "demo-site" ] + ' && composer install && mysql -u root -proot -e "CREATE DATABASE magento2"; ',
            demoSiteInstall: 'cd /vendor/' + composer[ "demo-site" ] + '/magento2 && php magento/bin setup:install --admin-firstname="Bill" --admin-lastname="Murray" --admin-email="johndoe@example.com" --admin-user="admin" --admin-password="Password123" --backend-frontname="admin" --db-password="root"',
            themeGenerateXml: 'sed -i "s#<title>New theme</title>#<title>' + composer.description + '</title>#g" theme.xml && sed -i "s#<parent>Magento/blank</parent>#<parent>' + composer[ "parent-theme" ] + '</parent>#g" theme.xml',
            themeGenerateRegistration: 'sed -i "s#frontend/<Vendor>/<theme>#frontend/' + composer.name + '#g" registration.php',
            themeDirectoryCheck: 'if [ ! -d "' + themeDirectory + '" ]; then mkdir -p ' + themeDirectory + ' && echo "Created theme directory"; fi',
            themeClearDirectory : 'rm -rf ' + themeDirectory + '/*',
            themeCopyFiles: 'rsync -av --progress /vagrant/. ' + themeDirectory + ' --exclude vendor --exclude node_modules --exclude vagrant --exclude .git --exclude .idea'
        }
    });
    grunt.registerTask( 'theme:generate' , [ 'exec:themeGenerateXml' , 'exec:themeGenerateRegistration' , 'theme:copy' ] );
    grunt.registerTask( 'theme:copy' , [ 'exec:themeDirectoryCheck', 'exec:themeClearDirectory', 'exec:themeCopyFiles' ] );
    grunt.registerTask( 'init' , [ 'exec:demoSiteInit , theme:generate , theme:copy' ] );

};