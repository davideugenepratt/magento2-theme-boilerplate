module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var composer = grunt.file.readJSON( 'composer.json' );
    var themeDirectory = '/vagrant/vendor/' + composer['demo-site'] + '/magento2/app/design/frontend/' + composer.name;
    grunt.initConfig({
        exec: {
            demoSiteInit: 'composer install && cd /vagrant/vendor/' + composer[ "demo-site" ] + '/magento2 && cp /vagrant/auth.json ./auth.json && composer install && mysql -u root -proot -e "CREATE DATABASE magento2"; ',
            demoSiteInstall: 'cd /vagrant/vendor/' + composer[ "demo-site" ] + '/magento2 && php bin/magento setup:install --admin-firstname="Bill" --admin-lastname="Murray" --admin-email="johndoe@example.com" --admin-user="admin" --admin-password="Password123" --backend-frontname="admin" --db-password="root"',
            themeGenerateXml: 'sed -i "s#<title>New theme</title>#<title>' + composer.description + '</title>#g" theme.xml && sed -i "s#<parent>Magento/blank</parent>#<parent>' + composer[ "parent-theme" ] + '</parent>#g" theme.xml',
            themeGenerateRegistration: 'sed -i "s#frontend/<Vendor>/<theme>#frontend/' + composer.name + '#g" registration.php',
            themeDirectoryCheck: 'if [ ! -d "' + themeDirectory + '" ]; then mkdir -p ' + themeDirectory + ' && echo "Created theme directory"; fi',
            themeClearDirectory : 'rm -rf ' + themeDirectory + '/*',
            themeCopyFiles: 'rsync -av --progress ' + themeDirectory + ' /vagrant/. --exclude ./vendor --exclude ./node_modules --exclude ./vagrant --exclude ./**/.*',
            sampleSiteDeploy: 'cd /vagrant/vendor/' + composer[ "demo-site" ] + '/magento2 && php bin/magento setup:static-content:deploy --theme="' + composer.name + '" -f'

        }
    });
    grunt.registerTask( 'theme:generate' , [ 'exec:themeGenerateXml' , 'exec:themeGenerateRegistration' , 'theme:copy' ] );
    grunt.registerTask( 'theme:copy' , [ 'exec:themeDirectoryCheck', 'exec:themeClearDirectory', 'exec:themeCopyFiles' ] );
    grunt.registerTask( 'init' , [ 'exec:demoSiteInit' , 'theme:generate' , 'theme:copy' ] );
    grunt.registerTask( 'sample-site:deploy-static' , [ 'exec:sampleSiteDeploy' ] );
};