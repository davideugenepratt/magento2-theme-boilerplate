# Magento2 Theme Boilerplate

This is a boilerplate starter kit for Magento2 theme development. 

## System Requirements: What you need for development
 1. Oracle VirtualBox
 2. Vagrant
 3. ChefDK
 
 ## Steps to Start Development
 
 1. `vagrant up` from a commandline.
 2. `vagrant ssh` once the machine is provisioned.
 3. `cd /vagrant/` from inside the machine to reach your project files.
 4. `npm install --no-bin-links` to install all node files.
 4. `grunt init` from the root of your project.
 5. Visit http://{{ whatever IP address you specified in the "server-ip" value in composer.json }}.    
 6. Your admin is at http://{{ whatever IP address you specified in the "server-ip" value in composer.json }}/admin and your username is "admin" and your password is "Password123".
 7. *If you are starting a new project:* From the terminal use `grunt theme:generate` to generate the theme files from the value sin your composer.json.
 8. *If you are working from an existing project:* While working on your theme use `grunt theme:copy` to copy over files from your root directory to the demo site.
 